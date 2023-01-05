const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './.env')});

module.exports = {
  // General configuration
  microservice: 'customers',
  interval: 5000,

  // Mode Specific
  mode: 'microservices',
  dockerized: true,

  database: {
    connection: 'REST',
    type: process.env.CHRONOS_DB,
    URI: process.env.CHRONOS_URI,
  },

  notifications: [],
}