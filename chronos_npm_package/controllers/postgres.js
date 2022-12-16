// NPM package that gathers health information
const { Client } = require('pg');
const alert = require('./alert');
const { collectHealthData } = require('./healthHelpers');
const dockerHelper = require('./dockerHelper')
const utilities = require('./utilities');

let client;

const postgres = {};

/**
 * Initializes connection to PostgreSQL database using provided URI
 * @param {Object} database Contains DB type and DB URI
 */
postgres.connect = async ({ database }) => {
  try {
    // Connect to user's database
    client = new Client({ connectionString: database.URI });
    await client.connect();

    // Print success message
    console.log('PostgreSQL database connected at ', database.URI.slice(0, 24), '...');
  } catch ({ message }) {
    // Print error message
    console.log('Error connecting to PostgreSQL DB:', message);
  }
};

/**
 * Create services table with each entry representing a microservice
 * @param {string} microservice Microservice name
 * @param {number} interval Interval to collect data
 */
postgres.services = ({ microservice, interval }) => {
  // Create services table if does not exist
  client.query(
    `CREATE TABLE IF NOT EXISTS services (
      _id SERIAL PRIMARY KEY NOT NULL,
      microservice VARCHAR(248) NOT NULL UNIQUE,
      interval INTEGER NOT NULL
      )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    }
  );

  // Insert microservice name and interval into services table
  const queryString = `
    INSERT INTO services (microservice, interval)
    VALUES ($1, $2)
    ON CONFLICT (microservice) DO NOTHING;`;

  const values = [microservice, interval];

  client.query(queryString, values, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`Microservice "${microservice}" recorded in services table`);
  });
};

/**
 * Creates a communications table if one does not yet exist and
 * traces the request throughout its life cycle. Will send a notification
 * to the user if contact information is provided
 * @param {string} microservice Microservice name
 * @param {Object|undefined} slack Slack settings
 * @param {Object|undefined} email Email settings
 */
postgres.communications = ({ microservice, slack, email }) => {
  // Create communications table if one does not exist
  client.query(
    `CREATE TABLE IF NOT EXISTS communications(
    _id serial PRIMARY KEY,
    microservice VARCHAR(248) NOT NULL,
    endpoint varchar(248) NOT NULL,
    request varchar(16) NOT NULL,
    responsestatus INTEGER NOT NULL,
    responsemessage varchar(500) NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    correlatingId varchar(500)
  )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    }
  );
  return (req, res, next) => {
    // ID persists throughout request lifecycle
    const correlatingId = res.getHeaders()['x-correlation-id'];

    // Target endpoint
    const endpoint = req.originalUrl;

    // HTTP Request Method
    const request = req.method;

    const queryString = `
      INSERT INTO communications (microservice, endpoint, request, responsestatus, responsemessage, correlatingId)
      VALUES ($1, $2, $3, $4, $5, $6);`;

    // Waits for response to finish before pushing information into database
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
        if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
      }
      // Grabs status code from response object
      const responsestatus = res.statusCode;
      // Grabs status message from response object
      const responsemessage = res.statusMessage;
      const values = [
        microservice,
        endpoint,
        request,
        responsestatus,
        responsemessage,
        correlatingId,
      ];
      client.query(queryString, values, (err, result) => {
        if (err) {
          throw err;
        }
        console.log('Request cycle saved');
      });
    });
    next();
  };
};

// Constructs a parameterized query string for inserting multiple data points into
// the kafkametrics db based on the number of data points;
function createQueryString(numRows, serviceName) {
  let query = `
    INSERT INTO
      ${serviceName} (metric, value, category, time)
    VALUES
  `;
  for (let i = 0; i < numRows; i++) {
    const newRow = `($${4 * i + 1}, $${4 * i + 2}, $${4 * i + 3}, TO_TIMESTAMP($${4 * i + 4}))`;
    query = query.concat(newRow);
    if (i !== numRows - 1) query = query.concat(',');
  }
  query = query.concat(';');
  return query;
}

// Places the values being inserted into postgres into an array that will eventually
// hydrate the parameterized query
function createQueryArray(dataPointsArray) {
  const queryArray = [];
  for (const element of dataPointsArray) {
    queryArray.push(element.metric);
    queryArray.push(element.value);
    queryArray.push(element.category);
    queryArray.push(element.time / 1000); // Converts milliseconds to seconds to work with postgres
  }
  return queryArray;
}

/**
 * Read and store microservice health information in postgres database at every interval
 * @param {string} microservice Microservice name
 * @param {number} interval Interval for continuous data collection
 */
