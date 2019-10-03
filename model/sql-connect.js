const { Pool } = require('pg');
const { services } = require('../user/settings.json');

const connectSQL = (i) => {
  const URI = services[i][2];
  const pool = new Pool({
    connectionString: URI,
  });

  return pool;
};

module.exports = connectSQL;
