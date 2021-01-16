
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ModuleResolutionKind } = require('typescript');
const PROTO_PATH = './reverseproxy.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

/**
 * Proxy to Order
 */
const ProxyToOrderService = grpc.loadPackageDefinition(packageDefinition).ProxyToOrder;
const orderClient = new ProxyToOrderService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

/**
 * Proxy to Book
 */
const ProxyToBookService = grpc.loadPackageDefinition(packageDefinition).ProxyToBook;
const bookClient = new ProxyToBookService(
    "localhost:30044",
    grpc.credentials.createInsecure()
);

module.exports = {
  orderClient,
  bookClient,
}

orderClient.getOrders(null, (err, data) => {
  if (err !== null) {
    console.log('err')
    console.log(err)
  }
  console.log('getOrders response: ', data);
})

const harryPotter = {
  title: 'Harry',
  author: 'JK',
  pageCount: 561,
  publisher: 'Matt and Vince',
}

bookClient.addBook(harryPotter, (err, data) => {
  if (err !== null) {
    console.log('err')
    console.log(err)
  }
  console.log('addBook response: ', data);
})

//this book server.js
// const bookSErver = require('this file')
// bookServer.bookClient 
module.exports = orderClient;
// exports.orderClient = orderClient;