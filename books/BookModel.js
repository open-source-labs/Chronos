const mongoose = require('mongoose');

//  pull schema from the mongoose object
const { Schema } = mongoose;

//  database link
//  can change but woun't advice that because the book application database lives here
const myURI = 'mongodb+srv://tim:tim@cluster0-khxef.mongodb.net/test?retryWrites=true&w=majority';

const URI = process.env.MONGO_URI || myURI;

// connect the database, if error, log will be sent to the terminal
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!!!********* Books Database is live!!!'))
  .catch((err) => console.log('Connection Error ', err));


//  Schema for the database
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

// Database Model
const BookModel = mongoose.model('BookModel', BooksSchema);

module.exports = BookModel;
