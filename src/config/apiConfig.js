const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fittrack-1-yefe.onrender.com';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  USERS: `${API_BASE_URL}/api/users`,
  AUTH: `${API_BASE_URL}/api/auth`,
  POSTS: `${API_BASE_URL}/api/posts`,
  CHALLENGES: `${API_BASE_URL}/api/challenges`,
  WORKOUTS: `${API_BASE_URL}/api/workouts`,
  DIET: `${API_BASE_URL}/api/diet`,
  REVIEWS: `${API_BASE_URL}/api/reviews`
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};