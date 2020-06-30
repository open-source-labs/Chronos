// import * as mongoose from 'mongoose';
const mongoose = require('mongoose');
// Mongoose connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectMongoose = (i: number, URI: string) => {
  return mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: string) => {
      if (err) console.log(err);
      console.log('Connected to Mongo database!');
    }
  );
};
module.exports = connectMongoose;
