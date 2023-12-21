import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Inventory } from '../models/Inventory';

declare global {
  function createItem(itemId: string, sellerId: string): void;
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

global.createItem = async (itemId, sellerId) => {
  const data = Inventory.build({
    itemId: itemId,
    itemName: 'crap',
    sellerId: sellerId,
    units: 50,
    unitPrice: 5,
  });
  await data.save();
};
