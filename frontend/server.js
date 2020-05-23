require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const cmd = require('chronos-microservice-debugger3');

const app = express();

const PORT = process.env.FRONTEND_PORT;

cmd.propagate();

app.use('/', express.static(path.resolve(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname), '../frontend/index.html');
});

// const httpProxy = require('http-proxy');
// const apiProxy = httpProxy.createProxyServer();

const books = `http://localhost:${process.env.BOOKS_PORT}`;
const customers = `http://localhost:${process.env.CUSTOMERS_PORT}`;
const orders = `http://localhost:${process.env.ORDERS_PORT}`;

// UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
// eslint-disable-next-line max-len
// app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))
app.use('/', cmd.microCom(
  'frontend',
  'sql',
  'postgres://uyfzdqhf:jlyib293ALvdP-OQtY2eOAowtNF3RkFH@isilo.db.elephantsql.com:5432/uyfzdqhf',
  'yes',
  'm',
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
// app.use('/', express.static('/usr/src/app/frontend'));

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
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT} ...`);
});
