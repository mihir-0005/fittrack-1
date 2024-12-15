// server/scripts/testConnection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connection successful!');
    console.log('Connection details:', {
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

testConnection();
