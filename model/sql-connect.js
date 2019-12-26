const { Pool } = require('pg');

// SQL connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectSQL = (i, URI) => {
  const pool =new Pool({
    connectionString: URI,
  })
  return pool ;
};


module.exports = connectSQL;
