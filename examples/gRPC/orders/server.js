const PROTO_PATH = './orders.proto';
const grpc = require('@grpc/grpc-js');
const client = require('./client.js');
const OrderModel = require('./OrderModel.js')

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
    const newOrder = {
      customerID: call.request.customerID,
      bookID: call.request.bookID,
      purchaseDate: call.request.purchaseDate,
      deliveryDate: call.request.deliveryDate,
    };
    OrderModel.create(newOrder);
  },
  //call.name // call.request.name
  getOrders: (call, callback) => {
    
    const ordersWithInfo = [];
    OrderModel.find({}, (err, data) => {
      for (let i = 0; i < data.length; i += 1) {
        const tempObj = {
          customerID: data[i].customerID,
          bookID: data[i].bookID,
          purchaseDate: data[i].purchaseDate,
          deliveryDate: data[i].deliveryDate,
       };
        client.getBookInfo({bookID: data[i].bookID}, (err, bookInfo) => {
          console.log(tempObj);
          tempObj['title'] = bookInfo.title;
          tempObj.author = bookInfo.author;
          tempObj.bookID = bookInfo.bookID;
          tempObj.numberOfPages = bookInfo.numberOfPages;
          tempObj.publisher = bookInfo.publisher;
          console.log(tempObj);
          ordersWithInfo.push(tempObj);
          console.log('orderList', ordersWithInfo);
          if (i === data.length - 1) callback(null, { orderList: ordersWithInfo });
        })
          
      }
   
    })
  },
});

console.log('yooo');
// start server
server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
console.log("Server running at http://127.0.0.1:30043");
