import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';

declare global {
  var login: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

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

global.login = async () => {
  const testUserId = new mongoose.Types.ObjectId().toHexString();
  const testUser = User.build({
    userId: testUserId,
    username: 'test',
  });
  await testUser.save();

  // Build a JWT payload.  { id, email }
  const payload = {
    userId: testUserId,
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { token };

  // Turn that session into JSON
  const tokenJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(tokenJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`token=${base64}`];
};
