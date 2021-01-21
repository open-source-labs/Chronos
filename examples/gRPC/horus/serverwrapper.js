// const grpc = require('grpc');
// const { v4: uuidv4 } = require("uuid");
function wrapMethods(metadata, methods) {
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = function (call, callback) {
      // const id = call.metadata.id
      //request recieved mongo entry
      console.log('before server response');
      // console.log('call received by server', call);
      methods[name](call, (error, response) => {
        // var myVals = call.metadata.get("key"); 
        // //My vals will be an array, so if you want to grab a single value:
        // var myVal = myVals[0];
        // console.log('metadata received by server', myVals);
        //getBookInfo
        // let meta = new grpc.Metadata();
        // call.sendMetadata(meta);
        // metadata.trace = "none";
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

  acceptMetadata(metadataFromClient) {
    this.metadata.id = metadataFromClient.id
  }

}

module.exports = HorusServerWrapper;
