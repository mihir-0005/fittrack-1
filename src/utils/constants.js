export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://fittrack-1-yefe.onrender.com',
  USERS: '/api/users',
  AUTH: '/api/auth',
  POSTS: '/api/posts',
  CHALLENGES: '/api/challenges',
  WORKOUTS: '/api/workouts',
  DIET: '/api/diet',
  REVIEWS: '/api/reviews'
};

export const STORAGE_KEYS = {
  TOKEN: 'googleToken',
  USER_DATA: 'userData'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  AUTH_ERROR: 'Authentication failed. Please try again.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation error occurred.'
};