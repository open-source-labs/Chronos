
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


orderClient.getOrders(null, (err, data) => {
  if (err !== null) {
    console.log('err')
    console.log(err)
  }
  console.log('getOrders response: ', data);
})



//this book server.js
// const bookSErver = require('this file')
bookServer.bookClient 
module.exports = orderClient;
exports.orderClient = orderClient;

module.exports = orderClient;
