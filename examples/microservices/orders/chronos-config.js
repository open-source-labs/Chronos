const chronos = require('chronos-tracker');
require('dotenv').config();
chronos.use({
  microservice: 'orders',
  interval: 2000,
  // dockerized: true,ß
  database: {
    type: 'MongoDB',
    URI: process.env.CHRONOS_URI,
  },
  notifications: [],
});