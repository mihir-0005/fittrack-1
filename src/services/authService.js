import { API_ENDPOINTS } from '../utils/constants';
import apiClient from './apiClient';

export const fetchGoogleProfile = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile from Google');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Google profile:', error);
    throw error;
  }
};

export const saveUserProfile = async (userData) => {
  try {
    // Add error logging
    console.log('Saving user profile:', userData);
    console.log('API URL:', API_ENDPOINTS.BASE_URL);
    
    const response = await apiClient.post('/users', userData);
    console.log('Save profile response:', response.data);
    return response.data;
  } catch (error) {
    // Improved error logging
    console.error('Error saving user profile:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};
