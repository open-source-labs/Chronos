const express = require('express');
const path = require('path');
const cors = require('cors');
const cmd = require('chronos-microservice-debugger4');
const controller = require('./BookController.js');
require('dotenv').config();

// Places a unique header on every req in order to trace the path in the req's life cycle.
cmd.propagate();

const app = express();

app.use(express.json());

// Invoke .microCom with the 6 params to enable logging of comm and health data to your own db.
// Params (6): microservice name, db type, db URI, want health data?, query freq, is service Dockerized?
  // If running a svc in a Docker container, please give container the same name as the microservice...
  // ... to ensure proper logging of container stats.
app.use('/', cmd.microCom(
  'books',
  // PostgreSQL
  'sql',
  `${process.env.CHRONOS_PSQL}`,
  // MongoDB
  // 'mongo',
  // `${process.env.CHRONOS_MONGO}`,
  'no',
  'm',
  'yes' // <-- Is the service Dockerized?
));

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

// CHAOS FLOW - SIMPLY A TEST FOR THE EXPESS SERVER
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD:${req.method},
    PATH: ${req.url},
    BODY: ${JSON.stringify(req.body)},
    ID: ${req.query.id}
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

// Global error handler
app.use((error, req, res, next) => {
  //  console.log(err.stack);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, error);
  console.log(`Here is the error object's response: ${errorObj.log}`);

  res.status(errorObj.status).json(errorObj.message);
});

app.listen(process.env.BOOKS_PORT, () => {
  console.log(`Book server running on port ${process.env.BOOKS_PORT} ...`);
});
