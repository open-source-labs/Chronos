"use strict";
// import mongoose from 'mongoose';
// import grpc from '@grpc/grpc-js';
// import ComModel from '../models/CommunicationModel';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const mongoose_1 = __importDefault(require("mongoose"));
const CommunicationModel_1 = __importDefault(require("../models/CommunicationModel"));
async function connect(URI) {
    try {
        await mongoose_1.default.connect(`${URI}`);
        // Print success message
        console.log(`Chronos MongoDB is connected at ${URI.slice(0, 20)}...`);
    }
    catch (error) {
        // Print error message
        console.log('Error connecting to MongoDB:', error.message);
    }
}
function wrapMethods(server, metadataHolder, methods, userConfig) {
    connect(userConfig.database.URI);
    const keys = Object.keys(methods);
    const wrappedMethods = {};
    for (const name of keys) {
        wrappedMethods[name] = function (call, callback) {
            metadataHolder.metadata = call.metadata;
            const id = metadataHolder.metadata.get('id')[0];
            methods[name](call, (error, response) => {
                // After server's response has been sent
                const newComms = {
                    microservice: userConfig.microservice,
                    endpoint: ' ',
                    request: name,
                    responsestatus: 0,
                    responsemessage: ' ',
                    correlatingid: id,
                };
                const communication = new CommunicationModel_1.default(newComms);
                communication
                    .save()
                    .then(() => {
                    console.log('Request cycle saved');
                })
                    .catch((err) => console.log(`Error saving communications: `, err.message));
                callback(error, response);
            });
        };
    }
    return wrappedMethods;
}
class ServerWrapper {
    constructor(server, proto, methods, userConfig) {
        this.metadataHolder = {}; // ✅ Now explicitly defined and recognized
        const wrappedMethods = wrapMethods(server, this.metadataHolder, methods, userConfig);
        server.addService(proto, wrappedMethods);
    }
}
exports.default = ServerWrapper;
//# sourceMappingURL=MongoServerWrapper.js.map