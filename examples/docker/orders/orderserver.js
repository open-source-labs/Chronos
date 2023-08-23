const express = require('express');
const path = require('path');
const cors = require('cors');
const controller = require('./OrderController');

const chronosConfig = require('./chronos-config.js');
const Chronos = require('@chronosmicro/tracker');
const chronos = new Chronos(chronosConfig);

// Places a unique header on every req in order to trace the path in the req's life cycle.
chronos.propagate();

const app = express();
chronos.docker();

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

// Create an Order through this endpoint
app.post('/orders/createorder', controller.createorder, (req, res) => {
  res.status(200).json(res.locals.createorder);
});

// Get all orders through this endpoint
app.get('/orders/getorders', controller.getorders, (req, res) =>
  res.status(200).json(res.locals.getorders)
);

// Delete order through this endpoint
app.delete('/orders/deleteorder:id?', controller.deleteorder, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// Get customer info from the customers application with this endpoint
app.get(
  '/orders/getcustomersinfo',
  controller.fetchcustomerdata,
  (req, res) => {
    res.status(200).json(res.locals.customerdata);
  }
);

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

app.listen(7777, () => {
  console.log(`Orders server running on port 7777...`);
});
