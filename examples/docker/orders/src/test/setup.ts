import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import { Order } from '../models/Order';

declare global {
  function createOrder(itemId: string, sellerId: string): void;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'erreoivcxspasfgj';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

global.createOrder = async (itemId, sellerId) => {
  const data = Order.build({
    item: itemId,
    amount: 50,
    totalPrice: 5000,
    sellerId: sellerId,
  });
  await data.save();
};
