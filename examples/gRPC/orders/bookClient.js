const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Chronos = require('@chronosmicro/tracker');
const chronosConfig = require('./chronos-config');
const chronos = new Chronos(chronosConfig);

const PROTO_PATH = './order.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const OrderToBookService = grpc.loadPackageDefinition(packageDefinition).OrderToBook;
const bookClient = new OrderToBookService('localhost:30044', grpc.credentials.createInsecure());

const ClientWrapper = chronos.ClientWrapper(bookClient, OrderToBookService);

module.exports = ClientWrapper;
