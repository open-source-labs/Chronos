const mongoose = require('mongoose');
const { services } = require('../user/settings.json');

// Mongoose connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectMongoose = (i) => {
  const URI = services[i][2];
  return mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    console.log('Connected to Mongo database!');
  });
};

module.exports = connectMongoose;
