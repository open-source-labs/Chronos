const { Pool } = require('pg');
const { services } = require('../user/settings.json');

// SQL connection wrapped in function that takes the index of the selected database as the parameter. This index is used to target the correct database for querying.
const connectSQL = (i) => {
  //there are no links - the following is being used for SQL "services": [["hard", "coded", "solution"]], useContext should be used here
  const URI = services[i][2];
  const pool =new Pool({
    connectionString: URI,
  })
  //verifying that the connection has been made by stating the time it was connected 
  // This code could be causing too many request to the database 
  // pool.query('SELECT NOW()', (err, res) => {
  //   if(err) return message.sender.send('detailsResponse', JSON.stringify('Did not connect to database',err));
  //   console.log('Database '+services[i][0]+' has been connected at '+res.rows[0].now)
  // })
  return pool ;
};


module.exports = connectSQL;
