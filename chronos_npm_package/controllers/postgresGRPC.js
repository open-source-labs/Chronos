// NPM package that gathers health information
const si = require('systeminformation');
const { Client } = require('pg');
const alert = require('./alert');
// const mwSqlDocker = require('./mwSqlDocker.js');

let client;

const chronos = {};

/**
 * Initializes connection to PostgreSQL database using provided URI
 * @param {Object} database Contains DB type and DB URI
 */
chronos.connect = async ({ database }) => {
  try {
    // Connect to user's database
    client = new Client({ connectionString: database.URI });
    await client.connect();

    // Print success message
    console.log('Connected to database at ', database.URI.slice(0, 24), '...');
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
chronos.services = ({ microservice, interval }) => {
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
 * Read and store microservice health information in postgres database at every interval
 * @param {string} microservice Microservice name
 * @param {number} interval Interval for continuous data collection
 */
chronos.health = ({ microservice, interval }) => {
  // Create table for the microservice if it doesn't exist yet
  client.query(
    `CREATE TABLE IF NOT EXISTS ${microservice} (
      _id SERIAL PRIMARY KEY NOT NULL,
      cpuspeed FLOAT DEFAULT 0.0,
      cputemp FLOAT DEFAULT 0.0,
      activememory REAL DEFAULT 0,
      freememory REAL DEFAULT 0,
      totalmemory REAL DEFAULT 0,
      usedmemory REAL DEFAULT 0,
      latency FLOAT DEFAULT 0,
      blockedprocesses REAL DEFAULT 0,
      sleepingprocesses REAL DEFAULT 0,
      runningprocesses REAL DEFAULT 0,
      totalprocesses REAL DEFAULT 0,
      cpuloadpercent FLOAT DEFAULT 0.00,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    }
  );

  // Initialize variables for database storage
  let cpuspeed,
    cputemp,
    cpuloadpercent,
    totalMemory,
    freeMemory,
    usedMemory,
    activeMemory,
    latency,
    totalprocesses,
    blockedprocesses,
    runningprocesses,
    sleepingprocesses;

  // Save data point at every interval (ms)
  setInterval(() => {
    // Save cpu speed
    si.cpuCurrentspeed()
      .then(data => {
        cpuspeed = data.avg;
      })
      .catch(err => {
        throw err;
      });

    // Save cpu temp
    si.cpuTemperature()
      .then(data => {
        cputemp = data.main;
      })
      .catch(err => {
        throw err;
      });

    // Save cpu load percent
    si.currentLoad()
      .then(data => {
        cpuloadpercent = data.currentload;
      })
      .catch(err => {
        throw err;
      });

    // Save memory data
    si.mem()
      .then(data => {
        totalMemory = data.total;
        freeMemory = data.free;
        usedMemory = data.used;
        activeMemory = data.active;
      })
      .catch(err => {
        throw err;
      });

    // Save process data
    si.processes()
      .then(data => {
        totalprocesses = data.all;
        blockedprocesses = data.blocked;
        runningprocesses = data.running;
        sleepingprocesses = data.sleeping;
      })
      .catch(err => {
        throw err;
      });

    // Save latency
    si.inetLatency()
      .then(data => {
        latency = data;
      })
      .catch(err => {
        throw err;
      });

    const queryString = `INSERT INTO ${microservice}(
      cpuspeed,
      cputemp,
      cpuloadpercent,
      totalMemory,
      freeMemory,
      usedMemory,
      activeMemory,
      totalprocesses,
      runningprocesses,
      blockedprocesses,
      sleepingprocesses,
      latency) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

    const values = [
      cpuspeed,
      cputemp,
      cpuloadpercent,
      totalMemory,
      freeMemory,
      usedMemory,
      activeMemory,
      totalprocesses,
      runningprocesses,
      blockedprocesses,
      sleepingprocesses,
      latency,
    ];

    // Only save entries if all values are not undefined
    if (values.every(value => value !== undefined)) {
      client.query(queryString, values, (err, results) => {
        if (err) {
          throw err;
        }
        console.log('Saved to PostgreSQL!');
      });
    }
  }, interval);
};

/**
 * Runs instead of health
 * If dockerized is true, this function is invoked
 * Collects information on the container
 */
chronos.docker = function ({ microservice, interval }) {
  // Create a table if it doesn't already exist.
  client.query(
    'CREATE TABLE IF NOT EXISTS containerInfo(\n    _id serial PRIMARY KEY,\n    microservice varchar(500) NOT NULL,\n    containerName varchar(500) NOT NULL,\n    containerId varchar(500) NOT NULL,\n    containerPlatform varchar(500),\n    containerStartTime varchar(500),\n    containerMemUsage real DEFAULT 0,\n    containerMemLimit real DEFAULT 0,\n    containerMemPercent real DEFAULT 0,\n    containerCpuPercent real DEFAULT 0,\n    networkReceived real DEFAULT 0,\n    networkSent real DEFAULT 0,\n    containerProcessCount integer DEFAULT 0,\n    containerRestartCount integer DEFAULT 0\n    )',
    function (err, results) {
      if (err) throw err;
    }
  );
  // Declare vars that represent columns in postgres and will be reassigned with values retrieved by si.
  var containerName;
  var containerPlatform;
  var containerStartTime;
  var containerMemUsage;
  var containerMemLimit;
  var containerMemPercent;
  var containerCpuPercent;
  var networkReceived;
  var networkSent;
  var containerProcessCount;
  var containerRestartCount;
  // dockerContainers() return an arr of active containers (ea. container = an obj).
  // Find the data pt with containerName that matches microservice name.
  // Extract container ID, name, platform, and start time.
  // Other stats will be retrieved by dockerContainerStats().
  si.dockerContainers()
    .then(function (data) {
      var containerId = '';

      for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var dataObj = data_1[_i];
        if (dataObj.name === microservice) {
          containerName = dataObj.name;
          containerId = dataObj.id;
          containerPlatform = dataObj.platform;
          containerStartTime = dataObj.startedAt;
          // End iterations as soon as the matching data pt is found.
          break;
        }
      }
      // When containerId has a value:
      // Initiate periodic invoc. of si.dockerContainerStats to retrieve and log stats to DB.
      // The desired data pt is the first obj in the result array.
      if (containerId !== '') {
        setInterval(function () {
          si.dockerContainerStats(containerId)
            .then(function (data) {
              // console.log('data[0] of dockerContainerStats', data[0]);
              // Reassign other vars to the values from retrieved data.
              // Then save to DB.
              containerMemUsage = data[0].mem_usage;
              containerMemLimit = data[0].mem_limit;
              containerMemPercent = data[0].mem_percent;
              containerCpuPercent = data[0].cpu_percent;
              networkReceived = data[0].netIO.rx;
              networkSent = data[0].netIO.wx;
              containerProcessCount = data[0].pids;
              containerRestartCount = data[0].restartCount;
              var queryString =
                'INSERT INTO containerInfo(\n                microservice,\n                containerName,\n                containerId,\n                containerPlatform,\n                containerStartTime,\n                containerMemUsage,\n                containerMemLimit,\n                containerMemPercent,\n                containerCpuPercent,\n                networkReceived,\n                networkSent,\n                containerProcessCount,\n                containerRestartCount)\n                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13\n              )';
              var values = [
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
                containerRestartCount,
              ];
              client.query(queryString, values, function (err, results) {
                if (err) throw err;
                console.log('Saved to SQL!');
              });
            })
            ['catch'](function (err) {
              throw err;
            });
        }, interval);
      } else {
        throw new Error('Cannot find container data matching the microservice name.');
      }
    })
    ['catch'](function (err) {
      throw err;
    });
};

module.exports = chronos;
