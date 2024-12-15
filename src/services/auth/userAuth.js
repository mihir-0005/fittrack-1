import apiClient from '../apiClient';
import { API_ENDPOINTS } from '../../config/apiConfig';
import { handleApiError } from '../../utils/errorHandler';

export const saveUserProfile = async (userData) => {
  try {
    console.log('Attempting to save user profile:', userData);
    const response = await apiClient.post('/users', userData);
    console.log('User profile saved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw handleApiError(error);
  }
};

export const getUserProfile = async (googleId) => {
  try {
    const response = await apiClient.get(`/users/${googleId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};