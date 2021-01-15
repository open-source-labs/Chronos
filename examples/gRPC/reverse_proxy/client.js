const PROTO_PATH = './reverseproxy.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const ProxyToOrderService = grpc.loadPackageDefinition(packageDefinition).ProxyToOrder;
const client = new ProxyToOrderService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = client;