/* eslint-disable no-loop-func */
const { Client } = require('pg');
const grpc = require('@grpc/grpc-js');


async function connect(URI, client) {
  try {
    await client.connect();
    // Print success message
    console.log(`Connected to database at ${URI.slice(0, 24)}...`);
    client.query(
      `CREATE TABLE IF NOT EXISTS grpc_communications(
      _id serial PRIMARY KEY,
      microservice VARCHAR(248) NOT NULL,
      request varchar(32) NOT NULL,
      responsestatus INTEGER,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      correlatingId varchar(500)
    )`,
      (err, results) => {
        if (err) {
          throw err;
        }
      }
    );
  } catch ({ message }) {
    // Print error message
    console.log('Error connecting to PostgreSQL DB:', message);
  }
}

function makeMethods(clientWrapper, client, metadata, names) {
  connect(clientWrapper.URI, clientWrapper.SQLclient);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    clientWrapper[name] = (message, callback, meta = null) => {
      let currentMetadata;
      if (meta) {
        currentMetadata = meta;
      } else {
        // get metadata from link
        currentMetadata = clientWrapper.metadata.metadata;
      }
      client[name](message, currentMetadata, (error, response) => {
        // add status codes here
        const queryString = `
          INSERT INTO grpc_communications (microservice, request, responsestatus, correlatingId)
          VALUES ($1, $2, $3, $4);`;
        const { microservice } = clientWrapper.config.microservice;
        const request = name;
        let responsestatus = 0;
        const correlatingId = currentMetadata.get('id')[0];
        if (error) {
          responsestatus = error.code;
        }
        const values = [microservice, request, responsestatus, correlatingId];
        clientWrapper.SQLclientSQLclient.query(queryString, values, (err, result) => {
          if (err) {
            throw err;
          }
          console.log('Request cycle saved');
        });
        callback(error, response);
      });
    };
  }
}

class ClientWrapper {
  constructor(client, service, userConfig) {
    this.URI = userConfig.database.URI;
    this.config = userConfig;
    this.metadata = {};
    this.SQLclient = new Client(this.URI);
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

module.exports = ClientWrapper;
