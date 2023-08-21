const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('./BookController.js');

const chronosConfig = require('./chronos-config.js');
// follow directions in chronos_npm_tracker README - this downloads an npm package that a previous iteration made
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

// Places a unique header on every req in order to trace the path in the req's life cycle.
chronos.propagate();

const app = express();

app.use(express.json());
chronos.docker();

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

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
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, error);
  console.log(`Here is the error object's response: ${errorObj.log}`);

  res.status(errorObj.status).json(errorObj.message);
});

app.listen(8888, () => {
  console.log(`Book server running on port 8888...BookServer.js Line 56`);
});
