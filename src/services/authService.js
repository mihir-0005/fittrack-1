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
    const response = await apiClient.post(`${API_ENDPOINTS.BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error saving user profile:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.response?.data?.message || 'Failed to save user profile');
  }
};