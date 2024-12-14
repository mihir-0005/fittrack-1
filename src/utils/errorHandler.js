import { ERROR_MESSAGES } from './constants';

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message = error.response.data?.message || ERROR_MESSAGES.SERVER_ERROR;

    switch (status) {
      case 401:
        // Handle unauthorized error (e.g., clear local storage and redirect to login)
        localStorage.clear();
        window.location.href = '/';
        return ERROR_MESSAGES.AUTH_ERROR;
      
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      
      case 400:
        return message || ERROR_MESSAGES.VALIDATION_ERROR;
      
      default:
        return message || ERROR_MESSAGES.SERVER_ERROR;
    }
  } else if (error.request) {
    // Request made but no response received
    return ERROR_MESSAGES.NETWORK_ERROR;
  } else {
    // Something else happened
    return error.message || ERROR_MESSAGES.SERVER_ERROR;
  }
};