const PROTO_PATH = './orders.proto';
const grpc = require('@grpc/grpc-js');

const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const ordersProto = grpc.loadPackageDefinition(packageDefinition);

// const { v4: uuidv4 } = require("uuid");
//import a mongoose connection or a postgres
const server = new grpc.Server();
server.addService(ordersProto.ProxyToOrder.service, {
  addOrder: (call, callback) => {
    console.log(call);
    callback(null, {});
  },
  getOrders: (call, callback) => {
    console.log(call)
    callback(null, 'Hi Ho');
  },
});
console.log('yooo');
// start server
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
console.log("Server running at http://127.0.0.1:30043");
