const mongoose = require('mongoose');
const { services } = require('../user/settings.json');

const connectMongoose = (i) => {
  const URI = services[i][2];
  return mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(err);
    console.log('Connected to Mongo database!');
  });
};

module.exports = connectMongoose;
