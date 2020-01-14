const mongoose = require('mongoose');

const { Schema } = mongoose;

// UNCOMMENT THE LINE BELOW AND REPLACE WITH AN ACTUAL MONGODB URI FOR YOUR "CUSTOMERS" DATABASE
// const myURI = 'mongodb+srv://johndoe:johndoe@cluster0-abcdef.mongodb.net/';

mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Books Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));

const BooksSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
});

const BookModel = mongoose.model('BookModel', BooksSchema);

module.exports = BookModel;
