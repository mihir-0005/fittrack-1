const isDevelopment = process.env.NODE_ENV !== 'production';

const corsConfig = {
  origin: ['https://flourishing-basbousa-b3c0d9.netlify.app'],  // Ensure this matches the front-end URL
  credentials: true,  // This allows cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsConfig;
