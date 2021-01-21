const { v4: uuidv4 } = require("uuid");

function makeMethods(clientWrapper, client, metadata, names) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    metadata[name] = {
      methodName: name,
      responseTime: null,
      id: null,
      trace: {},
    };
    clientWrapper[name] = function (message, callback) {
      //start time
      // before we send message
      const meta = new grpc.Metadata();
      meta.add('gRPC','is hard');
      console.log(meta.get('gRPC'))
      client[name](message, meta, (error, response) => {
        // if old metadataid exists, set metadata[name].id = old metadataid
        callback(error, response);
      });
    };
  }
}

class HorusClientWrapper {
  constructor(client, service) {
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

module.exports = HorusClientWrapper;
