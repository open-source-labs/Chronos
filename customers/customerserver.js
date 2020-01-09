// UNCOMMENT THE LINES BELOW
// const cmd = require('chronos-microservice-debugger3');
// cmd.propagate();

const express = require('express');
const path = require('path');
const PORT = 5555;
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./CustomerController');

// UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
// app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))

app.use(bodyParser.json());
app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));

// This route will create a new customer
app.post('/createcustomer', controller.createcustomer, (req, res) => {
  res.status(200).json(res.locals.createcustomer);
});

// This route will get all the customers
app.get('/getcustomers', controller.getcustomers, (req, res) => {
  res.status(200).json(res.locals.getcustomers);
});

//  This route will delete a customer
app.delete('/deletecustomer:id?', controller.deletecustomer, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// This route will get all the books from the books database
app.get('/getbooksinfo', controller.getbooksinfo, (req, res) => {
  res.status(200).json(res.locals.booksinfo);
});

//  This is the global error handler
function errorHandler(error, req, res, next) {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, error);
  console.log(`Here is the error object's response: ${errorObj.log}`);
  res.status(errorObj.status).json(errorObj.message);
}

// Open and listen to server on specified port
app.listen(PORT, () => {
  console.log(`Customer server running on port ${PORT}...`);
});
