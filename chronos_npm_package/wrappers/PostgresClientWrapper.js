const grpc = require('@grpc/grpc-js');

function makeMethods(clientWrapper, client, metadata, names) {
  
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    
    clientWrapper[name] = function (message, callback, meta = null) {
      let currentMetadata;
      if (meta) {
        currentMetadata = meta;
      } else {
        //get metadata from link 
        currentMetadata = this.metadata.metadata;
      }
      console.log('metadata in clientwrapper: ', currentMetadata);

      client[name](message, currentMetadata, (error, response) => {
        callback(error, response);
      });
    };
  }
}

class ClientWrapper {
  constructor(client, service) {
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

module.exports = ClientWrapper;
