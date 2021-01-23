const HorusServerWrapper = require('../horus/serverwrapper');
// grpc imports
const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const HorusServerWrapper = require('../horus/serverwrapper');

// mongodb imports and model imports
// const mongoose = require('mongoose');
require('dotenv').config(); // set up environment variables in .env
const BookModel = require('./BookModel');

// load books proto
const PROTO_PATH = './book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
const booksProto = grpc.loadPackageDefinition(packageDefinition);
// const 
// create gRPC server and add services
const server = new grpc.Server();

// server.addService(booksProto.ProxyToBook.service, {
//   addBook: (call, callback) => {
//     console.log('Book has been added');
//     console.log(call.request);

//     // get the properties from the gRPC client call
//     const { title, author, numberOfPages, publisher, bookID } = call.request;
//     // create a book in our book collection
//     BookModel.create({
//       title,
//       author,
//       numberOfPages,
//       publisher,
//       bookID,
//     })
//     callback(null, {});
//   },
// });
const ServerWrapper = new HorusServerWrapper(server, booksProto.ProxyToBook.service, {
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
server.addService(booksProto.OrderToBook.service, {
  getBookInfo: (call, callback) => {
    console.log(call.request.bookID);
    BookModel.findOne({ bookID: call.request.bookID }, (err, data) => {
      // console.log(data)
      // console.log(call.metadata.get("key"));
      //data needs to be formatted first
      callback(null, data);
    });
  },
});

// start server
server.bindAsync("127.0.0.1:30044", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at http://127.0.0.1:30044");
});