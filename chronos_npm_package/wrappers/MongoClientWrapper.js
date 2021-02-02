const mongoose = require('mongoose');
const grpc = require('@grpc/grpc-js');
const gRPC_Model = require('../models/gRPC_CommunicationModel')

function makeMethods(clientWrapper, client, metadata, names) {
  connect(clientWrapper.URI)
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
      const id = currentMetadata.get('id')[0]
      const newComm = {
        microservice: clientWrapper.config.microservice,
        request: name,
        correlatingid: id,
        responsestatus: 0,
      }

      client[name](message, currentMetadata, (error, response) => {
        let responseCom;
        if (error) {
          const newCommRes = {
            microservice: clientWrapper.config.microservice,
            request: name,
            responsestatus: error.code,
            correlatingid: id
          }
          responseCom = new gRPC_Model(newCommRes)
        } else {
          responseCom = new gRPC_Model(newComm)
        }
        responseCom
            .save()
            .then(() => {
              console.log('Request cycle saved');
            })
            .catch(err => console.log(`Error saving communications: `, err.message));
          callback(error, response);
      });
    };
  }
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

class ClientWrapper {
  constructor(client, service, userConfig) {
    this.URI = userConfig.database.URI
    this.config = userConfig
    this.metadata = {};
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

module.exports = ClientWrapper;
