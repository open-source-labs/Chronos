
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
 * Create Interceptors 
 */

// const orderInterceptors = (options, nextCall) => {
//   return new grpc.InterceptingCall(nextCall(options), {
//     start(metadata, listener, next) {
//       metadata = new grpc.Metadata();
//       metadata.add('key', JSON.stringify(420));
//       next(metadata, {
//         onReceiveMetadata(metadata,next) {
//           next(metadata);
//         }
//       });
//     },
//   });
// };

/**
 * Proxy to Order
 */
const ProxyToOrderService = grpc.loadPackageDefinition(packageDefinition).ProxyToOrder;
const orderClient = new ProxyToOrderService(
'localhost:30043',
 grpc.credentials.createInsecure()
//   {
//   interceptors: [orderInterceptors]
// }
);

console.log('orderClient: ', orderClient);
module.exports = orderClient;
