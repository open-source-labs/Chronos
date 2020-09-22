const fetch = require('node-fetch');
const BookModel = require('./BookModel');

const BookController = {};

// This middleware creates a new book
BookController.createBook = (req, res, next) => {
  const {
    title, author, numberOfPages, publisher,
  } = req.body;
  BookModel.create({
    title, author, numberOfPages, publisher,
  }, (err, result) => {
    if (err) {
      console.log(`This is the error I am getting back ${err}`);
      return res.send(404).json(err);
    }
    res.locals.createBook = result;
    return next();
  });
};

// This middleware gets all the books
BookController.getBooks = (req, res, next) => {
  BookModel.find({}, (err, result) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.locals.getBooks = result;
    return next();
  });
};


// This middleware deletes a book
BookController.deleteBook = (req, res, next) => {
  const { id } = req.query;
  BookModel.findOneAndDelete({ _id: id }, (error, result) => {
    if (error) {
      console.log(`Deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
    res.locals.deleteBook = result;
    return next();
  });
};

//  This middleware gets all the orders from the orders database by sending a request to the orders server
BookController.getorderinfo = (req, res, next) => {
  fetch('http://localhost:7777/orders/getorders', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((results) => {
      res.locals.getorderinfo = results;
      return next();
    })
    .catch((error) => {
      console.log(`There was an error in getting customers data ${error}`);
    });
};
module.exports = BookController;
