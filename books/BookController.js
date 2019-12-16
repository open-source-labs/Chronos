const BookModel = require('./BookModel');

const BookController = {};


BookController.createBook = (req, res, next) => {
  const {
    title, author, numberPages, publisher,
  } = req.body;

  BookModel.create({
    title, author, numberPages, publisher,
  }, (err, result) => {
    if (err) {
      return res.send(404).json(err);
    }
    res.locals.createBook = result;
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

// BookController.saveBook = (req, res, next) => {

// };


// This controller deletes books
BookController.deleteBook = (req, res, next) => {
  const { id } = req.params;
  BookModel.findOneAndRemove({ id }, (error, result) => {
    if (error) {
      return res.status(404).json(error);
    }
    res.locals.deleteBook = result;
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
