export const handleApiError = (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      const message = data?.message || data?.error || 'An error occurred';
      
      switch (status) {
        case 400:
          return `Invalid request: ${message}`;
        case 401:
          return 'Please sign in again';
        case 403:
          return 'You do not have permission to perform this action';
        case 404:
          return 'The requested resource was not found';
        case 500:
          return 'Server error. Please try again later';
        default:
          return message;
      }
    }
    
    if (error.request) {
      // Request made but no response
      return 'Unable to reach the server. Please check your connection';
    }
    
    // Something else went wrong
    return error.message || 'An unexpected error occurred';
  };
  
  export const showErrorNotification = (message) => {
    // Implement your preferred notification method here
    console.error(message);
    // Example: toast.error(message);
  };