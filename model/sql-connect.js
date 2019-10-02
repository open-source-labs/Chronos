const { Pool } = require('pg');
const { services, setupRequired } = require('../user/settings.json');

const databaseType = services[0][1];

if (setupRequired) module.exports = null;

if (databaseType === 'SQL') {
  const URI = services[0][2];
  const pool = new Pool({
    connectionString: URI,
  });
  console.log('Connected to SQL database!');
  module.exports = pool;
}
