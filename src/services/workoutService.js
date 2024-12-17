import apiClient from './api/client';
import { ENDPOINTS } from './api/endpoints';

export const workoutService = {
  create: async (workoutData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.workouts.base, workoutData);
      return response.data;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
    }
  },

  getByUser: async (userId) => {
    try {
      const response = await apiClient.get(ENDPOINTS.workouts.byUser(userId));
      return response.data;
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;
    }
  },

  delete: async (workoutId) => {
    try {
      const response = await apiClient.delete(ENDPOINTS.workouts.byId(workoutId));
      return response.data;
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }
};