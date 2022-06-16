require('dotenv').config();
// const chronos = require('chronos-tracker');
const chronos = require('chronos7test');

chronos.use({
  microservice: 'books',
  interval: 2000,
  jmxuri: 'http://localhost:12345/metrics',
  // dockerized: true,
  database: {
    connection: 'REST',
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
});
