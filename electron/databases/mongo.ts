import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

// Mongoose connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectMongoose = async (i: number, URI: string) => {
  try {
    await mongoose.connection.close();
    const db = await mongoose.connect(
      URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    return db;
  } catch (err) {
    console.log(`${__dirname}/mongo.ts/connectMongoose: ${err}`);
  }
};
export default connectMongoose;
