// grpc imports
const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");

// mongodb imports and model imports
// const mongoose = require('mongoose');
require('dotenv').config(); // set up environment variables in .env
const BookModel = require('./BookModel');

// load books proto
const PROTO_PATH = './books.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});
const booksProto = grpc.loadPackageDefinition(packageDefinition);

// connect to mongodb
// const uri = process.env.MONGO_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// })

// create gRPC server and add services
const server = new grpc.Server();
server.addService(booksProto.ProxyToBook.service, {
  addBook: (call, callback) => {
    console.log('Book has been added');
    console.log(call.request);

    // get the properties from the gRPC client call
    const { title, author, pageCount, publisher } = call.request;
    // create a book in our book collection
    BookModel.create({
      title,
      author,
      numberOfPages: pageCount,
      publisher,
    })
    // .then((response)=> {
    //   console.log('posted to mongoDB')
    // })
    // .catch((err)=> {
    //   console.log(err)
    // });

    // send response back to client
    callback(null, {});
  },
});

// start server
server.bindAsync("127.0.0.1:30044", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at http://127.0.0.1:30044");
});