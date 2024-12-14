const isDevelopment = process.env.NODE_ENV !== 'production';

const corsConfig = {
  origin: ['https://flourishing-basbousa-b3c0d9.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
};

export default corsConfig;