
const PORT = 4545;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./BookController');

const app = express();
app.use(bodyParser.json());


//  This requires the chronos middleware into the server ***Tim's comment
// const mw = require('../mwMongo.js');

// app.use('/', mw.microCom(path.basename(__filename)));


//  This route will create a new book!
app.post('/book', controller.createBook, (req, res) => {
  res.status(200).json(res.locals.createBook);
});

// This route will delete a book
app.delete('/book/:id', controller.deleteBook, (req, res) => res.status(200).json(res.locals.deleteBook));


//  This is my global error handler
function errorHandler(error, req, res, next) {
  //  console.log(err.stack);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, error);
  console.log(`Here is the error object's response: ${errorObj.log}`);

  res.status(errorObj.status).json(errorObj.message);
}

// Open an express server
app.listen(PORT, () => {
  console.log(`Book server running on port ${PORT} ...`);
});


// // Connects our bookservice db to cloud db
// mongoose.connect('mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/booksservice', () => {
//   console.log('Books database is connected...');
// });

// Previous test for endpoint
// app.get('/', (req, res, next) => res.status(200).send('This is our main endpoint!'));


//   This was supposed to create a book
//   // create a new Book with the above attributes
//   const book = new Book(newBook);

//   // save our book to collection

//   book.save().then(() => {
//     res.send('Book successfully saved to the database');
//     next();
//   })
//     .catch((err) => {
//       Promise.reject(err);
//     });
// });


// app.get('/books', (req, res, next) => {
//   Book.find().then((books) => {
//     res.json(books);
//     next();
//   }).catch((err) => {
//     Promise.reject(err);
//   });
// });

// // Get a book by its id
// app.get('/book/:id', (req, res, next) => {
//   Book.findById(req.params.id)
//     .then((book) => {
//       if (book) {
//         res.json(book);
//         next();
//       } else {
//         Promise.reject(err);
//       }
//     });
// });


// Create functionality
// app.post('/book', (req, res, next) => {
//   const newBook = {
//     title: req.body.title,
//     author: req.body.author,
//     numberPages: req.body.numberPages,
//     publisher: req.body.publisher,
//   };


// const mongoose = require('mongoose');
