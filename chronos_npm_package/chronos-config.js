// A sample `chronos-config.js` file

const chronos = require('./chronos.js');

chronos.use({
  microservice: 'PostGresTest',
  interval: 1000,
  dockerized: false,
  jmxuri: 'http://localhost:12345/metrics',
  database: {
    connection: 'REST',
    type: 'PostgreSQL',
    URI:
      'postgres://dxdebork:h40HJd666t7AsRvs30zxYEWe3L7Ixr7N@heffalump.db.elephantsql.com/dxdebork',
    // type: 'MongoDB',
    // URI: 'mongodb+srv://james:james@cluster0.kb3y4.mongodb.net/test?retryWrites=true&w=majority',
  },
  notifications: [],
});
