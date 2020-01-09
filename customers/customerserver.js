const cmd = require('chronos-microservice-debugger3');

cmd.propagate();
const express = require('express');
const path = require('path');

const PORT = 5555;
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const controller = require('./CustomerController');
//  const path = require('path');
//  we're using the chronos debugger tool here to intercept
//  request and propagate our context onto said request as it travels

// app.use('/', cmd.microCom('customers_microservice', 'sql', 'postgres://tsfcbdjo:l8AWzEJEyhxtR-ERoj7HNjIqBuRCqm9f@rajje.db.elephantsql.com:5432/tsfcbdjo'));
// cmd.microHealth('customers_microservice', 'sql', 'postgres://tsfcbdjo:l8AWzEJEyhxtR-ERoj7HNjIqBuRCqm9f@rajje.db.elephantsql.com:5432/tsfcbdjo', 'h');
//  app.use('/', cmd.microCom('microserviceName', 'databaseType', 'databaseURL', 'wantMicroHealth', 'queryFrequency'));
app.use('/', cmd.microCom('customers_microservice', 'sql', 'postgres://kpbljbrv:Ry1hO5KPIU-jvVyGnHHne-yplDr2Yk3H@rajje.db.elephantsql.com:5432/kpbljbrv', 'yes', 'm'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use('/', express.static(path.resolve(__dirname, '../frontend')));


// ********** I PROBABLY STILL NEED THIS PART FOR CHRONOS TO WORK AND DEBUG MY MICOSERVICE *************

// CHAOS FLOW - SIMPLY A TEST FOR THE EXPESS SERVER
app.use((req, res, next) => {
  console.log(
    `***************************************************************************************
    CHAOS FLOW TEST --- METHOD:${req.method}, PATH: ${
  req.url
}, BODY: ${JSON.stringify(req.body)}, ID: ${req.query.id}
    ***************************************************************************************`,
  );
  next();
});


// Create a new customer
app.post('/createcustomer', controller.createcustomer, (req, res) => {
  res.status(200).json(res.locals.createcustomer);
});

// List all customers
app.get('/getcustomers', controller.getcustomers, (req, res) => {
  res.status(200).json(res.locals.getcustomers);
});

//  Delete a customer with id
app.delete('/deletecustomer:id?', controller.deletecustomer, (req, res) => {
  res.status(200).json(res.locals.deletecustomer);
});

// Get books information from the books application
app.get('/getbooksinfo', controller.getbooksinfo, (req, res) => {
  //  console.log(`These are the books I got back ${JSON.stringify(res.locals.booksinfo)}`);
  res.status(200).json(res.locals.booksinfo);
});


app.listen(PORT, () => {
  console.log(`Customer server running on port ${PORT}...`);
});
