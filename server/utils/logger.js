// server/utils/logger.js
const logger = {
    info: (message, meta = {}) => {
      console.log(`[INFO] ${message}`, meta);
    },
    error: (message, error) => {
      console.error(`[ERROR] ${message}`, {
        message: error.message,
        stack: error.stack,
        ...(error.response && { response: error.response.data })
      });
    },
    debug: (message, data = {}) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DEBUG] ${message}`, data);
      }
    }
  };
  
  export default logger;
  