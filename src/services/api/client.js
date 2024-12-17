import axios from 'axios';
import { API_CONFIG, getAuthHeader } from './config';

const apiClient = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      ...getAuthHeader()
    };
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', {
      endpoint: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
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