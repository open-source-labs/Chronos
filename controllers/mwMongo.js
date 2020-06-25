const mongoose = require('mongoose');
const si = require('systeminformation');
const notifications = require('./notification');
require('../models/Communication');
require('../models/ContainerInfo');
const MicroserviceScheme = require('../models/Microservice');
require('../models/Services');

// Required to get rid of deprecation warnings
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const chronos = {};

// connectDB is a method that connects chronos to the user database
chronos.connectDB = userOwnedDB => {
  mongoose.connect(`${userOwnedDB}`, error => {
    if (error) throw error;
    // Printing the beginning portion of URI to confirm it's connecting to the correct MongoDB.
    console.log(`Chronos MongoDB is connected at ${userOwnedDB.slice(0, 20)}...`);
  });
};

// Use keys in queryObj to match users' queryFreq input and determine which time unit to use.
// queryObj will be used as 2nd argument for the setInterval function.
const queryObj = {
  s: 1000, // 1000 milliseconds per second
  m: 60000, // 1000 milliseconds * 60 seconds
  h: 3600000, // 60 seconds * 60 minutes per hour * 1000 milliseconds per second
  d: 86400000, // 60 sec. * 60 min * 1000 ms per sec * 24 hours per day
  w: 604800000, // 60 sec/min * 60 min/hr * 1000 ms/sec * 24 hours/day * 7 days per week
};

// Create a coomunication table in the user database the stores all of the data from each request
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
  password
) => {
  //Connect chronos to the user's database
  chronos.connectDB(userOwnedDB);
  //passes microservice name and latency data for the population of the services mongo table
  chronos.microServices(microserviceName, queryFreq);
  // Invoke the microHealth if the user provides "yes" when invoking chronos.microCom in the server.
  // Invoke microDocker instead if user provides "yes" to "isDockerized".
  if (wantMicroHealth === 'yes' || wantMicroHealth === 'y') {
    chronos.microHealth(microserviceName, queryFreq);
  } else if (isDockerized === 'yes' || wantMicroHealth === 'y') {
    chronos.microDocker(microserviceName, queryFreq);
  }

  //returns a middleware that creates a new communication document in the mongoDB database whenever a response for the request comes thru
  return function (req, res, next) {
    // provides the schema for Communication

    // creates a model off of the Communication Schema
    const Communication = mongoose.model('Communication');

    // creates newCommunication object that stores the data from each request
    const newCommunication = {
      currentMicroservice: microserviceName,
      endpoint: req.originalUrl,
      request: req.method,
      time: Date.now(),
      correlatingid: res.getHeaders()['x-correlation-id'],
    };
    // adds resStatus and resMessage to the newCommunication object
    // sends the data to database and goes to the next middleware
    res.on('finish', () => {
      // if the statusdoe is an error messsage a notice is sent to slack via axios in notifications.js
      if (res.statusCode >= 400) {
        /**
         * OPTIONAL: If the user provides a SlackURL or email information, a notification will be
         * sent to the provided contact information.
         */
        if (SlackUrl) {
          const data = {
            text: `${res.statusCode}, ${res.statusMessage}, ${Date.now()}`,
          };
          // Call to the notifications controller for slack
          notifications.sendSlack(data, SlackUrl);
        }

        if (emailList) {
          const message = {
            to: `${emailList}`,
            subject: 'Error from Middleware', // Subject line
            text: `${res.statusCode}, ${res.statusMessage}`, // Plain text body
          };
          const config = {
            host: `${emailHost}`,
            port: `${emailPort}`,
            auth: {
              user: `${user}`,
              pass: `${password}`,
            },
          };
          // Call to the notifications controller for emails
          notifications.sendEmail(message, config);
        }
      }

      newCommunication.responsestatus = res.statusCode;
      newCommunication.responsemessage = res.statusMessage;
      const communication = new Communication(newCommunication);

      communication
        .save()
        .then(() => next())
        .catch(err => {
          throw err;
        });
    });
    next();
  };
};

chronos.microServices = (microserviceName, queryFreq) => {
  const Services = mongoose.model('services');
  // creates newServices object
  const newServices = {
    microservice: microserviceName,
    interval: queryObj[queryFreq],
  };
  //creates new services document
  const services = new Services(newServices);

  services
    .save()
    .then()
    .catch(err => {
      console.log(err);
    });
};

// Invoked if user provided "yes" as 4th arg when invoking microCom() in servers.
// Will NOT be invoked if user provided "yes" for "isDockerized" when invoking microCom().
// Instead, will invoke another middlware called chronos.microDocker().
chronos.microHealth = (microserviceName, queryFreq) => {
  // creates a model off of the Services Schema
  const MicroserviceHealth = MicroserviceScheme(`${microserviceName}`);

  let cpuspeed;
  let cputemp;
  let cpuloadpercent;
  let totalmemory;
  let freememory;
  let usedmemory;
  let activememory;
  let latency;
  let timestamp;
  let totalprocesses;
  let blockedprocesses;
  let runningprocesses;
  let sleepingprocesses;

  // Note the frequency setting (2nd argument: queryObj[queryFreq]) at the end of this setInterval.
  setInterval(() => {
    si.cpuCurrentspeed()
      .then(data => {
        cpuspeed = data.avg;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });

    si.cpuTemperature()
      .then(data => {
        cputemp = data.main;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
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
        totalmemory = data.total;
        freememory = data.free;
        usedmemory = data.used;
        activememory = data.active;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });

    si.processes()
      .then(data => {
        totalprocesses = data.all;
        blockedprocesses = data.blocked;
        runningprocesses = data.running;
        sleepingprocesses = data.sleeping;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });

    si.inetLatency()
      .then(data => {
        latency = data;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
    //creates new microservice object
    const newHealthPoint = {
      timestamp: Date.now(),
      currentMicroservice: microserviceName,
      cpuspeed,
      cputemp,
      cpuloadpercent,
      totalmemory,
      freememory,
      usedmemory,
      activememory,
      totalprocesses,
      runningprocesses,
      blockedprocesses,
      sleepingprocesses,
      latency,
    };
    // creation of new microservice schema
    const healthPoint = new MicroserviceHealth(newHealthPoint);
    healthPoint
      .save()
      .then(() => {
        console.log('Saved to MongoDB!');
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      });
  }, queryObj[queryFreq]);
};

/**
 * If dockerized is true, this function is invoked
 * Collects information on the container
 */
chronos.microDocker = function (microserviceName, queryFreq) {
  const ContainerInfo = mongoose.model('ContainerInfo');

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
  // Find the data pt with containerName that matches microserviceName.
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

              const newContainerInfo = {
                microserviceName: microserviceName,
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
              };

              const containerInfo = new ContainerInfo(newContainerInfo);
              containerInfo
                .save()
                .then(() => console.log('Saved to MongoDB!'))
                .catch(err => {
                  if (err) throw err;
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
