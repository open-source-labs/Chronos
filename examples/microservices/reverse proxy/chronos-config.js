const chronos = require('chronos-tracker-7');
require('dotenv').config();

chronos.use({
  microservice: 'reverse-proxy',
  interval: 2000,
  // dockerized: true,
  database: {
    connection: 'REST',
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
});
