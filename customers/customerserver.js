const express = require('express');
const path = require('path');
const cors = require('cors');
const cmd = require('chronos-microservice-debugger4');
const controller = require('./CustomerController');
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
  'customers',
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

// eslint-disable-next-line max-len
// CHAOS FLOW - SIMPLY A TEST FOR THE EXPESS SERVER
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD:${req.method},
    PATH: ${req.url},
    BODY: ${JSON.stringify(req.body)},
    ID: ${req.query.id}
    ***************************************************************************************`
  );
  next();
});

// Create a new customer
app.post('/customers/createcustomer', controller.createcustomer, (req, res) => {
  res.status(200).json(res.locals.createcustomer);
});

// List all customers
app.get('/customers/getcustomers', controller.getcustomers, (req, res) => {
  res.status(200).json(res.locals.getcustomers);
});

//  Delete a customer with id
app.delete('/customers/deletecustomer:id?', controller.deletecustomer, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// Get books information from the books application
app.get('/customers/getbooksinfo', controller.getbooksinfo, (req, res) => {
  res.status(200).json(res.locals.booksinfo);
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

app.listen(process.env.CUSTOMERS_PORT, () => {
  console.log(`Customer server running on port ${process.env.CUSTOMERS_PORT}...`);
});
