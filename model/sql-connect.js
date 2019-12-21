const { Pool } = require('pg');
const { services } = require('../user/settings.json');

// SQL connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectSQL = (i) => {
  const URI = services[i][2];
  return new Pool({
    connectionString: URI,
  });
};

module.exports = connectSQL;
