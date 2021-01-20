const PORT = 3000;
const express = require('express');
const path = require('path');

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
  bookClient.addBook(book, (err, data) => {
    if (err !== null) {
      console.log(err);
      // could not add book because duplicate ID
      return res.sendStatus(409);
    }
    console.log('addBook response: ', data);
    return res.sendStatus(200);
  });
});

app.post('/addOrder', (req, res, next) => {
  const order = {
    customerID: req.body.customerID,
    bookID: req.body.bookID,
    purchaseDate: req.body.purchaseDate,
    deliveryDate: req.body.deliveryDate,
  };
  orderClient.addOrder(order, (err, data) => {
    if (err !== null) {
      console.log(err);
      // could not add order because bookID does not exist
      return res.sendStatus(404);
    } else {
      console.log('addOrder response: ', data);
      return res.sendStatus(200);
    }
  });
});

app.get('/order', (req, res, next) => {
  orderClient.getOrders(null, (err, data) => {
    if (err !== null) {
      console.log(err);
    } else {
      console.log('getOrders response: ', data);
      return res.status(200).json(data);
    }
  });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
