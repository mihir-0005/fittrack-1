import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDatabase from './config/database.js';
import corsConfig from './config/corsConfig.js';
import { sessionConfig } from './config/sessionConfig.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const initializeServer = async () => {
  try {
    await connectDatabase();
    console.log('Database connection initialized');

    // CORS configuration
    app.use(cors(corsConfig));
    
    // Request parsing middleware
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    
    // Session middleware
    app.use(session(sessionConfig));
    
    // Request logging
    app.use(requestLogger);

    // Set security headers
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'https://flourishing-basbousa-b3c0d9.netlify.app');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
      next();
    });

    // API Routes
    app.use('/api', routes);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
      });
    });

    // Error handling
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Client URL:', process.env.CLIENT_URL);
      console.log('MongoDB Status:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

initializeServer();

export default app;