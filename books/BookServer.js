const cmd = require('chronos-microservice-debugger3');

cmd.propagate();
const PORT = 4545;
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const controller = require('./BookController.js');

//  we're using the chronos debugger tool here to intercept
//  request and propagate our context onto said request as it travels

// app.use('/', cmd.microCom('books_microservice', 'sql', 'postgres://tsfcbdjo:l8AWzEJEyhxtR-ERoj7HNjIqBuRCqm9f@rajje.db.elephantsql.com:5432/tsfcbdjo'));
// cmd.microHealth('books_microservice', 'sql', 'postgres://tsfcbdjo:l8AWzEJEyhxtR-ERoj7HNjIqBuRCqm9f@rajje.db.elephantsql.com:5432/tsfcbdjo', 'h');

app.use('/', cmd.microCom(
  'books',
  // PostgreSQL
  'sql',
  'postgres://uyfzdqhf:jlyib293ALvdP-OQtY2eOAowtNF3RkFH@isilo.db.elephantsql.com:5432/uyfzdqhf',
  // MongoDB
  // 'mongo',
  // 'mongodb+srv://alon:testing123@cluster0-phsei.mongodb.net/test?retryWrites=true&w=majority',
  'yes',
  'm'
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

// ********** I PROBABLY STILL NEED THIS PART FOR CHRONOS TO WORK AND DEBUG MY MICOSERVICE *************

// CHAOS FLOW - SIMPLY A TEST FOR THE EXPESS SERVER
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD:${req.method}, PATH: ${
  req.url
}, BODY: ${JSON.stringify(req.body)}, ID: ${req.query.id}
    ***************************************************************************************`,
  );
  next();
});

//  This route will create a new book!
app.post('/books/createbook', controller.createBook, (req, res) => {
  res.status(200).json(res.locals.createBook);
});

// This route will delete a book
app.delete('/books/deletebook:id?', controller.deleteBook, (req, res) => {
  res.status(200).json(res.locals.deleteBook);
});

// This route will get all the books in the database
app.get('/books/getbooks', controller.getBooks, (req, res) => {
  res.status(200).json(res.locals.getBooks);
});

// This route gets orders from the Orders application
app.get('/books/getordersinfo', controller.getorderinfo, (req, res) => {
  res.status(200).json(res.locals.getorderinfo);
});


//  This is my global error handler - isn't being used right now and it's not breaking anything so...
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

// Open and listen to server on said port
app.listen(PORT, () => {
  console.log(`Book server running on port ${PORT} ...`);
});
