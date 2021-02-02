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
      `CREATE TABLE IF NOT EXISTS communications(
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

function wrapMethods(server, metadataHolder, methods, userConfig, SQL) {
  connect(userConfig.database.URI)
  const keys = Object.keys(methods);
  const wrappedMethods = {};
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    wrappedMethods[name] = (call, callback) => {
      metadataHolder.metadata = call.metadata;
      methods[name](call, (error, response) => {
        const queryString = `
          INSERT INTO grpc_communications (microservice, request, correlatingId)
          VALUES ($1, $2, $3);`;
        const { microservice } = userConfig.microservice;
        const request = name;
        const correlatingId = metadataHolder.metadata.get('id')[0];
        const values = [microservice, request, correlatingId];
        SQL.query(queryString, values, (err, result) => {
          if (err) {
            throw err;
          }
          console.log('Request cycle saved');
        });
        // after server's response has been sent
        callback(error, response);
      });
    };
  }
  return wrappedMethods;
}

class ServerWrapper {
  constructor(server, proto, methods, userConfig) {
    this.metadataHolder = {};
    const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig, SQLclient);
    server.addService(proto, wrappedMethods);
  }
}

module.exports = ServerWrapper;
