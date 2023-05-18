require('dotenv').config();

module.exports = {
  // General configuration
  microservice: 'ecs-test',
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