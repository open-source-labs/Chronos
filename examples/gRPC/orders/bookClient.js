const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './order.proto';
const chronos = require('chronos');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const OrderToBookService = grpc.loadPackageDefinition(packageDefinition).OrderToBook;
const bookClient = new OrderToBookService(
  "localhost:30044",
  grpc.credentials.createInsecure()
);

const ClientWrapper = chronos.ClientWrapper(bookClient, OrderToBookService);

module.exports = ClientWrapper;