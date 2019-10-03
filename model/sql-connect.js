const { Pool } = require('pg');
const { services } = require('../user/settings.json');

const connectSQL = (i) => {
  const URI = services[i][2];
  return new Pool({
    connectionString: URI,
  });
};

module.exports = connectSQL;