postgres.health = ({ microservice, interval }) => {
  // Create table for the microservice if it doesn't exist yet
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${microservice} (
      _id SERIAL PRIMARY KEY,
      metric VARCHAR(200),
      value FLOAT DEFAULT 0.0,
      category VARCHAR(200) DEFAULT 'event',
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  client
    .query(createTableQuery)
    .catch(err => console.log('Error creating health table in PostgreSQL:\n', err));

  // Save data point at every interval (ms)
  setInterval(() => {
    collectHealthData()
      .then(data => {
        const numRows = data.length;
        const queryString = createQueryString(numRows, microservice);
        const queryArray = createQueryArray(data);
        // console.log('POSTGRES QUERY STRING: ', queryString);
        // console.log('POSTGRES QUERY ARRAY', queryArray);
        return client.query(queryString, queryArray);
      })
      .then(() => console.log('Health data recorded in PostgreSQL'))
      .catch(err => console.log('Error inserting health data into PostgreSQL:\n', err));
  }, interval);
};

/**
 * Runs instead of health
 * If dockerized is true, this function is invoked
 * Collects information on the container
 */
postgres.docker = function ({ microservice, interval }) {
  // Create a table if it doesn't already exist.
  client.query(
    `CREATE TABLE IF NOT EXISTS containerInfo( 
      _id serial PRIMARY KEY,
      microservice varchar(500) NOT NULL,
      containerName varchar(500) NOT NULL,
      containerId varchar(500) NOT NULL,
      containerPlatform varchar(500),
      containerStartTime varchar(500),
      containerMemUsage real DEFAULT 0,
      containerMemLimit real DEFAULT 0,
      containerMemPercent real DEFAULT 0,
      containerCpuPercent real DEFAULT 0,
      networkReceived real DEFAULT 0,
      networkSent real DEFAULT 0,
      containerProcessCount integer DEFAULT 0, 
      containerRestartCount integer DEFAULT 0
      )`,
    function (err, results) {
      if (err) throw err;
    }
  );

  dockerHelper.getDockerContainer(microservice)
  .then((containerData) => {
    setInterval(() => {
      dockerHelper.readDockerContainer(containerData)
        .then((data) => {
          let queryString =
            `INSERT INTO containerInfo(
            microservice,
            containerName,
            containerId,
            containerPlatform,
            containerStartTime,
            containerMemUsage,
            containerMemLimit,
            containerMemPercent,
            containerCpuPercent,
            networkReceived,
            networkSent,
            containerProcessCount,
            containerRestartCount)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
            )`;

          let values = [
            microservice,
            data.containername,
            data.containerid,
            data.platform,
            data.starttime,
            data.memoryusage,
            data.memorylimit,
            data.memorypercent,
            data.cpupercent,
            data.networkreceived,
            data.networksent,
            data.processcount,
            data.restartcount,
          ];

          client.query(queryString, values, function (err, results) {
            if (err) throw err;
            console.log(`Docker data recorded in SQL table containerInfo`);
          });
      })
    }, interval)
  })

  .catch((error) => {
    if (error.constructor.name === 'Error') throw error
    else throw new Error(error);
  })
}


postgres.serverQuery = (config) => {
  postgres.saveService(config);
  postgres.setQueryOnInterval(config);
}


postgres.saveService = (config) => {
  let service;
  if (config.mode === 'kakfa') service = 'kafkametrics';
  else if (config.mode === 'kubernetes') service = 'kubernetesmetrics';
  else throw new Error('Unrecognized mode');

  postgres.services({ microservice: service, interval: config.interval });

  // create kafkametrics table if it does not exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${service} (
      _id SERIAL PRIMARY KEY,
      metric VARCHAR(200),
      value FLOAT DEFAULT 0.0,
      category VARCHAR(200) DEFAULT 'event',
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  client.query(createTableQuery)
    .catch(err => console.log(`Error creating ${service} table in PostgreSQL:\n`, err));
}


postgres.setQueryOnInterval = (config) => {
  let service;
  if (config.mode === 'kakfa') service = 'kafkametrics';
  else if (config.mode === 'kubernetes') service = 'kubernetesmetrics';
  else throw new Error('Unrecognized mode');

  setInterval(() => {
    utilities.getMetricsQuery(config)
      .then(parsedArray => {
        const numDataPoints = parsedArray.length;
        const queryString = createQueryString(numDataPoints, service);
        const queryArray = createQueryArray(parsedArray);
        return client.query(queryString, queryArray);
      })
      .then(() => console.log('Kafka metrics recorded in PostgreSQL'))
      .catch(err => console.log('Error inserting kafka metrics into PostgreSQL:\n', err));
  }, config.interval);
}

module.exports = postgres;
