const mongoose = require('mongoose');
require('dotenv').config();
const { Schema } = mongoose;

// Add your "ORDER_URI = " to your .env file
// require('./chronos-config'); // Bring in config file
const myURI = process.env.ORDER_URI;

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
