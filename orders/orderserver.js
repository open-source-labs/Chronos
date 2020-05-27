const express = require('express');
const path = require('path');
const cors = require('cors');
const cmd = require('chronos-microservice-debugger4');
const controller = require('./OrderController');
require('dotenv').config();

// Places a unique header on every req in order to trace the path in the req's life cycle.
cmd.propagate();

const app = express();

// Invoke .microCom with the 6 params to enable logging of comm and health data to your own db.
// Params (6): microservice name, db type, db URI, want health data?, query freq, is service Dockerized?
  // If running a svc in a Docker container, please give container the same name as the microservice...
  // ... to ensure proper logging of container stats.
app.use('/', cmd.microCom(
  'orders',
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

// CHAOS FLOW
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD: ${req.method},
    PATH: ${req.url},
    BODY: ${JSON.stringify(req.body)},
    ID: ${req.query.id}
    ***************************************************************************************`
  );
  next();
});

// Create an Order through this endpoint
app.post('/orders/createorder', controller.createorder, (req, res) => {
  res.status(200).json(res.locals.createorder);
});

// Get all orders through this endpoint
app.get('/orders/getorders', controller.getorders, (req, res) => res.status(200).json(res.locals.getorders));

// Delete order through this endpoint
app.delete('/orders/deleteorder:id?', controller.deleteorder, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// Get customer info from the customers application with this endpoint
app.get('/orders/getcustomersinfo', controller.fetchcustomerdata, (req, res) => {
  res.status(200).json((res.locals.customerdata));
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

//  open and listen to server on this port
app.listen(process.env.ORDERS_PORT, () => {
  console.log(`Orders server running on port ${process.env.ORDERS_PORT}...`);
});
