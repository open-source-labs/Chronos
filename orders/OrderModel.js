const mongoose = require('mongoose');

const { Schema } = mongoose;

// UNCOMMENT THE LINE BELOW AND REPLACE WITH AN ACTUAL MONGODB URI FOR YOUR "ORDERS" DATABASE
// const myURI = 'mongodb+srv://johndoe:johndoe@cluster0-abcdef.mongodb.net/';

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
