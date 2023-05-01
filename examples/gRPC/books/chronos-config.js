require('dotenv').config();

module.exports = {
  microservice: 'books',
  interval: 2000,
  mode: 'microservices',
  // dockerized: true,ß
  database: {
    connection: 'gRPC',
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
};

