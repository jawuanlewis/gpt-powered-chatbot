import express, { Express, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

dotenv.config();

const app: Express = express();

app.set('trust proxy', 1);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CORS config based on environment
const allowedOrigins = ['http://localhost:5173'];

if (process.env.CUSTOM_URL) {
  allowedOrigins.push(process.env.CUSTOM_URL.replace(/\/$/, ''));
}
if (process.env.PROD_URL) {
  allowedOrigins.push(process.env.PROD_URL.replace(/\/$/, ''));
}
if (process.env.STAGING_URL) {
  allowedOrigins.push(process.env.STAGING_URL.replace(/\/$/, ''));
}

/************************
 * App Middleware Setup *
 ************************/

app.use(compression());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const staticDir = path.join(__dirname, '../client/dist');
  console.log('Serving static files from:', staticDir);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  app.use(express.static(staticDir));

  app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    console.log('Catch-all route hit for:', req.url);
    const indexPath = path.join(__dirname, '../client/dist', 'index.html');
    console.log('Sending file:', indexPath);
    res.sendFile(indexPath);
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
