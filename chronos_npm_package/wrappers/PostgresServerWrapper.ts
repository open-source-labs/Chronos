// import { Client } from 'pg';
// import grpc from '@grpc/grpc-js';

// let SQLclient;

// async function connect(URI) {
//   try {
//     SQLclient = new Client(URI);
//     await SQLclient.connect();
//     // Print success message
//     console.log(`Connected to database at ${URI.slice(0, 24)}...`);
//     SQLclient.query(
//       `CREATE TABLE IF NOT EXISTS communications(
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

// function wrapMethods(server, metadataHolder, methods, userConfig, SQL) {
//   connect(userConfig.database.URI);
//   const keys = Object.keys(methods);
//   const wrappedMethods = {};
//   for (let i = 0; i < keys.length; i++) {
//     const name = keys[i];
//     wrappedMethods[name] = (call, callback) => {
//       metadataHolder.metadata = call.metadata;
//       methods[name](call, (error, response) => {
//         const queryString = `
//           INSERT INTO grpc_communications (microservice, request, correlatingId)
//           VALUES ($1, $2, $3);`;
//         const microservice  = userConfig.microservice;
//         const request = name;
//         const correlatingId = metadataHolder.metadata.get('id')[0];
//         const values = [microservice, request, correlatingId];
//         SQL.query(queryString, values, (err, result) => {
//           if (err) {
//             throw err;
//           }
//           console.log('Request cycle saved');
//         });
//         // after server's response has been sent
//         callback(error, response);
//       });
//     };
//   }
//   return wrappedMethods;
// }

// class ServerWrapper {
//     metadataHolder:Record<string,any>;
//   constructor(server:any, proto, methods, userConfig) {
//     this.metadataHolder = {};
//     const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig, SQLclient);
//     server.addService(proto, wrappedMethods);
//   }
// }

// export default ServerWrapper;
// import { Client } from 'pg';
// import grpc from '@grpc/grpc-js';
// import pkg from 'pg';
// const { Client } = pkg;
// async function connect(URI: string): Promise<Client> {
//   try {
//     const SQLclient = new Client({ connectionString: URI });
//     await SQLclient.connect();
    
//     console.log(`Connected to database at ${URI.slice(0, 24)}...`);
    
//     await SQLclient.query(`
//       CREATE TABLE IF NOT EXISTS communications(
//         _id serial PRIMARY KEY,
//         microservice VARCHAR(248) NOT NULL,
//         request VARCHAR(32) NOT NULL,
//         responsestatus INTEGER,
//         time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         correlatingId VARCHAR(500)
//       )
//     `);

//     return SQLclient;
//   } catch (error: any) {
//     console.error('Error connecting to PostgreSQL DB:', error.message);
//     throw error;
//   }
// }

// function wrapMethods(
//   server: any,
//   metadataHolder: Record<string, any>,
//   methods: Record<string, Function>,
//   userConfig: any,
//   SQLclient: Client
// ) {
//   const keys = Object.keys(methods);
//   const wrappedMethods: Record<string, Function> = {};

//   for (const name of keys) {
//     wrappedMethods[name] = (call: any, callback: Function) => {
//       metadataHolder.metadata = call.metadata;
      
//       methods[name](call, async (error: any, response: any) => {
//         try {
//           const queryString = `
//             INSERT INTO grpc_communications (microservice, request, correlatingId)
//             VALUES ($1, $2, $3)`;

//           const microservice = userConfig.microservice;
//           const request = name;
//           const correlatingId = metadataHolder.metadata.get('id')?.[0] || 'unknown_id';
          
//           const values = [microservice, request, correlatingId];

//           await SQLclient.query(queryString, values);
//           console.log('Request cycle saved');
//         } catch (err: any) {
//           console.error('Error saving request cycle:', err.message);
//         }

//         callback(error, response);
//       });
//     };
//   }
//   return wrappedMethods;
// }

// class ServerWrapper {
//   metadataHolder: Record<string, any>;
//   SQLclient: Client;

//   constructor(server: any, proto: any, methods: Record<string, Function>, userConfig: any) {
//     this.metadataHolder = {};
    
//     connect(userConfig.database.URI)
//       .then((SQLclient) => {
//         this.SQLclient = SQLclient;
//         const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig, this.SQLclient);
//         server.addService(proto, wrappedMethods);
//       })
//       .catch((error) => {
//         console.error('Failed to initialize SQL client:', error.message);
//       });
//   }
// }

// export default ServerWrapper;
// wrappers/PostgresServerWrapper.ts

import grpc from '@grpc/grpc-js';
import pkg from 'pg';
const { Client } = pkg;
import type { Client as PgClient } from 'pg';

async function connect(URI: string): Promise<PgClient> {
  try {
    const SQLclient = new Client({ connectionString: URI });
    await SQLclient.connect();
    
    console.log(`Connected to database at ${URI.slice(0, 24)}...`);
    
    await SQLclient.query(`
      CREATE TABLE IF NOT EXISTS communications(
        _id serial PRIMARY KEY,
        microservice VARCHAR(248) NOT NULL,
        request VARCHAR(32) NOT NULL,
        responsestatus INTEGER,
        time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        correlatingId VARCHAR(500)
      )
    `);

    return SQLclient;
  } catch (error: any) {
    console.error('Error connecting to PostgreSQL DB:', error.message);
    throw error;
  }
}

function wrapMethods(
  server: any,
  metadataHolder: Record<string, any>,
  methods: Record<string, Function>,
  userConfig: any,
  SQLclient: PgClient
) {
  const keys = Object.keys(methods);
  const wrappedMethods: Record<string, Function> = {};

  for (const name of keys) {
    wrappedMethods[name] = (call: any, callback: Function) => {
      metadataHolder.metadata = call.metadata;
      
      methods[name](call, async (error: any, response: any) => {
        try {
          const queryString = `
            INSERT INTO grpc_communications (microservice, request, correlatingId)
            VALUES ($1, $2, $3)`;

          const microservice = userConfig.microservice;
          const request = name;
          const correlatingId = metadataHolder.metadata.get('id')?.[0] || 'unknown_id';
          
          const values = [microservice, request, correlatingId];

          await SQLclient.query(queryString, values);
          console.log('Request cycle saved');
        } catch (err: any) {
          console.error('Error saving request cycle:', err.message);
        }

        callback(error, response);
      });
    };
  }
  return wrappedMethods;
}

class ServerWrapper {
  metadataHolder: Record<string, any>;
  SQLclient: PgClient;

  constructor(server: any, proto: any, methods: Record<string, Function>, userConfig: any) {
    this.metadataHolder = {};
    
    connect(userConfig.database.URI)
      .then((SQLclient) => {
        this.SQLclient = SQLclient;
        const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig, this.SQLclient);
        server.addService(proto, wrappedMethods);
      })
      .catch((error) => {
        console.error('Failed to initialize SQL client:', error.message);
      });
  }
}

export default ServerWrapper;
