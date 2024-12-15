import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import imageRoutes from './imageRoutes.js';
import postRoutes from './postRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import challengeRoutes from './challengeRoutes.js';
import dietRoutes from './dietRoutes.js';
import workoutRoutes from './workoutRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/images', imageRoutes);
router.use('/posts', postRoutes);
router.use('/reviews', reviewRoutes);
router.use('/challenges', challengeRoutes);
router.use('/diets', dietRoutes);
router.use('/workouts', workoutRoutes);

export default router;