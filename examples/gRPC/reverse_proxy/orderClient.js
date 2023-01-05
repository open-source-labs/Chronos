const chronos = require('@chronosmicro/tracker');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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
const orderClient = new ProxyToOrderService('localhost:30043', grpc.credentials.createInsecure());

const ClientWrapper = chronos.ClientWrapper(orderClient, ProxyToOrderService);

module.exports = ClientWrapper;
