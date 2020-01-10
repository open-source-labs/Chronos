const mongoose = require('mongoose');

const { Schema } = mongoose;

// UNCOMMENT THE LINE BELOW AND REPLACE WITH AN ACTUAL MONGODB URI FOR YOUR "ORDERS" DATABASE
const myURI = 'mongodb+srv://benmizel:3A7G4ERMhg%2ER%25wb@cluster0-tllwn.mongodb.net/test?retryWrites=true&w=majority';

const URI = process.env.MONGO_URI || myURI;

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
