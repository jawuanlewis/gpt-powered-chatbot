import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import MongoDBStore from 'connect-mongodb-session';
import { connectDB, closeDB } from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

dotenv.config();

const app: Express = express();

app.set('trust proxy', 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure MongoDB session store
let store: any = null;

if (process.env.MONGO_URI) {
  const MongoStore = MongoDBStore(session);
  store = new MongoStore({
    uri: process.env.MONGO_URI as string,
    collection: 'sessions',
  });

  store.on('error', (error: Error) => {
    console.error('(Server) Session store error:', error);
  });
} else {
  console.warn('(Server) MONGO_URI not found, using memory store for sessions');
}

// CORS config based on environment
const allowedOrigins = ['http://localhost:5173'];

// Add production URLs only if they exist, and strip trailing slashes
if (process.env.PROD_URL) {
  allowedOrigins.push(process.env.PROD_URL.replace(/\/$/, ''));
}
if (process.env.STAGING_URL) {
  allowedOrigins.push(process.env.STAGING_URL.replace(/\/$/, ''));
}

console.log('(Server) Allowed origins:', allowedOrigins);
console.log('(Server) NODE_ENV:', process.env.NODE_ENV);

/************************
 * App Middleware Setup *
 ************************/

app.use(compression());

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log('CORS check for origin:', origin);
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = '(CORS) Access from this origin not allowed.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: store || undefined,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV !== 'development',
      sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    proxy: true,
  })
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: '(Server) Something went wrong!',
  });
});

// API Endpoints
app.use('/api/chat', chatRoutes);

// Serve the frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

/*******************
 * Run Application *
 *******************/

connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// App shutdown
process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});
