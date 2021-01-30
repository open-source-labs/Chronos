const grpc = require('@grpc/grpc-js');

function wrapMethods(server, metadataHolder, methods) {
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = function (call, callback) {

      metadataHolder.metadata = call.metadata;
      const id = metadataHolder.metadata.get('id');
      methods[name](call, (error, response) => {
        // after server's response has been sent
        callback(error, response);
        // console.log('server: ', server);

        console.log(`write a mongo record with microservice: SERVICENAME, function name: ${name}, correlatingid: ${id}, time: ${Date.now()}`);
        
      });
    };
  }
  return wrappedMethods;
}

class ServerWrapper {
  constructor(server, proto, methods, userConfig) {
    this.metadataHolder = {};
    const wrappedMethods = wrapMethods(server, this.metadataHolder, methods);
    server.addService(proto, wrappedMethods);
  }
}

module.exports = ServerWrapper;
