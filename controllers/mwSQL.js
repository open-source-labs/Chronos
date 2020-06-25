// NPM package that gathers health information
const si = require('systeminformation');
const { Client } = require('pg');
const notifications = require('../controllers/notification');
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
chronos.microCom = (
  microserviceName,
  userOwnedDB,
  wantMicroHealth,
  queryFreq,
  isDockerized,
  SlackUrl,
  emailList,
  emailHost,
  emailPort,
  user,
  password,
  req,
  res,
  next
) => {
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
    console.log('Chronos SQL is connected at ', uri.slice(0, 24), '...');
  });
  chronos.microServices(microserviceName, queryFreq);
  // Invoke the microHealth if the user provides "yes" when invoking chronos.microCom in the server.
  // Invoke microDocker instead if user provides "yes" to "isDockerized".
  if (wantMicroHealth === 'yes' || wantMicroHealth === 'y') {
    chronos.microHealth(microserviceName, queryFreq);
  } else if (isDockerized === 'yes' || wantMicroHealth === 'y') {
    chronos.microDocker(microserviceName, queryFreq);
  }

  // query created DB and create table if it doesn't already exist and create the columns. Throws error if needed.
  client.query(
    `CREATE TABLE IF NOT EXISTS communications(
    id serial PRIMARY KEY,
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
    // correlating id that will persist thru the request from one server to the next
    const correlatingId = res.getHeaders()['x-correlation-id'];
    // user-input name for current microservice
    const microservice = microserviceName;
    // What was our endpoint? Grabbed from request object
    const endpoint = req.originalUrl;
    // Type of request. Grabbed from request object
    const request = req.method;

    const queryString = `INSERT INTO communications
      (microservice, endpoint, request, responsestatus, responsemessage, correlatingId)
      VALUES ($1, $2, $3, $4, $5, $6);`;

    // Waits for response to finish before pushing information into database
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        //  Error data that is sent to the user in both the slack notification and email body
        const data = {
          text: `${res.statusCode}, ${res.statusMessage}, ${Date.now()}`,
        };
        //the message object contains the receipent email list and the email text body
        const message = {
          to: `${emailList}`,
          subject: 'Error from Middleware', // Subject line
          text: `${res.statusCode}, ${res.statusMessage}`, // Plain text body
        };
        // configuartion settings for  the email notifications
        const config = {
          host: `${emailHost}`,
          port: `${emailPort}`,
          auth: {
            user: `${user}`,
            pass: `${password}`,
          },
        };
        notifications.sendSlack(data, SlackUrl);
        notifications.sendEmail(message, config);
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
      });
    });
    next();
  };
};

chronos.microServices = (microserviceName, queryFreq) => {
  client.query(
    `CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY NOT NULL,
      microservice VARCHAR(248) NOT NULL UNIQUE,
      interval INTEGER NOT NULL
      )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    }
  );

  const queryString = `INSERT INTO services
      (microservice, interval)
      VALUES ($1, $2)
      ON CONFLICT (microservice) DO NOTHING;`;
  const values = [microserviceName, queryObj[queryFreq]];

  client.query(queryString, values, (err, result) => {
    if (err) {
      throw err;
    }
  });
};

// Invoked if user provided "yes" as 4th arg when invoking microCom() in servers.
// Will NOT be invoked if user provided "yes" for "isDockerized" when invoking microCom().
// Instead, will invoke another middlware called chronos.microDocker().
chronos.microHealth = (microserviceName, queryFreq) => {
  let cpuspeed;
  let cputemp;
  let cpuloadpercent;
  let totalMemory;
  let freeMemory;
  let usedMemory;
  let activeMemory;
  let latency;
  let totalprocesses;
  let blockedprocesses;
  let runningprocesses;
  let sleepingprocesses;

  const microservice = microserviceName;

  client.query(
    `CREATE TABLE IF NOT EXISTS ${microserviceName} (
      id SERIAL PRIMARY KEY NOT NULL,
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
      cpuloadpercent float DEFAULT 0.00,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )`,
    (err, results) => {
      if (err) {
        throw err;
      }
    }
  );

  // Collect metrics at intervals (determined by user input, e.g. 's', 'm', etc.)
  setInterval(() => {
    si.cpuCurrentspeed()
      .then(data => {
        cpuspeed = data.avg;
      })
      .catch(err => {
        throw err;
      });

    si.cpuTemperature()
      .then(data => {
        cputemp = data.main;
      })
      .catch(err => {
        throw err;
      });

    si.currentLoad()
      .then(data => {
        cpuloadpercent = data.currentload;
      })
      .catch(err => {
        throw err;
      });

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

    si.inetLatency()
      .then(data => {
        latency = data;
      })
      .catch(err => {
        throw err;
      });

    const queryString = `INSERT INTO ${microserviceName}(
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

    client.query(queryString, values, (err, results) => {
      if (err) {
        throw err;
      }
      console.log('Saved to PostgreSQL!');
    });
  }, queryObj[queryFreq]);
};

chronos.microDocker = function (microserviceName, queryFreq) {
  // Create a table if it doesn't already exist.
  client.query(
    'CREATE TABLE IF NOT EXISTS containerInfo(\n    id serial PRIMARY KEY,\n    microservice varchar(500) NOT NULL,\n    containerName varchar(500) NOT NULL,\n    containerId varchar(500) NOT NULL,\n    containerPlatform varchar(500),\n    containerStartTime varchar(500),\n    containerMemUsage real DEFAULT 0,\n    containerMemLimit real DEFAULT 0,\n    containerMemPercent real DEFAULT 0,\n    containerCpuPercent real DEFAULT 0,\n    networkReceived real DEFAULT 0,\n    networkSent real DEFAULT 0,\n    containerProcessCount integer DEFAULT 0,\n    containerRestartCount integer DEFAULT 0\n    )',
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
        if (dataObj.name === microserviceName) {
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
                microserviceName,
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
        }, queryObj[queryFreq]);
      } else {
        throw new Error('Cannot find container data matching the microservice name.');
      }
    })
    ['catch'](function (err) {
      throw err;
    });
};

module.exports = chronos;
