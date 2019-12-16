const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const path = require('path');

// Required to get rid of deprecation warnings
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const mw = require('../mwMongo.js');

app.use('/', mw.microCom(path.basename(__filename)));
// mw.microHealth(path.resolve(__filename));

// const mw = require("../mwSQL.js")
// app.use('/', mw.microCom('customers'))
// mw.microHealth('customers');


mongoose.connect('mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/customersservice', () => {
  console.log('Customers database is connected...');
});

// Load Model
require('./Customer');

const Customer = mongoose.model('Customer');

// Create a new customer
app.post('/customer', async (req, res, next) => {
  const newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  const customer = new Customer(newCustomer);
  customer.save().then(() => {
    res.send('Customer successfully saved to the database');
    next();
  }).catch((err) => {
    Promise.reject(err);
  });
});

// List all customers
app.get('/customers', (req, res, next) => {
  Customer.find().then((customers) => {
    res.json(customers);
    next();
  }).catch((err) => {
    Promise.reject(err);
  });
});

// Get customer by using their id
app.get('/customer/:id', (req, res, next) => {
  Customer.findById(req.params.id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
        next();
      } else {
        Promise.reject(err);
      }
    });
});

// Delete a customer by their id
app.delete('/customer/:id', (req, res, next) => {
  Customer.findOneAndRemove(req.params.id)
    .then(() => {
      res.send('Customer successfully deleted');
      next();
    }).catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.listen('5555', () => {
  console.log('Customer server running on port 5555...');
});
