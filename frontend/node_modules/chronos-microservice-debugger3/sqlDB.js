const { Pool } = require('pg')
const uri =
  "postgres://bbehwewl:tKJ8dnBPESQUABiEpdNnFF54SCsaQrZh@salt.db.elephantsql.com:5432/bbehwewl";

const pool = new Pool({
  connectionString: uri
});

pool.connect((err, client, release) => {
  if (err) {
    console.log('Issue connecting to db')
  } else {
    console.log('Connected to Chronos DB')
  }
});  

module.exports = pool;