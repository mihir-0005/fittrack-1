const isDevelopment = process.env.NODE_ENV !== 'production';

const corsConfig = {
  origin: isDevelopment 
    ? 'http://localhost:5173' // Local development URL (or any local URL you want to use)
    : 'https://flourishing-basbousa-b3c0d9.netlify.app', // Production URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
};

export default corsConfig;
