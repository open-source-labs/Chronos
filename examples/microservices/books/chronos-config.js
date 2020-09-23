const chronos = require('chronos-tracker');

chronos.use({
  microservice: 'books',
  interval: 2000,
  // dockerized: true,
  database: {
    type: 'MongoDB',
    URI: " < INSERT URI HERE > "
  },
  notifications: [],
});