import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDatabase from './config/database.js';
import corsConfig from './config/corsConfig.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize server
const initializeServer = async () => {
  try {
    // Connect to the database
    await connectDatabase();
    console.log('Database connection initialized');

    // Apply CORS before other middleware
    app.use(cors(corsConfig));

    // Middleware
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // Session configuration
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: process.env.MONGODB_URI,
          ttl: 24 * 60 * 60,
        }),
        cookie: {
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 24 * 60 * 60 * 1000
        }
      })
    );

    // Debug middleware for requests
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/images', imageRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/reviews', reviewRoutes);
    app.use('/api/challenges', challengeRoutes);
    app.use('/api/diets', dietRoutes);
    app.use('/api/workouts', workoutRoutes);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Server error:', err);
      res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
      });
    });

    // Start the server
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

// Start the server
initializeServer();

export default app;