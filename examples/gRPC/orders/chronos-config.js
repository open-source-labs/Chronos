require('dotenv').config();

module.exports = {
  microservice: 'orders',
  interval: 2000,
  // dockerized: true,ß
  mode: 'microservices',
  database: {
    connection: 'gRPC',
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
};
