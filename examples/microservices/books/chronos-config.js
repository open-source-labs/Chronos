require('dotenv').config();
const chronos = require('chronos-tracker-7');

chronos.use({
  microservice: 'books',
  interval: 2000,
  // dockerized: true,
  // jmxuri: *Add your URI here*
  database: {
    connection: 'REST',
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
});
