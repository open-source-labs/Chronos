import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app.js';
import request from 'supertest';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdfasdf';

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

// Login function removed from global scope
export const login = async () => {
  const username = 'test lord';
  const password = 'test1234';

  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      username,
      password,
    })
    .expect(200);

  return response.get('Set-Cookie');
};
