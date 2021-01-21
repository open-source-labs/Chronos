const { v4: uuidv4 } = require("uuid");

function makeMethods(
  clientWrapper,
  client,
  metadata,
  names,
  severname,
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
      //start time
      //before we send message
      if (id !== undefined) message.metadata.id = id 
      else {message.metadata.id = uuidv4()}
      client[name](message, (error, response) => {
        // if old metadataid exists, set metadata[name].id = old metadataid
        callback(error, response);
      }).on("metadata", (metadataFromServer) => {
        metadata[name].id = JSON.parse(metadataFromServer.get('id')[0])
        //write a mongo log here with time and id
      });
    };
  };


class HorusClientWrapper {
  constructor(client, service, serviceName, severname) {
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(
      this,
      client,
      this.metadata,
      names,
      serviceName,
    );
  }
  makeHandShakeWithServer(server, method, ) {
    server.acceptMetadata(this.metadata[method]);
  }
}

module.exports = HorusClientWrapper;