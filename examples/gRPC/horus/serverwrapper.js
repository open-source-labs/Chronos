const grpc = require('@grpc/grpc-js');
const { v4: uuidv4 } = require("uuid");
function wrapMethods(metadata, methods) {
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = function (call, callback) {
      const id = call.metadata.id
      //request recieved mongo entry
      methods[name](call, (error, response) => {
        //getBookInfo
        let meta = new grpc.Metadata();
        call.sendMetadata(meta);
        metadata.trace = "none";
        //reply sent mongo entry
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
