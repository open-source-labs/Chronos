const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

// DB link for orders data.
const orders_db_uri = `${process.env.ORDERS_DB}`;

// const URI = process.env.MONGO_URI || myURI;

// connect the database, if error, log will be sent to the terminal
mongoose.connect(orders_db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
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
