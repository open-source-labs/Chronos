// /* eslint-disable no-loop-func */
// import { Client } from 'pg';
// import grpc from '@grpc/grpc-js';


// async function connect(URI, client) {
//   try {
//     await client.connect();
//     // Print success message
//     console.log(`Connected to database at ${URI.slice(0, 24)}...`);
//     client.query(
//       `CREATE TABLE IF NOT EXISTS grpc_communications(
//       _id serial PRIMARY KEY,
//       microservice VARCHAR(248) NOT NULL,
//       request varchar(32) NOT NULL,
//       responsestatus INTEGER,
//       time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       correlatingId varchar(500)
//     )`,
//       (err, results) => {
//         if (err) {
//           throw err;
//         }
//       }
//     );
//   } catch ({ message }) {
//     // Print error message
//     console.log('Error connecting to PostgreSQL DB:', message);
//   }
// }

// function makeMethods(clientWrapper, client, metadata, names) {
//   connect(clientWrapper.URI, clientWrapper.SQLclient);
//   for (let i = 0; i < names.length; i++) {
//     const name = names[i];
//     clientWrapper[name] = (message, callback, meta = null) => {
//       let currentMetadata;
//       if (meta) {
//         currentMetadata = meta;
//       } else {
//         // get metadata from link
//         currentMetadata = clientWrapper.metadata.metadata;
//       }
//       client[name](message, currentMetadata, (error, response) => {
//         // add status codes here
//         const queryString = `
//           INSERT INTO grpc_communications (microservice, request, responsestatus, correlatingId)
//           VALUES ($1, $2, $3, $4);`;
//         const { microservice } = clientWrapper.config.microservice;
//         const request = name;
//         let responsestatus = 0;
//         const correlatingId = currentMetadata.get('id')[0];
//         if (error) {
//           responsestatus = error.code;
//         }
//         const values = [microservice, request, responsestatus, correlatingId];
//         clientWrapper.SQLclientSQLclient.query(queryString, values, (err, result) => {
//           if (err) {
//             throw err;
//           }
//           console.log('Request cycle saved');
//         });
//         callback(error, response);
//       });
//     };
//   }
// }

// class ClientWrapper {
//   constructor(client, service, userConfig) {
//     this.URI = userConfig.database.URI;
//     this.config = userConfig;
//     this.metadata = {};
//     this.SQLclient = new Client(this.URI);
//     const names = Object.keys(service.service);
//     makeMethods(this, client, this.metadata, names);
//   }
// }

// export default ClientWrapper;

/* eslint-disable no-loop-func */
import { Client } from 'pg';
import grpc from '@grpc/grpc-js';

async function connect(URI: string, client: Client) {
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

        // Fix: Correctly extract microservice name
        const microservice = clientWrapper.config.microservice;
        const request = name;
        let responsestatus = error ? error.code : 0;
        const correlatingId = currentMetadata.get('id')[0];

        const values = [microservice, request, responsestatus, correlatingId];

        // Fix: Use correct SQL client reference
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
  SQLclient: Client;

  constructor(client: any, service: any, userConfig: UserConfig) {
    this.URI = userConfig.database.URI;
    this.config = userConfig;
    this.metadata = {};
    this.SQLclient = new Client({ connectionString: this.URI }); // Fixed Client Initialization

    const names = Object.keys(service.service);
    makeMethods(this, client, this.metadata, names);
  }
}

export default ClientWrapper;

