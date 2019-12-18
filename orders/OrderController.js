const mongoose = require('mongoose');
// This module enables you to use the fetch api on the backend
const fetch = require('node-fetch');
const OrderModel = require('./OrderModel');

const OrderController = {};

// We changed the types to string instead
//  mongoose.Types.ObjectId

// We changed it back


//  Controller for order creation
OrderController.createorder = (req, res, next) => {
  console.log('Create Order middleware has been fired!');
  const newOrder = {
    customerID: mongoose.Types.ObjectId(req.body.customerID),
    bookID: mongoose.Types.ObjectId(req.body.bookID),
    purchaseDate: req.body.purchaseDate,
    deliveryDate: req.body.deliveryDate,
  };
  console.log('This is what the new order object is ', newOrder);


  OrderModel.create(newOrder, (error, results) => {
    if (error) {
      console.log(`Document save to the db failed! ${error}`);
      return res.status(404).json(error);
    }
    res.locals.createorder = results;
    console.log(`Document successfully saved! ${res.locals.createorder}`);
    return next();
  });
};


// Controller for order retrieval
OrderController.getorders = (req, res, next) => {
  OrderModel.find({}, (error, results) => {
    if (error) {
      console.log(`Document retrieval failed! ${error}`);
      return res.status(404).json(error);
    }
    res.locals.getorders = results;
    console.log(`Document retrieval successful! ${res.locals.getorders}`);
    return next();
  });
};

//  Controller for retrieving customers info from the customer application
OrderController.fetchcustomerdata = (req, res, next) => {
  //  const { body } = req;
  fetch('http://localhost:5555/getcustomers', {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/JSON',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((results) => {
      res.locals.customerdata = results;
      console.log(`This is the parsed blob ${JSON.stringify(res.locals.customerdata)}`);
      return next();
    })
    .catch((error) => {
      console.log(`There was an error in getting customers data ${error}`);
    });
};

module.exports = OrderController;
