const grpc = require('@grpc/grpc-js');
const mongoose = require('mongoose');
const gRPC_Model = require('../models/gRPC_CommunicationModel')

function wrapMethods(server, metadataHolder, methods, userConfig) {
  connect(userConfig.database.URI)
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = function (call, callback) {

      metadataHolder.metadata = call.metadata;
      const id = metadataHolder.metadata.get('id')[0];
      methods[name](call, (error, response) => {
        // after server's response has been sent
        const newComms = {
          microservice: userConfig.microservice,
          request: name,
          correlatingid: id,
        };
        const communication = new gRPC_Model(newComms);
        communication
          .save()
          .then(() => {
            console.log('Request cycle saved');
          })
          .catch(err => console.log(`Error saving communications: `, err.message));
        callback(error, response);
      });
    };
  }
  return wrappedMethods;
}

async function connect(URI) {
  try {
    await mongoose.connect(`${URI}`);
    // Print success message
    console.log(`Chronos MongoDB is connected at ${URI.slice(0, 20)}...`);
  } catch ({ message }) {
    // Print error message
    console.log('Error connecting to MongoDB:', message);
  }
}

class ServerWrapper {
  constructor(server, proto, methods, userConfig) {
    this.metadataHolder = {};
    const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig);
    server.addService(proto, wrappedMethods);
  }
}

module.exports = ServerWrapper;
