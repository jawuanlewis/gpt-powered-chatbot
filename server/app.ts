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
const MongoStore = MongoDBStore(session);
const store = new MongoStore({
  uri: process.env.MONGO_URI as string,
  collection: 'sessions',
});

store.on('error', (error: Error) => {
  console.error('(Server) Session store error:', error);
});

// CORS config based on environment
const allowedOrigins = [
  'http://localhost:5173',
  process.env.PROD_URL,
  process.env.STAGING_URL,
].filter(Boolean);

/************************
 * App Middleware Setup *
 ************************/

app.use(compression());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = '(CORS) Access from this origin not allowed.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: store,
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
