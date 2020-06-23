var si = require('systeminformation');
var chronos = {
  microDocker: function (userInputMSName, uri, queryFreq) {},
};
// queryObj determines the setInterval needed for microHealth based on queryFreq parameter provided by user
var queryObj = {
  s: 1000,
  m: 60000,
  h: 3600000,
  d: 86400000,
  w: 604800000,
};
chronos.microDocker = function (userInputMSName, uri, queryFreq) {
  var Client = require('pg').Client;
  var client = new Client({
    connectionString: uri,
  });
  // connects to DB, else throws error
  client.connect(function (err, client, release) {
    if (err) {
      throw new Error('Issue connecting to postgres db');
    }
    // Printing the beginning portion of URI to confirm it's connecting to the correct postgres DB.
    console.log('Connected to SQL in Chronos', '\n', 'Postgres URI = ', uri.slice(0, 24), '...');
  });
  // Create a table if it doesn't already exist. Throws error if needed.
  // 13 cols
  client.query(
    'CREATE TABLE IF NOT EXISTS containerInfo(\n    id serial PRIMARY KEY,\n    currentMicroservice varchar(500) NOT NULL,\n    containerName varchar(500) NOT NULL,\n    containerId varchar(500) NOT NULL,\n    containerPlatform varchar(500),\n    containerStartTime varchar(500),\n    containerMemUsage real DEFAULT 0,\n    containerMemLimit real DEFAULT 0,\n    containerMemPercent real DEFAULT 0,\n    containerCpuPercent real DEFAULT 0,\n    networkReceived real DEFAULT 0,\n    networkSent real DEFAULT 0,\n    containerProcessCount integer DEFAULT 0,\n    containerRestartCount integer DEFAULT 0\n    )',
    function (err, results) {
      if (err) throw err;
    }
  );
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
              var queryString =
                'INSERT INTO containerInfo(\n                currentMicroservice,\n                containerName,\n                containerId,\n                containerPlatform,\n                containerStartTime,\n                containerMemUsage,\n                containerMemLimit,\n                containerMemPercent,\n                containerCpuPercent,\n                networkReceived,\n                networkSent,\n                containerProcessCount,\n                containerRestartCount)\n                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13\n              )';
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
            })
            ['catch'](function (err) {
              // console.log(err);
              throw err;
            });
        }, queryObj[queryFreq]);
      } else {
        // console.log('Cannot find container data matching the microservice name.')
        throw new Error('Cannot find container data matching the microservice name.');
      }
    })
    ['catch'](function (err) {
      throw err;
    });
};
module.exports = chronos;
