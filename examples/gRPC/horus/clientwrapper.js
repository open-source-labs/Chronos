const { v4: uuidv4 } = require("uuid");
const grpc = require('@grpc/grpc-js');

function makeMethods(
  clientWrapper,
  client,
  metadata,
  names,
) {
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    metadata[name] = {
      methodName: name,
      responseTime: null,
      id: null,
      trace: {},
    };
    
    clientWrapper[name] = function (message, id, callback, xCorrelatingId) {
      console.log('before client request');
      // if x-correlating-id exists, use it in client's request. if not, create one.
      // if (!xCorrelatingId) {
        //   message.metadata.xCorrelatingId = 1234
        // } else {
          //   message.metadata.xCorrelatingId = xCorrelatingId;
          // }
      // const meta = new grpc.Metadata();
      // meta.add('key', 'whatupcouncil');
      // console.log('metadata to add to client:', meta);
      client[name](message, id, callback);
      // .on("metadata", (metadataFromServer) => {
      //   // metadata[name].id = JSON.parse(metadataFromServer.get('id')[0])
      //   //write a mongo log here with time and id
      // });
    };
  };
}

class HorusClientWrapper {
  constructor(client, service) {
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(
      this,
      client,
      this.metadata,
      names,
    );
  }
}

module.exports = HorusClientWrapper;