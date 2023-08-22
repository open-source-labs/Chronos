const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('./CustomerController');

const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

// Places a unique header on every req in order to trace the path in the req's life cycle.
chronos.propagate();

const app = express();

app.use(express.json());
chronos.docker();

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

// Create a new customer
app.post('/customers/createcustomer', controller.createcustomer, (req, res) => {
  res.status(200).json(res.locals.createcustomer);
});

// List all customers
app.get('/customers/getcustomers', controller.getcustomers, (req, res) => {
  res.status(200).json(res.locals.getcustomers);
});

//  Delete a customer with id
app.delete(
  '/customers/deletecustomer:id?',
  controller.deletecustomer,
  (req, res) => {
    res.status(200).json(res.locals.deletecustomer);
  }
);

// Get books information from the books application
app.get('/customers/getbooksinfo', controller.getbooksinfo, (req, res) => {
  res.status(200).json(res.locals.booksinfo);
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

app.listen(5555, () => {
  console.log(`Customer server running on port 5555...`);
});
