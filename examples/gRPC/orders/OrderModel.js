const mongoose = require('mongoose');
require('dotenv').config();
const { Schema } = mongoose;

// UNCOMMENT THE LINE BELOW AND REPLACE WITH AN ACTUAL MONGODB URI FOR YOUR "ORDERS" DATABASE
// require('./chronos-config'); // Bring in config file
// const myURI = process.env.ORDER_URI;
const myURI = 'mongodb+srv://johnlloyddonato:doggo@grpc.tr4hfcn.mongodb.net/test';

mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Order Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));

const OrderSchema = new Schema({
  customerID: {
    type: Number,
    required: true,
  },
  bookID: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model('OrderModel', OrderSchema);

module.exports = OrderModel;
