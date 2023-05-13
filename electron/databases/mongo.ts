import mongoose from 'mongoose';
// import { MongoError } from 'mongodb';
const testURL = 'mongodb+srv://seconddbtest:seconddbtest@cluster0.yhztme0.mongodb.net/?retryWrites=true&w=majority';
// Mongoose connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectMongoose = async (i:number, URI: string) => {
  try {
    await mongoose.connection.close();
    const db = await mongoose.connect(URI);

    return db;
  } catch (err) {
    console.log(`${__dirname}/mongo.ts/connectMongoose: ${err}`);
  }
};

// const connectMongoose = async (i: number, URI: string) => {
//   try {
//     const db2 = mongoose.createConnection(testURL);
//     console.log('connection to user provided db established..');
//     return db2;
//   } catch (error) {
//     console.log('Error connecting to second db... ', error);
//   }
// }

export default connectMongoose;
