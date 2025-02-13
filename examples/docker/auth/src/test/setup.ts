// // // import { MongoMemoryServer } from 'mongodb-memory-server';
// // import mongoose from 'mongoose';
// // import { app } from '../app';
// // import request from 'supertest';

// // declare global {
// //   // Declare that a global function "login" exists and returns a Promise<string[]>
// //   function login(): Promise<string[]>;
// // }

// // let mongo: MongoMemoryServer;

// // beforeAll(async () => {
// //   process.env.JWT_KEY = 'asdfasdfasdf';

// //   mongo = await MongoMemoryServer.create();
// //   const mongoUri = mongo.getUri();

// //   await mongoose.connect(mongoUri, {});
// // });

// // beforeEach(async () => {
// //   const collections = await mongoose.connection.db.collections();

// //   for (let collection of collections) {
// //     await collection.deleteMany({});
// //   }
// // });

// // afterAll(async () => {
// //   if (mongo) {
// //     await mongo.stop();
// //   }

// //   await mongoose.connection.close();
// // });

// // global.login = async (): Promise<string[]> => {
// //   const username = 'test lord';
// //   const password = 'test1234';

// //   const response = await request(app)
// //     .post('/api/auth/signup')
// //     .send({ username, password })
// //     .expect(200);

// //   const cookie = response.get('Set-Cookie');

// //   // Ensure we always return a string array. If no cookie is found, throw an error.
// //   if (!cookie || cookie.length === 0) {
// //     throw new Error('No cookie found in the signup response');
// //   }
// //   return cookie;
// // };

// // export {}; // Ensure this file is treated as a module.

// // examples/docker/auth/src/test/setup.ts

// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';
// import { app } from '../app';
// import request from 'supertest';

// // Declare the global function 'login'
// declare global {
//   // If you want it without parameters:
//   function login(): Promise<string[]>;
// }

// let mongo: MongoMemoryServer;

// beforeAll(async () => {
//   process.env.JWT_KEY = 'asdfasdfasdf';

//   mongo = await MongoMemoryServer.create();
//   const mongoUri = mongo.getUri();

//   await mongoose.connect(mongoUri, {});
// });

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (let collection of collections) {
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   if (mongo) {
//     await mongo.stop();
//   }

//   await mongoose.connection.close();
// });

// global.login = async (): Promise<string[]> => {
//   const username = 'test lord';
//   const password = 'test1234';

//   const response = await request(app)
//     .post('/api/auth/signup')
//     .send({ username, password })
//     .expect(200);

//   const cookie = response.get('Set-Cookie');
//   if (!cookie || cookie.length === 0) {
//     throw new Error('No cookie found in the signup response');
//   }
//   return cookie;
// };

// export {}; // Mark this file as a module so that its global declarations do not leak.
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

// Remove any duplicate global login declarations from this file.
// The global login function is now declared in global.d.ts.

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdfasdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// Implement the global login function. Since it is already declared globally
// in global.d.ts, we simply assign to global.login.
global.login = async (): Promise<string[]> => {
  const username = 'test lord';
  const password = 'test1234';

  const response = await request(app)
    .post('/api/auth/signup')
    .send({ username, password })
    .expect(200);

  const cookie = response.get('Set-Cookie');
  if (!cookie || cookie.length === 0) {
    throw new Error('No cookie found in the signup response');
  }
  return cookie;
};

export {}; // Mark this file as a module.
