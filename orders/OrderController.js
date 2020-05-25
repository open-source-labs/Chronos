// This module enables you to use the fetch api on the backend
const fetch = require('node-fetch');
const OrderModel = require('./OrderModel');
require('dotenv').config();

const OrderController = {};

//  Controller for order creation
OrderController.createorder = (req, res, next) => {
  const newOrder = {
    customerID: req.body.customerID,
    bookID: req.body.bookID,
    purchaseDate: req.body.purchaseDate,
    deliveryDate: req.body.deliveryDate,
  };

  OrderModel.create(newOrder, (error, results) => {
    if (error) {
      console.log(`Document save to the db failed! ${error}`);
      return res.status(404).json(error);
    }
    res.locals.createorder = results;
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
    return next();
  });
};

// Controller for order deletion
OrderController.deleteorder = (req, res, next) => {
  const { id } = req.query;
  OrderModel.findOneAndDelete({ _id: id }, (error, result) => {
    if (error) {
      console.log(`Customer deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
    res.locals.deletecustomer = result;
    return next();
  });
};

//  Controller for retrieving customers info from the customer application
OrderController.fetchcustomerdata = (req, res, next) => {
  fetch(`http://customers:${process.env.CUSTOMERS_PORT}/customers/getcustomers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/JSON',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((results) => {
      res.locals.customerdata = results;
      return next();
    })
    .catch((error) => {
      console.log(`There was an error in getting customers data ${error}`);
    });
};

module.exports = OrderController;
