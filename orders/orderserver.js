// UNCOMMENT THE LINES BELOW
// const cmd = require('chronos-microservice-debugger3');
// cmd.propagate();

const PORT = 7777;
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const controller = require('./OrderController.js');
 
// UNCOMMENT THE LINE BELOW AND PASS IN YOUR CHOSEN ARGUMENTS
// app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'))

app.use(bodyParser.json());
app.use(cors());

// This route will create a new order
app.post('/orders/createorder', controller.createorder, (req, res) => {
  res.status(200).json(res.locals.createorder);
});

// This route will get all the orders
app.get('/orders/getorders', controller.getorders, (req, res) => {
  res.status(200).json(res.locals.getorders);
});

// This route will delete an order
app.delete('/orders/deleteorder:id?', controller.deleteorder, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// This route will retrieve all the customers from the customers database
app.get('/orders/getcustomersinfo', controller.fetchcustomerdata, (req, res) => {
  res.status(200).json((res.locals.customerdata));
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
  console.log(`Orders server running on port ${PORT}...`);
});