import { ERROR_MESSAGES } from '../config/constants';

export const handleApiError = (error) => {
  // Log error for debugging
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  // Handle specific error cases
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || data?.error;

    switch (status) {
      case 401:
        // Clear auth data on unauthorized
        localStorage.removeItem('googleToken');
        localStorage.removeItem('userData');
        return new Error(message || ERROR_MESSAGES.AUTH_ERROR);
      case 404:
        return new Error(message || ERROR_MESSAGES.NOT_FOUND);
      case 400:
        return new Error(message || ERROR_MESSAGES.VALIDATION_ERROR);
      default:
        return new Error(message || ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  // Network errors
  if (error.request) {
    return new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }

  // Other errors
  return new Error(error.message || ERROR_MESSAGES.SERVER_ERROR);
};