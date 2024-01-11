import path from 'path';
import mongoose from 'mongoose';
import { app } from './app';
import { DbConnectionError } from '@chronosrx/common';
import { Item } from './models/items';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '../../.env') });

const PORT = 3001;

const start = async () => {
  // check environmental variable are defined
  if (!process.env.MONGO_URI_ITEMS) throw new Error('MONGO_URI_ITEMS must be defined');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI_ITEMS, {});
    console.log('🍃 Connected to MongoDB');

    // reset DB's
    await Item.deleteMany();
  } catch (err) {
    throw new DbConnectionError();
  }

  app.listen(PORT, async () => {
    console.log(`💥 Items listening on ${PORT}`);
  });
};

start();
