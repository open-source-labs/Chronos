const mongoose = require('mongoose');

//  pull schema from the mongoose object
const { Schema } = mongoose;

//  database link
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

const BookModel = mongoose.model('BookModel', BooksSchema);

module.exports = BookModel;


// mongoose.model('Book', {
//   title: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: String,
//     required: true,
//   },
//   numberPages: {
//     type: Number,
//     required: false,
//   },
//   publisher: {
//     type: String,
//     required: false,
//   },
// });


// const mongoose = require('mongoose');

// const { Schema } = mongoose;
// // v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

// const myURI = 'mongodb+srv://tim:tim@cluster0-aady4.mongodb.net/test?retryWrites=true&w=majority';


// // UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to DB! *********'))
//   .catch((err) => console.log('Connection Error ', err));

// const messageSchema = new Schema({
//   message: { type: String },
//   password: { type: String },
//   created_at: { type: Date, default: Date.now },
// });

// const Message = mongoose.model('Message', messageSchema);

// // UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// // const URI = process.env.PG_URI || myURI;


// module.exports = Message; // <-- export your model
