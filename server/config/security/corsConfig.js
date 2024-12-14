const isDevelopment = process.env.NODE_ENV !== 'production';

const corsConfig = {
  origin: ['https://flourishing-basbousa-b3c0d9.netlify.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export default corsConfig;