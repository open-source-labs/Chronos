const chronos = require('chronos-tracker');
require('dotenv').config();
chronos.use({
  microservice: 'books',
  interval: 2000,
  // dockerized: true,
  database: {
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
});