// grpc imports
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const chronos = require('chronos');
require('./chronos-config');
require('dotenv').config(); // set up environment variables in .env
const BookModel = require('./BookModel');

chronos.track();
// load books proto
const PROTO_PATH = './book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});
const booksProto = grpc.loadPackageDefinition(packageDefinition);
// create gRPC server and add services
const server = new grpc.Server();

const ProxyToBookWrapper = chronos.ServerWrapper(server, booksProto.ProxyToBook.service, {
  AddBook: (call, callback) => {
    // console.log(call.metadata)
    // get the properties from the gRPC client call
    const { title, author, numberOfPages, publisher, bookID } = call.request;
    // create a book in our book collection
    BookModel.create({
      title,
      author,
      numberOfPages,
      publisher,
      bookID,
    });
    callback(null, {});
  },
});

const OrderToBookWrapper = chronos.ServerWrapper(server, booksProto.OrderToBook.service, {
  getBookInfo: (call, callback) => {
    console.log(call.metadata);
    BookModel.findOne({ bookID: call.request.bookID }, (err, data) => {
      callback(null, data);
    });
  },
});

// start server
server.bindAsync('127.0.0.1:30044', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Server running at http://127.0.0.1:30044');
});
