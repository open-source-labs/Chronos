const BookModel = require('./BookModel');

const BookController = {};


BookController.createBook = (req, res, next) => {
  const {
    title, author, numberOfPages, publisher,
  } = req.body;
  console.log('This is the title ', req.body.title);
  BookModel.create({
    title, author, numberOfPages, publisher,
  }, (err, result) => {
    if (err) {
      console.log(`This is the error I am getting back ${err}`);
      return res.send(404).json(err);
    }

    res.locals.createBook = result;
    console.log(`Book was successfully stored in db ${res.locals.createBook}`);
    return next();
  });
};


BookController.getBooks = (req, res, next) => {
  BookModel.find({}, (err, result) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.locals.getBooks = result;
    return next();
  });
};


// This controller deletes books
BookController.deleteBook = (req, res, next) => {
  const { id } = req.query;
  console.log(`This is the id of the request ${id}`);
  BookModel.findOneAndDelete({ _id: id }, (error, result) => {
    if (error) {
      console.log(`Deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
    res.locals.deleteBook = result;
    console.log(`Deletion was successful ${res.locals.deleteBook}`);
    return next();
  });
};


module.exports = BookController;


// app.delete('/book/:id', (req, res, next) => {
//   Book.findOneAndRemove(req.params.id)
//     .then(() => {
//       res.send('Book successfully deleted');
//       next();
//     }).catch((err) => {
//       if (err) {
//         throw err;
//       }
//     });
// });
