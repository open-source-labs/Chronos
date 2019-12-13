const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');

const mw = require("../mwMongo.js");
app.use("/", mw.microCom(path.basename(__filename)));

//Required to get rid of deprecation warnings
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

//Load our model
require('./Order')
const Order = mongoose.model('Order')

//Create new order
app.post('/order', (req,res,next) => {
  let newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  }
  let order = new Order(newOrder);

  order.save().then(() => {
    res.send('Order successfully created')
    next();
  }).catch((err) => {
    Promise.reject(err)
  })
})

//get Orders
app.get('/orders', (req,res,next) => {
  Order.find().then((books)=> {
    res.json(books)
    next();
  }).catch((err) => {
    Promise.reject(err)
  })
})

app.get('/order/:id', (req,res,next) => {
  Order.findById(req.params.id)
  .then((order) => {
      let orderObject
      axios.get('http://localhost:5555/customer/' + order.CustomerID)
      .then(res => {
        orderObject = {customerName: res.data.name, bookTitle:''}
        axios.get('http://localhost:4545/book/' + order.BookID)
        .then(res => {
          orderObject.bookTitle = res.data.title
        })
        .catch(err => {
          Promise.reject(err)
        })
      })
      .catch(err => {
        Promise.reject(err)
      })
  })
  .catch((err) => {
    Promise.reject(err)
  })
  next()
}) 


app.listen(7777, () => {
  console.log('Orders server running on port 7777...')
})