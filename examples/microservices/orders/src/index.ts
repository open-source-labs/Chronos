import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '../../.env') });
import { app } from './app';
import { Order } from './models/Order';
import { DbConnectionError } from '@chronosrx/common';

const PORT = 3003;

const start = async () => {
  // check environment variables are defined
  if (!process.env.MONGO_URI_ORDERS) throw new Error('MONGO_URI_ORDERS must be defined');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI_ORDERS, {});
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
