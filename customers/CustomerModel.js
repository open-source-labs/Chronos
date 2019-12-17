const mongoose = require('mongoose');

//  pull schema from the mongoose object
const { Schema } = mongoose;

//  database link
const myURI = 'mongodb+srv://tim:tim@cluster0-81td6.mongodb.net/test?retryWrites=true&w=majority';

const URI = process.env.MONGO_URI || myURI;

// connect the database, if error, log will be sent to the terminal
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

const CustomerModel = mongoose.model('CustomerModel', CustomerSchema);

module.exports = CustomerModel;
