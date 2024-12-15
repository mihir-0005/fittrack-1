const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fittrack-1-yefe.onrender.com';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};

export const ENDPOINTS = {
  users: '/api/users',
  auth: '/api/auth',
  posts: '/api/posts',
  challenges: '/api/challenges',
  workouts: '/api/workouts',
  diet: '/api/diet',
  reviews: '/api/reviews'
};