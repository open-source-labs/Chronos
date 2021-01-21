const HorusServerWrapper = require('../horus/serverwrapper');
// grpc imports
const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

// mongodb imports and model imports
// const mongoose = require('mongoose');
require('dotenv').config(); // set up environment variables in .env
const BookModel = require('./bookModel');

// load books proto
const PROTO_PATH = './book.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});
const bookProto = grpc.loadPackageDefinition(packageDefinition);
// const 
// create gRPC server and add services
const server = new grpc.Server();
/**
 * SERVER WRAPPER
 */
// const proxyToBookServerWrapper = new HorusServerWrapper(server, bookProto.ProxyToBook.service, {
//   addBook: (call, callback) => {
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
//     .then((data) => {
//       callback(null, {});
//     })
//     .catch((err) => {
//       if (err.code === 11000) {
//         callback({
//           code: grpc.status.ALREADY_EXISTS,
//           details: "BookID already exists"
//         })
//       }
//     })
//   },
// });

// const orderToBookServerWrapper = new HorusServerWrapper(server, bookProto.OrderToBook.service, {
//   getBookInfo: (call, callback) => {
//     BookModel.findOne({ bookID: call.request.bookID }, (err, data) => {
//       callback(null, data);
//     })
//   }
// })

/**
 * SERVER WITHOUT WRAPPER
 */
server.addService(bookProto.ProxyToBook.service, {
  addBook: (call, callback) => {
    var myVals = call.metadata.get("key"); 
    var myVal = myVals[0];
    console.log('metadata received by bookServer', myVals);

    // get the properties from the gRPC client call
    const { title, author, numberOfPages, publisher, bookID } = call.request;
    // create a book in our book collection
    BookModel.create({
      title,
      author,
      numberOfPages,
      publisher,
      bookID,
    })
    .then((data) => {
      callback(null, {});
    })
    .catch((err) => {
      if (err.code === 11000) {
        callback({
          code: grpc.status.ALREADY_EXISTS,
          details: "BookID already exists"
        })
      }
    })
  },
});

server.addService(bookProto.OrderToBook.service, {
  getBookInfo: (call, callback) => {
    BookModel.findOne({ bookID: call.request.bookID }, (err, data) => {
      callback(null, data);
    })
    },
})

// console.log('server wrapper: ', server);
// console.log('server without wrapper: ', server);

// start server
server.bindAsync("127.0.0.1:30044", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at http://127.0.0.1:30044");
});