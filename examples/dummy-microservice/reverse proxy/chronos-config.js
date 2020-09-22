const chronos = require('chronos-tracker');

chronos.use({
  microservice: 'reverse-proxy',
  interval: 2000,
  // dockerized: true,
  database: {
    type: 'MongoDB',
    URI: " < INSERT URI HERE > "
  },
  notifications: [],
});