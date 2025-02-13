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
// function makeMethods(clientWrapper, client, metadata, names) {
//   connect(clientWrapper.URI);
//   for (let i = 0; i < names.length; i++) {
//     const name = names[i];
//     clientWrapper[name] = (message, callback, meta = null) => {
//       let currentMetadata;
//       if (meta) {
//         currentMetadata = meta;
//       } else {
//         currentMetadata = clientWrapper.metadata.metadata;
//       }
//       const id = currentMetadata.get('id')[0];
//       const newComm = {
//         microservice: clientWrapper.config.microservice,
//         endpoint: ' ',
//         request: name,
//         responsestatus: 0,
//         responsemessage: ' ',
//         correlatingid: id,
//       };
//       client[name](message, currentMetadata, (error, response) => {
//         if (error) {
//           newComm.responsestatus = error.code;
//         }
//         const responseCom = new ComModel(newComm);
//         responseCom
//           .save()
//           .then(() => {
//             console.log('Request cycle saved');
//           })
//           .catch(err => console.log(`Error saving communications: `, err.message));
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
//     const names = Object.keys(service.service);
//     makeMethods(this, client, this.metadata, names);
//   }
// }
// export default ClientWrapper;
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
function makeMethods(clientWrapper, client, metadata, names) {
    connect(clientWrapper.URI);
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        clientWrapper[name] = (message, callback, meta = null) => {
            let currentMetadata;
            if (meta) {
                currentMetadata = meta;
            }
            else {
                currentMetadata = clientWrapper.metadata.metadata;
            }
            const id = currentMetadata.get('id')[0];
            const newComm = {
                microservice: clientWrapper.config.microservice,
                endpoint: ' ',
                request: name,
                responsestatus: 0,
                responsemessage: ' ',
                correlatingid: id,
            };
            client[name](message, currentMetadata, (error, response) => {
                if (error) {
                    newComm.responsestatus = error.code;
                }
                const responseCom = new CommunicationModel_1.default(newComm);
                responseCom
                    .save()
                    .then(() => {
                    console.log('Request cycle saved');
                })
                    .catch((err) => console.log(`Error saving communications: `, err.message));
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
        makeMethods(this, client, this.metadata, names);
    }
}
exports.default = ClientWrapper;
//# sourceMappingURL=MongoClientWrapper.js.map