const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ModuleResolutionKind } = require('typescript');
const PROTO_PATH = './reverseproxy.proto';

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

const harryPotter = {
  title: 'Harry Potter',
  author: 'JK',
  pageCount: 561,
  publisher: 'Matt and Vince and Derek',
}

bookClient.addBook(harryPotter, (err, data) => {
  if (err !== null) {
    console.log('err')
    console.log(err)
  }
  console.log('addBook response: ', data);
})

module.exports = bookClient;