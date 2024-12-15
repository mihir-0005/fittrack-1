import apiClient from '../api/client';
import { ENDPOINTS } from '../api/config';

export const saveUserProfile = async (userData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.users, userData);
    return response.data;
  } catch (error) {
    console.error('Error in saveUserProfile:', error);
    throw error;
  }
};

export const getUserProfile = async (googleId) => {
  try {
    const response = await apiClient.get(`${ENDPOINTS.users}/${googleId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
};