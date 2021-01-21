const HorusClientWrapper = require('../horus/clientwrapper');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ModuleResolutionKind } = require('typescript');
const PROTO_PATH = './reverseProxy.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
});

const ProxyToBookService = grpc.loadPackageDefinition(packageDefinition).ProxyToBook;
const bookClient = new ProxyToBookService(
    "localhost:30044",
    grpc.credentials.createInsecure()
);

// method names must match .proto file exactly
// const ClientWrapper = new HorusClientWrapper(bookClient, ProxyToBookService);

module.exports = bookClient;
// console.log('ClientWrapper:', ClientWrapper);
// module.exports = ClientWrapper;