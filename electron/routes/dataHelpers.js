// import KafkaModel from '../models/KafkaModel';
// import HealthModelFunc from '../models/HealthModel';

const fetchData = {};

// fetchData.mongoFetch = function(serviceName){

// };

fetchData.postgresFetch = async function (serviceName, pool) {
  const query = `
    WITH
      temp
    AS (
        SELECT
          metric, value, category, time,
          row_number() OVER(PARTITION BY metric ORDER BY time) AS rowNumber
        FROM
          ${serviceName}
      )
    SELECT
      metric, value, category, time
    FROM
      temp
    WHERE
      rowNumber <= 50
  ;`;

  let result = await pool.query(query);
  result = result.rows;
  result = [{ [serviceName]: result }];
  return result;
};

module.exports = fetchData;
