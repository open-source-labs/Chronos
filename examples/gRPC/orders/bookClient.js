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
/**
 * gRPC Interceptors 
 * @param {*} options 
 * @param {*} nextCall 
 */
// const orderInterceptors = (options, nextCall) => {
//   return new grpc.InterceptingCall(nextCall(options), {
//     start(metadata, listener, next) {
//       metadata = new grpc.Metadata();
//       // metadata.add('key', JSON.stringify(420));
//       next(metadata, {
//         onReceiveMetadata(metadata,next) {
//           console.log(metadata.get('key'));
//           next(metadata);
//         }
//       });
//     },
//   });
// };

const OrderToBookService = grpc.loadPackageDefinition(packageDefinition).OrderToBook;
const bookClient = new OrderToBookService(
  "localhost:30044",
  grpc.credentials.createInsecure()
);

const ClientWrapper = chronos.ClientWrapper(bookClient, OrderToBookService);

module.exports = ClientWrapper;
// module.exports = bookClient;