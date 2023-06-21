const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const mongoose = require('mongoose');
const { Schema } = mongoose;

require('./chronos-config');
/**
 * Your .env file's ORDER_URI will be referenced here to connect the 
 * `orders` microservice metrics to your database.
 */
const myURI = process.env.ORDER_URI;

mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Order Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));

const OrderSchema = new Schema({
  customerID: {
    type: String,
    required: true,
  },
  bookID: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const OrderModel = mongoose.model('OrderModel', OrderSchema);

module.exports = OrderModel;
