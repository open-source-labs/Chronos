require('dotenv').config();

module.exports = {
  // General configuration
  microservice: 'kubernetesmetrics',
  interval: 10000,

  // Mode Specific
  mode: 'kubernetes',
  promService: 'prometheus-service',
  promPort: 8080,

  // Mode Specific
  // mode: 'kafka',
  // jmxuri: '<insert url here>',

  // Mode Specific
  // mode: 'microservices',
  // dockerized: true,

  database: {
    connection: 'REST',
    type: process.env.CHRONOS_DB,
    URI: process.env.CHRONOS_URI,
  },

  notifications: [],
}