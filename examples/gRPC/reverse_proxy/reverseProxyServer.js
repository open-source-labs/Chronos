const PORT = 3000;
const express = require('express');
const path = require('path');
const grpc = require('@grpc/grpc-js');
const { v4: uuidv4 } = require('uuid');
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
  // maybe put this in an app.use(*)?
  const meta = new grpc.Metadata();
  meta.add('id', uuidv4());
  console.log('metadata created in reverseProxy route: ', meta);

  bookClient.AddBook(book, (err, data) => {
    if (err !== null) {
      console.log('addBook err:', err);
      // could not add book because duplicate ID
      return res.sendStatus(409);
    }
    console.log('addBook response: ', data);
    return res.sendStatus(200);
  }, meta);
});

app.post('/addOrder', (req, res, next) => {
  const order = {
    customerID: req.body.customerID,
    bookID: req.body.bookID,
    purchaseDate: req.body.purchaseDate,
    deliveryDate: req.body.deliveryDate,
  };

  // user has to create metadata and add it as a third argument to the method
  const meta = new grpc.Metadata();
  meta.add('id', uuidv4());
  console.log('metadata created in reverseProxy route: ', meta);

  orderClient.AddOrder(order, (err, data) => {
    if (err !== null) {
      console.log(err);
      // could not add order because bookID does not exist
      return res.sendStatus(404);
    } else {
      console.log('addOrder response: ', data);
      return res.sendStatus(200);
    }
  }, meta);
});

app.get('/order', (req, res, next) => {
  // create metadata with id
  const meta = new grpc.Metadata();
  meta.add('id', uuidv4());
  console.log('metadata created in reverseProxy route: ', meta);

  orderClient.GetOrders(null, (err, data) => {
    if (err !== null) {
      console.log(err);
    } else {
      console.log('getOrders response: ', data);
      return res.status(200).json(data);
    }
  }, meta);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
