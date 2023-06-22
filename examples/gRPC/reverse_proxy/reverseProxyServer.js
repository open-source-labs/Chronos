const PORT = 3000;
const express = require('express');
const path = require('path');
const grpc = require('@grpc/grpc-js');
// uuid creates unqiue identifiers
const { v4: uuidv4 } = require('uuid');
const Chronos = require('@chronosmicro/tracker');
const chronosConfig = require('./chronos-config');
const chronos = new Chronos(chronosConfig);
require('./chronos-config');

/** invoking Chrono's tracking */
chronos.track();
const app = express();
/** requiring in the clients used for this reverse proxy server */ 
/** these clients contain methods and services that were created via the proto file, so we can use them later in the code*/

const orderClient = require('./orderClient.js');
const bookClient = require('./bookClient.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

/** HTML file to serve upon accessing PORT 3000 */ 
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

const createMeta = () => {
  const meta = new grpc.Metadata();
  meta.add('id', uuidv4());
  return meta;
};

app.post('/addBook', (req, res, next) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    publisher: req.body.publisher,
    bookID: req.body.bookID,
  };

  bookClient.AddBook(
    book,
    (err, data) => {
      if (err !== null) {
        console.log('addBook err:', err);
        // could not add book because duplicate ID
        return res.sendStatus(409);
      }
      console.log('addBook response: ', data);
      return res.sendStatus(200);
    },
    createMeta()
  );
});

app.post('/addOrder', (req, res, next) => {
  const order = {
    customerID: req.body.customerID,
    bookID: req.body.bookID,
    purchaseDate: req.body.purchaseDate,
    deliveryDate: req.body.deliveryDate,
  };

  orderClient.AddOrder(
    order,
    (err, data) => {
      if (err !== null) {
        console.log(err);
        // could not add order because bookID does not exist
        return res.sendStatus(404);
      }
      console.log('addOrder response: ', data);
      return res.sendStatus(200);
    },
    createMeta()
  );
});

app.get('/order', (req, res, next) => {
  const meta = new grpc.Metadata();
  meta.add('id', uuidv4());
  orderClient.GetOrders(
    null,
    (err, data) => {
      if (err !== null) {
        console.log(err);
      }
      console.log('getOrders response: ', data);
      return res.status(200).json(data);
    },
    meta
  );
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
