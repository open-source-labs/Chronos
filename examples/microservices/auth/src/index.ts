
import { DbConnectionError } from '@chronosrx/common';
import { app } from './app.js';
import mongoose from 'mongoose';
import { User } from './models/user.js';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debugging: Confirm `.env` variables are loaded
console.log('✅ Loaded ENV Variables:', {
  MONGO_URI_AUTH: process.env.MONGO_URI_AUTH || '❌ NOT SET',
  JWT_KEY: process.env.JWT_KEY || '❌ NOT SET',
  JWT_LIFETIME: process.env.JWT_LIFETIME || '❌ NOT SET',
});

const PORT = 3000;

const start = async () => {
  try {
    if (!process.env.MONGO_URI_AUTH) throw new Error('❌ MONGO_URI_AUTH must be defined');
    if (!process.env.JWT_KEY) throw new Error('❌ JWT_KEY must be defined');
    if (!process.env.JWT_LIFETIME) throw new Error('❌ JWT_LIFETIME must be defined');

    console.log('✅ Environment variables loaded successfully');

    // Connect to MongoDB
    try {
      console.log('🛠 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI_AUTH, {});

      console.log('🍃 Successfully connected to MongoDB');
    } catch (err) {
      console.error('🔥 MongoDB Connection Error:', err);
      throw new DbConnectionError();
    }

    // Clear existing users and create a test user
    try {
      await User.deleteMany();
      console.log('🗑 Deleted existing users');

      const testUser = new User({
        username: 'ScrumLord',
        password: 'McKenzie',
      });

      await testUser.save();
      console.log('👤 Test user created successfully');
    } catch (err) {
      console.error('❌ Error while creating test user:', err);
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`💥 Auth service listening on ${PORT}`);
    });
  } catch (err) {
    console.error('🚨 Startup Error:', err);
    process.exit(1);
  }
};

// Global error handling
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
});

start();
