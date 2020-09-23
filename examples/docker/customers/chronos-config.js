const chronos = require('chronos-tracker');

chronos.use({
  microservice: 'customers',
  interval: 2000,
  dockerized: true,
  database: {
    type: 'MongoDB',
    URI:
      ' < INSERT MONGODB LINK HERE > ',
  },
  notifications: [],
});
