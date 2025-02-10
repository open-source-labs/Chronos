// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// // import { User } from '../models/users';

// declare global {
//   var login: (username: string) => Promise<string[]>;
// }

// let mongo: any;
// beforeAll(async () => {
//   process.env.JWT_KEY = 'asdfjkj234kjsdfj44';

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

// global.login = async (username: string) => {
//   // create a random MongoDB ID
//   const testUserId = new mongoose.Types.ObjectId().toHexString();
//   // create a user with the random ID
//   const testUser = User.build({
//     userId: testUserId,
//     username,
//   });
//   await testUser.save();

//   console.log('🪪 TestUserId', testUserId);

//   // Build a JWT payload.  { userId }
//   const payload = {
//     userId: testUserId,
//   };

//   // Create the JWT
//   const token = jwt.sign(payload, process.env.JWT_KEY!);

//   // return formatted cookie
//   return [`token=${token}`];
// };
// setup.ts
// // setup.ts
// // setup.ts
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import { User } from '../models/users'; // Adjust path as needed

// // Ensure this file is treated as a module.
// export {};

// declare global {
//   // Declare the global login function once
//   var login: (username: string) => Promise<string[]>;
// }

// let mongo: any;

// beforeAll(async () => {
//   process.env.JWT_KEY = 'asdfjkj234kjsdfj44';

//   mongo = await MongoMemoryServer.create();
//   const mongoUri = mongo.getUri();

//   await mongoose.connect(mongoUri, {});
// });

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();
//   for (const collection of collections) {
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   if (mongo) {
//     await mongo.stop();
//   }
//   await mongoose.connection.close();
// });

// // Implement the global login function
// global.login = async (username: string) => {
//   // Create a random MongoDB ID
//   const testUserId = new mongoose.Types.ObjectId().toHexString();
  
//   // Create a user with the random ID using your User model
//   const testUser = User.build({
//     userId: testUserId,
//     username,
//   });
//   await testUser.save();

//   console.log('🪪 TestUserId', testUserId);

//   // Build a JWT payload
//   const payload = { userId: testUserId };

//   // Create and sign the JWT
//   const token = jwt.sign(payload, process.env.JWT_KEY!);

//   // Return the formatted cookie
//   return [`token=${token}`];
// };
// examples/docker/items/src/test/setup.ts
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';

// This empty export ensures the file is treated as a module.
export {};

// Rename the global login function to avoid duplicate conflicts.
declare global {
  var dockerLogin: (username: string) => Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfjkj234kjsdfj44';

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

// Implement the global dockerLogin function
global.dockerLogin = async (username: string) => {
  // Create a random MongoDB ID
  const testUserId = new mongoose.Types.ObjectId().toHexString();
  
  // Create a user with the random ID using your User model
  const testUser = User.build({
    userId: testUserId,
    username,
  });
  await testUser.save();

  console.log('🪪 TestUserId', testUserId);

  // Build a JWT payload { userId }
  const payload = { userId: testUserId };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Return the formatted cookie
  return [`token=${token}`];
};
