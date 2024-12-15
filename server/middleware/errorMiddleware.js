export const errorHandler = (err, req, res, next) => {
    console.error('Server error:', err);
    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
  };