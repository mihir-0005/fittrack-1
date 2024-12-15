import { ERROR_MESSAGES } from '../config/constants';

export const handleApiError = (error) => {
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message = error.response.data?.message;

    switch (status) {
      case 401:
        return new Error(message || ERROR_MESSAGES.AUTH_ERROR);
      case 404:
        return new Error(message || ERROR_MESSAGES.NOT_FOUND);
      case 400:
        return new Error(message || ERROR_MESSAGES.VALIDATION_ERROR);
      default:
        return new Error(message || ERROR_MESSAGES.SERVER_ERROR);
    }
  }

  if (error.request) {
    // Request made but no response
    return new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }

  // Something else happened
  return new Error(error.message || ERROR_MESSAGES.SERVER_ERROR);
};