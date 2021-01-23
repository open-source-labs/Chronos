const { v4: uuidv4 } = require("uuid");
const grpc = require('@grpc/grpc-js');


function makeMethods(clientWrapper, client, metadata, names) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    metadata[name] = {
      methodName: name,
      responseTime: null,
      id: null,
      trace: {},
    };
    const meta = new grpc.Metadata();
    meta.add('id', '10');
    console.log('metadata to be sent: ', meta.get('id'));

    clientWrapper[name] = function (message, callback) {
      client[name](message, meta, (error, response) => {
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

HorusClientWrapper.prototype.link = function (server) {
  this.currentMetaData = server.metadata;
};

module.exports = HorusClientWrapper;
