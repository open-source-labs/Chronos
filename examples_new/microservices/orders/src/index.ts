import { DbConnectionError } from '@chronosrx/common';
import { app } from './app';
import mongoose from 'mongoose';
import { Order } from './models/Order';

const PORT = 3003;

const start = async () => {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be defined');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');
  //   if (!process.env.JWT_LIFETIME) throw new Error('JWT_LIFETIME must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('🍃 Connected to MongoDB');

    // clear out DB
    await Order.deleteMany();
  } catch (err) {
    throw new DbConnectionError();
  }

  app.listen(PORT, async () => {
    console.log(`💥 Orders listening on ${PORT}`);
  });
};

start();
