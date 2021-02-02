const PORT = 3000;
const express = require('express');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const { v4: uuidv4 } = require('uuid');
const chronos = require('chronos')
require('./chronos-config')

const app = express();
const orderClient = require('./orderClient.js');
const bookClient = require('./bookClient.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/addBook', (req, res, next) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
    bookID: req.body.bookID,
  };

  bookClient.AddBook(book, (err, data) => {
    if (err !== null) {
      console.log('addBook err:', err);
      // could not add book because duplicate ID
      return res.sendStatus(409);
    }
    console.log('addBook response: ', data);
    return res.sendStatus(200);
  }, chronos.meta());
});

app.post('/addOrder', (req, res, next) => {
  const order = {
    customerID: req.body.customerID,
    bookID: req.body.bookID,
    purchaseDate: req.body.purchaseDate,
    deliveryDate: req.body.deliveryDate,
  };

  orderClient.AddOrder(order, (err, data) => {
    if (err !== null) {
      console.log(err);
      // could not add order because bookID does not exist
      return res.sendStatus(404);
    } else {
      console.log('addOrder response: ', data);
      return res.sendStatus(200);
    }
  }, chronos.meta());
});

app.get('/order', (req, res, next) => {
  // create metadata with id

  let metadata = new grpc.Metadata();
  metadata.add('id', uuidv4());
  
  // console.log('metadata created in reverseProxy route: ', meta);

  orderClient.GetOrders(null, (err, data) => {
    if (err !== null) {
      console.log(err);
    } else {
      console.log('getOrders response: ', data);
      return res.status(200).json(data);
    }
  }, metadata);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
