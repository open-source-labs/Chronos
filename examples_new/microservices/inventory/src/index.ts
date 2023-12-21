import { DbConnectionError } from '@chronosrx/common';
import { app } from './app';
import mongoose from 'mongoose';
import { Inventory } from './models/Inventory';
import { User } from './models/user';

const PORT = 3002;

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('🍃 Connected to MongoDB');

    // reset DB's
    await Inventory.deleteMany();
    await User.deleteMany();
  } catch (err) {
    throw new DbConnectionError();
  }

  app.listen(PORT, async () => {
    console.log(`💥 App listening on ${PORT}`);
  });
};

start();
