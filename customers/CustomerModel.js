const mongoose = require('mongoose');

const { Schema } = mongoose;

// UNCOMMENT THE LINE BELOW AND REPLACE WITH AN ACTUAL MONGODB URI FOR YOUR "BOOKS" DATABASE
const myURI = 'mongodb+srv://benmizel:3A7G4ERMhg%2ER%25wb@cluster0-tllwn.mongodb.net/test?retryWrites=true&w=majority';

const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Customer Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));

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

const CustomerModel = mongoose.model('CustomerModel', CustomerSchema);

module.exports = CustomerModel;
