import axios from 'axios';
import { API_ENDPOINTS, API_CONFIG } from '../config/apiConfig';

const apiClient = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  ...API_CONFIG,
  headers: {
    ...API_CONFIG.headers,
    'Access-Control-Allow-Origin': 'https://flourishing-basbousa-b3c0d9.netlify.app',
    'Access-Control-Allow-Credentials': 'true'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('googleToken');
      localStorage.removeItem('userData');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default apiClient;