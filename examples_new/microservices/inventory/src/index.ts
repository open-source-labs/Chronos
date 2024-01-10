import { DbConnectionError } from '@chronosrx/common';
import { app } from './app';
import mongoose from 'mongoose';
import { Inventory } from './models/Inventory';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname + '../../.env') });

const PORT = 3002;

const start = async () => {
  // check environmental variables are defined
  if (!process.env.MONGO_URI_INVENTORY) throw new Error('MONGO_URI_INVENTORY must be defined');
  if (!process.env.JWT_KEY) throw new Error('JWT_KEY must be defined');

  try {
    await mongoose.connect(process.env.MONGO_URI_INVENTORY, {});
    console.log('🍃 Connected to MongoDB');

    // reset DB
    await Inventory.deleteMany();
  } catch (err) {
    throw new DbConnectionError();
  }

  app.listen(PORT, async () => {
    console.log(`💥 Inventory listening on ${PORT}`);
  });
};

start();
