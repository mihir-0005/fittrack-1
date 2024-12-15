import axios from 'axios';
import { API_CONFIG } from './config';
import { handleApiError } from '../../utils/errorHandler';

const apiClient = axios.create(API_CONFIG);

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(handleApiError(error))
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(handleApiError(error))
);

export default apiClient;