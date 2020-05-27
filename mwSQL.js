// NPM package that gathers health information
const si = require('systeminformation');
// const mwSqlDocker = require('./mwSqlDocker.js');

let client;

const chronos = {};

// queryObj determines the setInterval needed for microHealth based on queryFreq parameter provided by user
const queryObj = {
  s: 1000, // 1000 milliseconds per second
  m: 60000, // 1000 milliseconds * 60 seconds
  h: 3600000, // 60 seconds * 60 minutes per hour * 1000 milliseconds per second
  d: 86400000, // 60 sec. * 60 min * 1000 ms per sec * 24 hours per day
  w: 604800000, // 60 sec/min * 60 min/hr * 1000 ms/sec * 24 hours/day * 7 days per week
};

// microCom
chronos.microCom = (userOwnedDB, userInputMSName, wantMicroHealth, queryFreq, isDockerized, req, res, next) => {
  // create connection to user owned database
  // we're using PostgreSQL and need to require pg
  const { Client } = require('pg');
  // grabbed from user input
  const uri = userOwnedDB;

  // creates a new instance of client
  client = new Client({
    connectionString: uri,
  });

  // connects to DB, else throws error
  client.connect((err, client, release) => {
    if (err) {
      throw new Error('Issue connecting to db');
    }
    // Printing the beginning portion of URI to confirm it's connecting to the correct postgres DB.
    console.log('Connected to SQL in Chronos', '\n', 'Postgres URI = ', uri.slice(0, 24), '...');
  });

  // Invoke the microHealth if the user provides "yes" when invoking chronos.microCom in the server.
  // Invoke microDocker instead if user provides "yes" to "isDockerized".
  if (wantMicroHealth === 'yes' || wantMicroHealth === 'y') {
    chronos.microHealth(userInputMSName, queryFreq);
  } else if (isDockerized === 'yes' || wantMicroHealth === 'y') {
    chronos.microDocker(userInputMSName, queryFreq);
  }

  // query created DB and create table if it doesn't already exist and create the columns. Throws error if needed.
  client.query(
    `CREATE TABLE IF NOT EXISTS communications(
    id serial PRIMARY KEY,
    currentMicroservice varchar(500) NOT NULL,
    targetedEndpoint varchar(500) NOT NULL,
    reqType varchar(500),
    resStatus integer,
    resMessage varchar(500),
    timeSent timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    correlatingId varchar(500)
  )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    },
  );

  return (req, res, next) => {
    // correlating id that will persist thru the request from one server to the next
    const correlatingId = res.getHeaders()['x-correlation-id'];
    // user-input name for current microservice
    const currentMicroservice = userInputMSName;
    // What was our endpoint? Grabbed from request object
    const targetedEndpoint = req.originalUrl;
    // Type of request. Grabbed from request object
    const reqType = req.method;

    const queryString = `INSERT INTO communications
      (currentMicroservice, targetedEndpoint, reqType, resStatus, resMessage, correlatingId)
      VALUES ($1, $2, $3, $4, $5, $6);`

    // Waits for response to finish before pushing information into database
    res.on('finish', () => {
      // Grabs status code from response object
      resStatus = res.statusCode;
      // Grabs status message from response object
      resMessage = res.statusMessage;
      values = [
        currentMicroservice,
        targetedEndpoint,
        reqType,
        resStatus,
        resMessage,
        correlatingId,
      ];
      client.query(queryString, values, (err, result) => {
        if (err) {
          throw err;
        }
      });
    });
    next();
  };
};

// Invoked if user provided "yes" as 4th arg when invoking microCom() in servers.
// Will NOT be invoked if user provided "yes" for "isDockerized" when invoking microCom().
  // Instead, will invoke another middlware called chronos.microDocker().
chronos.microHealth = (userInputMSName, queryFreq) => {
  let cpuCurrentSpeed;
  let cpuTemperature;
  let cpuCurrentLoadPercentage;
  let totalMemory;
  let freeMemory;
  let usedMemory;
  let activeMemory;
  let latency;
  let currentMicroservice;
  let totalNumProcesses;
  let numBlockedProcesses;
  let numRunningProcesses;
  let numSleepingProcesses;

  currentMicroservice = userInputMSName;

  client.query(
    // Alan: updating the table with the last few columns to accomodate Docker data.
      // As of 05/13/20, added 9 more columns.
    `CREATE TABLE IF NOT EXISTS healthInfo (
      id SERIAL PRIMARY KEY,
      time timestamp DEFAULT CURRENT_TIMESTAMP,
      currentMicroservice varchar(500),
      cpuCurrentSpeed float DEFAULT 0.0,
      cpuCurrentLoadPercentage float DEFAULT 0.00,
      cpuTemperature float DEFAULT 0.0,
      totalMemory real DEFAULT 0,
      freeMemory real DEFAULT 0,
      usedMemory real DEFAULT 0,
      activeMemory real DEFAULT 0,
      totalNumProcesses real DEFAULT 0,
      numRunningProcesses real DEFAULT 0,
      numBlockedProcesses real DEFAULT 0,
      numSleepingProcesses real DEFAULT 0,
      latency float DEFAULT 0.0,
      containerId varchar(500),
      containerMemUsage real DEFAULT 0,
      containerMemLimit real DEFAULT 0,
      containerMemPercent real DEFAULT 0,
      containerCpuPercent real DEFAULT 0,
      networkReceived real DEFAULT 0,
      networkSent real DEFAULT 0,
      containerProcessCount integer DEFAULT 0,
      containerRestartCount integer DEFAULT 0
    )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    },
  );

  // Collect metrics at intervals (determined by user input, e.g. 's', 'm', etc.)
  setInterval(() => {
    si.cpuCurrentspeed()
      .then((data) => {
        cpuCurrentSpeed = data.avg;
      })
      .catch((err) => {
        throw err;
      });

    si.cpuTemperature()
      .then((data) => {
        cpuTemperature = data.main;
      })
      .catch((err) => {
        throw err;
      });

    si.currentLoad()
      .then((data) => {
        cpuCurrentLoadPercentage = data.currentload;
      })
      .catch((err) => {
        throw err;
      });

    si.mem()
      .then((data) => {
        totalMemory = data.total;
        freeMemory = data.free;
        usedMemory = data.used;
        activeMemory = data.active;
      })
      .catch((err) => {
        throw err;
      });

    si.processes()
      .then((data) => {
        totalNumProcesses = data.all;
        numBlockedProcesses = data.blocked;
        numRunningProcesses = data.running;
        numSleepingProcesses = data.sleeping;
      })
      .catch((err) => {
        throw err;
      });

    si.inetLatency()
      .then((data) => {
        latency = data;
      })
      .catch((err) => {
        throw err;
      });

    const queryString = `INSERT INTO healthInfo(
      currentMicroservice,
      cpuCurrentSpeed,
      cpuTemperature,
      cpuCurrentLoadPercentage,
      totalMemory,
      freeMemory,
      usedMemory,
      activeMemory,
      totalNumProcesses,
      numRunningProcesses,
      numBlockedProcesses,
      numSleepingProcesses,
      latency) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

    const values = [
      currentMicroservice,
      cpuCurrentSpeed,
      cpuTemperature,
      cpuCurrentLoadPercentage,
      totalMemory,
      freeMemory,
      usedMemory,
      activeMemory,
      totalNumProcesses,
      numRunningProcesses,
      numBlockedProcesses,
      numSleepingProcesses,
      latency
    ];

    client.query(queryString, values, (err, results) => {
      if (err) {
        throw err;
      }
      console.log('Saved to PostgreSQL!')
    });
  }, queryObj[queryFreq]);
};

chronos.microDocker = function (userInputMSName, uri, queryFreq) {
  // Create a table if it doesn't already exist. Throws error if needed.
  // 13 cols
  client.query("CREATE TABLE IF NOT EXISTS containerInfo(\n    id serial PRIMARY KEY,\n    currentMicroservice varchar(500) NOT NULL,\n    containerName varchar(500) NOT NULL,\n    containerId varchar(500) NOT NULL,\n    containerPlatform varchar(500),\n    containerStartTime varchar(500),\n    containerMemUsage real DEFAULT 0,\n    containerMemLimit real DEFAULT 0,\n    containerMemPercent real DEFAULT 0,\n    containerCpuPercent real DEFAULT 0,\n    networkReceived real DEFAULT 0,\n    networkSent real DEFAULT 0,\n    containerProcessCount integer DEFAULT 0,\n    containerRestartCount integer DEFAULT 0\n    )", function (err, results) {
    if (err) throw err;
  });
  // Declare vars that represent columns in postgres and will be reassigned with values retrieved by si.
  var containerName;
  var containerId = '';
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
  // Find the data pt with containerName that matches currentMicroservice name. 
  // Extract container ID, name, platform, and start time.
  // Other stats will be retrieved by dockerContainerStats().
  si.dockerContainers()
    .then(function (data) {
    // let matchingContainer: object = {}; 
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
      var dataObj = data_1[_i];
      if (dataObj.name === userInputMSName) {
        // matchingContainer = dataObj;
        containerName = dataObj.name;
        containerId = dataObj.id;
        containerPlatform = dataObj.platform;
        containerStartTime = dataObj.startedAt;
      }
      // End iterations as soon as the matching data pt is found.
      break;
    }
    // When containerId has a value:
    // Initiate periodic invoc. of si.dockerContainerStats to retrieve and log stats to DB.
    // The desired data pt is the first obj in the result array.
    if (containerId !== '') {
      setInterval(function () {
        si.dockerContainerStats(containerId)
          .then(function (data) {
          console.log('data[0] of dockerContainerStats', data[0]);
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
          var queryString = "INSERT INTO containerInfo(\n                currentMicroservice,\n                containerName,\n                containerId,\n                containerPlatform,\n                containerStartTime,\n                containerMemUsage,\n                containerMemLimit,\n                containerMemPercent,\n                containerCpuPercent,\n                networkReceived,\n                networkSent,\n                containerProcessCount,\n                containerRestartCount)\n                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13\n              )";
          var values = [
            userInputMSName,
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
            console.log('Saved to PostgreSQL!');
          });
        })["catch"](function (err) {
          throw err;
        });
      }, queryObj[queryFreq]);
    }
    else {
      // throw new Error('Cannot find container data matching the microservice name.');
      // If si wasn't able to read container stats on first try, try again in 3 sec.
      setTimeout(chronos.microDocker, 3000);
    }
  })["catch"](function (err) {
    throw err;
  });
};

module.exports = chronos;
