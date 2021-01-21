const { v4: uuidv4 } = require("uuid");

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
    clientWrapper[name] = function (message, callback) {
      console.log('before client request');
      client[name](message, callback);
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