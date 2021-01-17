const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ModuleResolutionKind } = require('typescript');
const PROTO_PATH = './orders.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const OrderToBookService = grpc.loadPackageDefinition(packageDefinition).OrderToBook;
const orderClient = new OrderToBookService(
  "localhost:30044",
  grpc.credentials.createInsecure(),
);

module.exports = orderClient;