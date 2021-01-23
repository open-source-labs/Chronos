const grpc = require('@grpc/grpc-js');
const { v4: uuidv4 } = require("uuid");
function wrapMethods(metadata, methods) {
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = function (call, callback) {
      console.log('metadata received by serverwrapper: ', call.metadata);
      methods[name](call, (error, response) => {
        callback(error, response);
      });
    };
  }
  return wrappedMethods;
}

class HorusServerWrapper {
  constructor(server, proto, methods) {
    this.metadata = { trace: "none", id:"none" };
    const wrappedMethods = wrapMethods(this.metadata, methods);
    server.addService(proto, wrappedMethods);
  }
}

module.exports = HorusServerWrapper;
