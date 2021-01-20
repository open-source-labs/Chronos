
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ModuleResolutionKind } = require('typescript');
const PROTO_PATH = './reverseProxy.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

/**
 * Proxy to Order
 */
const ProxyToOrderService = grpc.loadPackageDefinition(packageDefinition).ProxyToOrder;
const orderClient = new ProxyToOrderService(
  "localhost:30043",
  grpc.credentials.createInsecure()
);



module.exports = orderClient;
