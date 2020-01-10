const fetch = require('node-fetch');
const CustomerModel = require('./CustomerModel');

const CustomerController = {};

// This middleware creates a new customer
CustomerController.createcustomer = (req, res, next) => {
  const { name, age, address } = req.body;
  CustomerModel.create({ name, age, address }, (error, result) => {
    if (error) {
      console.log(`Customer could not be created in database ${error}`);
      return res.status(404).json(error);
    }
    res.locals.createcustomer = result;
    return next();
  });
};

//  This middleware gets all the customers
CustomerController.getcustomers = (req, res, next) => {
  CustomerModel.find({}, (error, result) => {
    if (error) {
      console.log(`Customer could not be found in database ${error}`);
      return res.status(404).json(error);
    }
    res.locals.getcustomers = result;
    return next();
  });
};

//  This middleware deletes a customer
CustomerController.deletecustomer = (req, res, next) => {
  const { id } = req.query;
  CustomerModel.findOneAndDelete({ _id: id }, (error, result) => {
    if (error) {
      console.log(`Customer deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
    res.locals.deletecustomer = result;
    return next();
  });
};

//  This middleware gets all the books from the books database by sending a request to the books server
CustomerController.getbooksinfo = (req, res, next) => {
  fetch('http://localhost:4545/books/getbooks', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((results) => {
      res.locals.booksinfo = results;
      return next();
    })
    .catch((error) => {
      console.log(`There was an error in getting customers data ${error}`);
    });
};

module.exports = CustomerController;