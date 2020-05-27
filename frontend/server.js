const path = require('path');
const express = require('express');
const cors = require('cors');
const cmd = require('chronos-microservice-debugger4');
require('dotenv').config();

cmd.propagate();

const app = express();

app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname), '../frontend/index.html');
});

// const httpProxy = require('http-proxy');
// const apiProxy = httpProxy.createProxyServer();

const books = `http://localhost:${process.env.BOOKS_PORT}`;
const customers = `http://localhost:${process.env.CUSTOMERS_PORT}`;
const orders = `http://localhost:${process.env.ORDERS_PORT}`;

// eslint-disable-next-line max-len
// Invoke .microCom with the 6 params to enable logging of comm and health data to your own db.
// Params (6): microservice name, db type, db URI, want health data?, query freq, is service Dockerized?
  // If running a svc in a Docker container, please give container the same name as the microservice...
  // ... to ensure proper logging of container stats.
app.use('/', cmd.microCom(
  'frontend',
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

// CHAOS FLOW - SIMPLY A TEST FOR THE EXPESS SERVER
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- 
    METHOD:${req.method},
    PATH: ${req.url},
    BODY: ${JSON.stringify(req.body)},
    ID: ${req.query.id}
    ***************************************************************************************`,
  );
  next();
});

app.all('/books/*', (req, res) => {
  console.log('redirecting to books');
  // apiProxy.web(req, res, { target: books });
  res.redirect(books + req.originalUrl);
});

app.all('/customers/*', (req, res) => {
  console.log('redirecting to customers');
  // apiProxy.web(req, res, { target: customers });
  res.redirect(customers + req.originalUrl);
});

app.all('/orders/*', (req, res) => {
  console.log('redirecting to orders');
  // apiProxy.web(req, res, { target: orders });
  res.redirect(orders + req.originalUrl);
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

// Open and listen to server on specified port
app.listen(process.env.FRONTEND_PORT, () => {
  console.log(`Frontend server running on port ${process.env.FRONTEND_PORT} ...`);
});
