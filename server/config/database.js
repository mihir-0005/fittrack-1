// server/config/database.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');

    // Establish connection
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);

    // Add connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;
