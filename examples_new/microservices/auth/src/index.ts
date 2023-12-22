import { DbConnectionError } from '@chronosrx/common';
import { app } from './app';
import mongoose from 'mongoose';
import { User } from './models/user';

const PORT = 3000;

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  if (!process.env.JWT_LIFETIME) throw new Error('JWT_LIFETIME must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('🍃 Connected to MongoDB');

    await User.deleteMany();
    const testUser = User.build({
      username: 'ScrumLord',
      password: 'McKenzie',
    });
    await testUser.save();
  } catch (err) {
    throw new DbConnectionError();
  }

  app.listen(PORT, async () => {
    console.log(`💥 Auth listening on ${PORT}`);
  });
};

start();
