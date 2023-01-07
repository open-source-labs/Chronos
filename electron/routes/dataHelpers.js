import KafkaModel from '../models/KafkaModel';
import HealthModelFunc from '../models/HealthModel';

const fetchData = {};

const aggregator = [
  {
    $setWindowFields: {
      partitionBy: '$metric',
      sortBy: {
        time: -1,
      },
      output: {
        rowNumber: {
          $documentNumber: {},
        },
      },
    },
  },
  {
    $match: {
      rowNumber: { $lte: 50 },
    },
  },
];

// TCreate a model based on the serviceName
// Create an aggregator based on the aggregator variable
// return the result
fetchData.mongoFetch = async function (serviceName) {
  try {
    const testModel = HealthModelFunc(serviceName);
    let result = await testModel.aggregate(aggregator);
    result = [{ [serviceName]: result }];
    return result;
  } catch (error) {
    console.log('Aggregation error in mongoFetch(): ', error);
  }
};

fetchData.postgresFetch = async function (serviceName, pool) {
  const query = `
    WITH
      temp
    AS (
        SELECT
          metric, value, category, time,
          row_number() OVER(PARTITION BY metric ORDER BY time DESC) AS rowNumber
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
  // console.log('result.rows in dataHelpers postgresFetch:', JSON.stringify(result.rows));
  result = result.rows;
  result = [{ [serviceName]: result }];
  // console.log('result with servicename in dataHelpers postgresFetch:', JSON.stringify(result));
  return result;
};

export { fetchData };
