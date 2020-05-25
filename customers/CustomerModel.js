const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

// DB link for customers data.
const customers_db_uri = `${process.env.CUSTOMERS_DB}`;

// const URI = process.env.MONGO_URI || myURI;

mongoose.connect(customers_db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Customer Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));


//  Schema for the database
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// create model and ship out
const CustomerModel = mongoose.model('CustomerModel', CustomerSchema);

module.exports = CustomerModel;
