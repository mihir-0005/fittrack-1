export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://fittrack-1-yefe.onrender.com/api',
  USERS: '/users',
  AUTH: '/auth',
  POSTS: '/posts',
  CHALLENGES: '/challenges',
  WORKOUTS: '/workouts',
  DIET: '/diet',
  REVIEWS: '/reviews'
};

export const STORAGE_KEYS = {
  TOKEN: 'googleToken',
  USER_DATA: 'userData'
};

export const DIET_PLANS = [
  {
    id: 'weight-loss',
    title: 'Weight Loss Plan',
    description: 'Calorie-deficit diet focused on lean proteins and vegetables',
    calories: 1500
  },
  {
    id: 'maintenance',
    title: 'Maintenance Plan',
    description: 'Balanced diet to maintain current weight',
    calories: 2000
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain Plan',
    description: 'High-protein diet with calorie surplus to gain weight',
    calories: 2500
  }
];

export const WORKOUT_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};