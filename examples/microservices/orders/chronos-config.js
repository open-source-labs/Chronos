require('dotenv').config();
const chronos = require('chronos7test');

chronos.use({
  microservice: 'orders',
  interval: 2000,
  // dockerized: true,ß
  database: {
    connection: 'REST',
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
});
