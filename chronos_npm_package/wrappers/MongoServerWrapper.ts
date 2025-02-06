// import mongoose from 'mongoose';
// import grpc from '@grpc/grpc-js';
// import ComModel from '../models/CommunicationModel';

// async function connect(URI) {
//   try {
//     await mongoose.connect(`${URI}`);
//     // Print success message
//     console.log(`Chronos MongoDB is connected at ${URI.slice(0, 20)}...`);
//   } catch ({ message }) {
//     // Print error message
//     console.log('Error connecting to MongoDB:', message);
//   }
// }

// function wrapMethods(server, metadataHolder, methods, userConfig) {
//   connect(userConfig.database.URI);
//   const keys = Object.keys(methods);
//   const wrappedMethods = {};
//   for (let i = 0; i < keys.length; i++) {
//     const name = keys[i];
//     wrappedMethods[name] = function (call, callback) {
//       metadataHolder.metadata = call.metadata;
//       const id = metadataHolder.metadata.get('id')[0];
//       methods[name](call, (error, response) => {
//         // after server's response has been sent
//         const newComms = {
//           microservice: userConfig.microservice,
//           endpoint: ' ',
//           request: name,
//           responsestatus: 0,
//           responsemessage: ' ',
//           correlatingid: id,
//         };
//         const communication = new ComModel(newComms);
//         communication
//           .save()
//           .then(() => {
//             console.log('Request cycle saved');
//           })
//           .catch(err => console.log(`Error saving communications: `, err.message));
//         callback(error, response);
//       });
//     };
//   }
//   return wrappedMethods;
// }

// class ServerWrapper {
//   constructor(server, proto, methods, userConfig) {
//     this.metadataHolder = {};
//     const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig);
//     server.addService(proto, wrappedMethods);
//   }
// }

// export default ServerWrapper;
import mongoose from 'mongoose';
import grpc from '@grpc/grpc-js';
import ComModel from '../models/CommunicationModel';

async function connect(URI: string) {
  try {
    await mongoose.connect(`${URI}`);
    // Print success message
    console.log(`Chronos MongoDB is connected at ${URI.slice(0, 20)}...`);
  } catch (error: any) {
    // Print error message
    console.log('Error connecting to MongoDB:', error.message);
  }
}

function wrapMethods(
  server: any,
  metadataHolder: Record<string, any>,
  methods: Record<string, Function>,
  userConfig: any
) {
  connect(userConfig.database.URI);
  const keys = Object.keys(methods);
  const wrappedMethods: Record<string, Function> = {};

  for (const name of keys) {
    wrappedMethods[name] = function (call: any, callback: Function) {
      metadataHolder.metadata = call.metadata;
      const id = metadataHolder.metadata.get('id')[0];
      methods[name](call, (error: any, response: any) => {
        // After server's response has been sent
        const newComms = {
          microservice: userConfig.microservice,
          endpoint: ' ',
          request: name,
          responsestatus: 0,
          responsemessage: ' ',
          correlatingid: id,
        };
        const communication = new ComModel(newComms);
        communication
          .save()
          .then(() => {
            console.log('Request cycle saved');
          })
          .catch((err: any) => console.log(`Error saving communications: `, err.message));
        callback(error, response);
      });
    };
  }
  return wrappedMethods;
}

class ServerWrapper {
  metadataHolder: Record<string, any>;

  constructor(server: any, proto: any, methods: Record<string, Function>, userConfig: any) {
    this.metadataHolder = {}; // ✅ Now explicitly defined and recognized
    const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig);
    server.addService(proto, wrappedMethods);
  }
}

export default ServerWrapper;
