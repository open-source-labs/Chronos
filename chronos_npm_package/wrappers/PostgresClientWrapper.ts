import pkg from 'pg';
import type { Client as PgClient } from 'pg';
const { Client } = pkg;

import grpc from '@grpc/grpc-js';

async function connect(URI: string, client: PgClient) {
  try {
    await client.connect();
    // Print success message
    console.log(`Connected to database at ${URI.slice(0, 24)}...`);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS grpc_communications(
        _id serial PRIMARY KEY,
        microservice VARCHAR(248) NOT NULL,
        request VARCHAR(32) NOT NULL,
        responsestatus INTEGER,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        correlatingId VARCHAR(500)
      )
    `);
  } catch (error: any) {
    console.log('Error connecting to PostgreSQL DB:', error.message);
  }
}

function makeMethods(
  clientWrapper: ClientWrapper,
  client: any,
  metadata: any,
  names: string[]
) {
  connect(clientWrapper.URI, clientWrapper.SQLclient);
  
  for (const name of names) {
    clientWrapper[name] = (message: any, callback: Function, meta: any = null) => {
      let currentMetadata = meta || clientWrapper.metadata.metadata;
      
      client[name](message, currentMetadata, (error: any, response: any) => {
        // Define query
        const queryString = `
          INSERT INTO grpc_communications (microservice, request, responsestatus, correlatingId)
          VALUES ($1, $2, $3, $4)
        `;

        // Correctly extract microservice name
        const microservice = clientWrapper.config.microservice;
        const request = name;
        let responsestatus = error ? error.code : 0;
        const correlatingId = currentMetadata.get('id')[0];

        const values = [microservice, request, responsestatus, correlatingId];

        // Use correct SQL client reference
        clientWrapper.SQLclient.query(queryString, values, (err: any) => {
          if (err) {
            console.error('Error saving request cycle:', err.message);
          } else {
            console.log('Request cycle saved');
          }
        });

        callback(error, response);
      });
    };
  }
}

interface DatabaseConfig {
  URI: string;
}

interface UserConfig {
  database: DatabaseConfig;
  microservice: string;
}

class ClientWrapper {
  URI: string;
  config: UserConfig;
  metadata: Record<string, any>;
  SQLclient: PgClient;

  constructor(client: any, service: any, userConfig: UserConfig) {
    this.URI = userConfig.database.URI;
    this.config = userConfig;
    this.metadata = {};
    // Initialize the SQL client using the Client constructor from pg
    this.SQLclient = new Client({ connectionString: this.URI });

    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

export default ClientWrapper;
