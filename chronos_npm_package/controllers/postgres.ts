//  Import the pg package and extract the Client class
import pkg from 'pg';
const { Client } = pkg;

//  Import local modules required for additional functionality
import alertModule from './alert.js'; // Handles notifications (Slack/Email alerts)
import healthHelpers from './healthHelpers.js'; // Collects system health data
import dockerHelper from './dockerHelper.js'; // Collects Docker container metrics
import utilities from './utilities.js'; // Contains helper functions

let client: any; // Stores the PostgreSQL client connection

//  Define a container for all PostgreSQL helper functions
const postgres: any = {};

/**
 *  Connects to PostgreSQL Database
 * - Uses the provided database URI from config
 */
postgres.connect = async ({ database }: { database: { URI: string } }): Promise<void> => {
  try {
    client = new Client({ connectionString: database.URI }); // Initialize PostgreSQL client
    await client.connect(); // Connect to the database
    console.log('✅ PostgreSQL database connected at', database.URI.slice(0, 24), '...');
  } catch (error: any) {
    console.log('❌ Error connecting to PostgreSQL DB:', error.message);
  }
};

/**
 *  Creates Services Table if it doesn't exist
 * - Stores microservice names and their data collection intervals
 */
postgres.services = ({ microservice, interval }: { microservice: string; interval: number }): void => {
  //  Create services table if it does not exist
  client.query(
    `CREATE TABLE IF NOT EXISTS services (
      _id SERIAL PRIMARY KEY NOT NULL,
      microservice VARCHAR(248) NOT NULL UNIQUE,
      interval INTEGER NOT NULL)`,
    (err: any) => {
      if (err) throw err;
    }
  );

  //  Create table for metrics if it doesn't exist
  client.query(
    `CREATE TABLE IF NOT EXISTS metrics (
      _id SERIAL PRIMARY KEY NOT NULL,
      metric TEXT NOT NULL UNIQUE,
      selected BOOLEAN,
      mode TEXT NOT NULL)`,
    (err: any) => {
      if (err) throw err;
    }
  );

  //  Insert microservice into services table
  const queryString = `
    INSERT INTO services (microservice, interval)
    VALUES ($1, $2)
    ON CONFLICT (microservice) DO NOTHING;`;
  const values = [microservice, interval];

  client.query(queryString, values, (err: any) => {
    if (err) throw err;
    console.log(`✅ Microservice "${microservice}" recorded in services table`);
  });
};

/**
 *  Creates Communications Table and Tracks Requests
 * - Logs request/response details for monitoring
 * - Sends notifications via Slack or Email if the response status is an error
 */
postgres.communications = ({ microservice, slack, email }: { microservice: string; slack?: any; email?: any }) => {
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
    (err: any) => {
      if (err) throw err;
    }
  );

  return (req: any, res: any, next: any) => {
    const correlatingId = res.getHeaders()['x-correlation-id'];
    const endpoint = req.originalUrl;
    const request = req.method;

    const queryString = `
      INSERT INTO communications (microservice, endpoint, request, responsestatus, responsemessage, correlatingId)
      VALUES ($1, $2, $3, $4, $5, $6);`;

    res.on('finish', () => {
      if (res.statusCode >= 400) {
        if (slack) alertModule.sendSlack(res.statusCode, res.statusMessage, slack);
        if (email) alertModule.sendEmail(res.statusCode, res.statusMessage, email);
      }

      const responsestatus = res.statusCode;
      const responsemessage = res.statusMessage;
      const values = [microservice, endpoint, request, responsestatus, responsemessage, correlatingId];

      client.query(queryString, values, (err: any) => {
        if (err) throw err;
        console.log('✅ Request cycle logged in communications table');
      });
    });
    next();
  };
};

/**
 * Constructs a parameterized query string for inserting multiple data points.
 * @param numRows Number of rows to insert
 * @param serviceName Table name to insert into
 * @returns The constructed query string
 */
function createQueryString(numRows: number, serviceName: string): string {
  let query = `
    INSERT INTO ${serviceName} (metric, value, category, time) VALUES `;

  for (let i = 0; i < numRows; i++) {
    const newRow = `($${4 * i + 1}, $${4 * i + 2}, $${4 * i + 3}, TO_TIMESTAMP($${4 * i + 4}))`;
    query = query.concat(newRow);
    if (i !== numRows - 1) query = query.concat(',');
  }
  query = query.concat(';');
  return query;
}

/**
 *  Constructs an array of values to be used with the parameterized query.
 * @param dataPointsArray Array of data point objects
 * @returns Array of values
 */
function createQueryArray(dataPointsArray: any[]): (string | number)[] {
  return dataPointsArray.flatMap(el => [
    el.metric,
    el.value,
    el.category,
    el.time / 1000, // Convert milliseconds to seconds for PostgreSQL
  ]);
}

/**
 *  Reads and stores microservice health information in PostgreSQL at set intervals.
 */
postgres.health = async ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string }) => {
  let length = 0;
  const currentMetricNames: { [key: string]: boolean } = {};
  length = await postgres.getSavedMetricsLength(mode, currentMetricNames);

  client.query(
    `CREATE TABLE IF NOT EXISTS ${microservice} (
      _id SERIAL PRIMARY KEY,
      metric VARCHAR(200),
      value FLOAT DEFAULT 0.0,
      category VARCHAR(200) DEFAULT 'event',
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    (err: any) => {
      if (err) console.log('❌ Error creating health table:', err);
    }
  );

  setInterval(() => {
    healthHelpers.collectHealthData()
      .then(async (data: any[]) => {
        if (length !== data.length) {
          length = await postgres.addMetrics(data, mode, currentMetricNames);
        }
        const documents = data.filter(el => el.metric in currentMetricNames);
        const numRows = documents.length;
        const queryString = createQueryString(numRows, microservice);
        const queryArray = createQueryArray(documents);
        return client.query(queryString, queryArray);
      })
      .then(() => console.log('✅ Health data recorded in PostgreSQL'))
      .catch((err: any) => console.log('❌ Error inserting health data:', err));
  }, interval);
};

export default postgres;
