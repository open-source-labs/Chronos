const mongoose = require('mongoose');
//  pull schema from the mongoose object
const { Schema } = mongoose;

//  database link
const myURI = 'mongodb+srv://tim:tim@cluster0-xjjw3.mongodb.net/test?retryWrites=true&w=majority';

// const URI = process.env.MONGO_URI || myURI;

// connect the database, if error, log will be sent to the terminal
mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Order Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));


//  mongoose.SchemaTypes.ObjectId was changed from the types to make it a string and to te
const OrderSchema = new Schema({
  customerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  bookID: {
    type: mongoose.SchemaTypes.ObjectId,
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


// //  Schema for the database
// const CustomerSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
// });

// const CustomerModel = mongoose.model('CustomerModel', CustomerSchema);

// module.exports = CustomerModel;
