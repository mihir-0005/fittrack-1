import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for CORS with credentials
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
);

// User related API calls
export const userAPI = {
  saveProfile: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.USERS, userData);
      return response.data;
    } catch (error) {
      console.error('Error saving user profile:', error);
      throw error;
    }
  },

  getProfile: async (googleId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.USERS}/${googleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put(`${API_ENDPOINTS.USERS}/${userData.googleId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Alias for `getProfile` (optional, based on your preference)
  getUserProfile: async (googleId) => {
    try {
      const response = await api.get(`${API_ENDPOINTS.USERS}/${googleId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};

// Auth related API calls
export const authAPI = {
  verifyToken: async (token) => {
    try {
      const response = await api.post(`${API_ENDPOINTS.AUTH}/verify`, { token });
      return response.data;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }
};

export default api;
