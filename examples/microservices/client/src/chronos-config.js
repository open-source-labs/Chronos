// // const path = require('path');
// import path from 'path';
// // require('dotenv').config({
// //   path: path.resolve(__dirname, '../../.env'),
// // });
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// // Recreate __dirname for ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({
//   path: path.resolve(__dirname, '../../.env'),
// });
// const chronosConfig = {
//   // General configuration
//   microservice: 'client',
//   interval: 5000,

//   // Mode Specific
//   mode: 'microservices',
//   dockerized: false,

//   database: {
//     connection: 'REST',
//     type: process.env.CHRONOS_DB,
//     URI: process.env.CHRONOS_URI,
//   },

//   notifications: [],
// };
// module.exports = chronosConfig;
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const chronosConfig = {
  // General configuration
  microservice: 'client',
  interval: 5000,

  // Mode Specific
  mode: 'microservices',
  dockerized: false,

  database: {
    connection: 'REST',
    type: process.env.CHRONOS_DB,
    URI: process.env.CHRONOS_URI,
  },

  notifications: [],
};

// Use ES module export syntax
export default chronosConfig;
