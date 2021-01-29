require('dotenv').config();
const chronos = require('chronos');

chronos.use({
  microservice: 'orders',
  interval: 2000,
  // dockerized: true,ß
  database: {
    connection: 'gRPC',
    type: 'PostgreSQL',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
});