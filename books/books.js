const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');

const mw = require("../mwMongo.js");
app.use("/", mw.microCom(path.basename(__filename)));

//Required to get rid of deprecation warnings
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

require('./Book')
const Book = mongoose.model("Book")

//Connects our bookservice db to cloud db
mongoose.connect("mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/booksservice", () => {
  console.log("Books database is connected...")
});

app.get('/', (req,res,next) => {
  return res.status(200).send("This is our main endpoint!");
})


//Create functionality
app.post('/book', (req,res,next) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  }
  //create a new Book with the above attributes
  const book = new Book(newBook)

  //save our book to collection

  book.save().then(() => {
      res.send("Book successfully saved to the database");
      next();
    })
    .catch(err => {
      Promise.reject(err);
    });
})


app.get('/books', (req, res,next) => {
  Book.find().then((books) => {
    res.json(books)
    next();
  }).catch((err) => {
    Promise.reject(err)
  })
})

//Get a book by its id
app.get('/book/:id', (req,res,next) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book)
        next();
      } else {
        Promise.reject(err);
      }
    })
})


app.delete('/book/:id', (req,res,next) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => {
      res.send('Book successfully deleted')
      next();
    }).catch((err) => {
      if (err) {
        throw err;
      }
    })
  })

//Open an express server
app.listen(4545, () => {
  console.log('Book server running on port 4545 ...');
})
