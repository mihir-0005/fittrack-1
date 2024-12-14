import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import challengeRoutes from './routes/challengeRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

// Middleware and Config
import { errorHandler } from './middleware/errorHandler.js';
import connectDatabase from './config/database.js';

import cors from 'cors';
import corsConfig from './config/corsConfig.js';  // Import the corsConfig



// Apply CORS middleware
app.use(cors(corsConfig));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
connectDatabase();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Serve static files (if needed for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/workouts', workoutRoutes);

// Error handling middleware
app.use(errorHandler);

// Default route to handle all other requests
app.get('/', (req, res) => {
  res.send('Welcome to the fitness API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
