const { Client } = require('pg');
const grpc = require('@grpc/grpc-js');

let SQLclient;
async function connect(URI) {
  try {
    SQLclient = new Client(URI);
    await SQLclient.connect();
    // Print success message
    console.log(`Connected to database at ${URI.slice(0, 24)}...`);
    SQLclient.query(
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

function makeMethods(clientWrapper, client, metadata, names, SQL) {
  connect(clientWrapper.URI);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    clientWrapper[name] = (message, callback, meta = null) => {
      let currentMetadata;
      if (meta) {
        currentMetadata = meta;
      } else {
        // get metadata from link
        currentMetadata = this.metadata.metadata;
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
        SQL.query(queryString, values, (err, result) => {
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
    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names, SQLclient);
  }
}

module.exports = ClientWrapper;
