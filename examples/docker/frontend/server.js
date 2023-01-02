const path = require('path');
const express = require('express');
const cors = require('cors');

const chronosConfig = require('./chronos-config.js');
const Chronos = require('chronos-tracker');
const chronos = new Chronos(chronosConfig);

chronos.propagate();

const app = express();

app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../frontend')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname), '../frontend/index.html');
});

const books = `http://localhost:8888`;
const customers = `http://localhost:5555`;
const orders = `http://localhost:7777`;

app.use('/', chronos.track());

app.use(cors());

app.all('/books/*', (req, res) => {
  console.log('redirecting to books');
  // apiProxy.web(req, res, { target: books });
  res.redirect(books + req.originalUrl);
});

app.all('/customers/*', (req, res) => {
  console.log('redirecting to customers');
  res.redirect(customers + req.originalUrl);
});

app.all('/orders/*', (req, res) => {
  console.log('redirecting to orders');
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
app.listen(3000, () => {
  console.log('Frontend server running on port 3000 ...');
});
