const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fittrack-1-yefe.onrender.com/api';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  USERS: `${API_BASE_URL}/users`,
  AUTH: `${API_BASE_URL}/auth`,
  POSTS: `${API_BASE_URL}/posts`,
  CHALLENGES: `${API_BASE_URL}/challenges`,
  WORKOUTS: `${API_BASE_URL}/workouts`,
  DIET: `${API_BASE_URL}/diet`,
  REVIEWS: `${API_BASE_URL}/reviews`
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};