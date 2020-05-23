const mongoose = require('mongoose');
const si = require('systeminformation');

// Required to get rid of deprecation warnings
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const chronos = {};

// connectDB is a method that connects chronos to the user database
chronos.connectDB = (userOwnedDB) => {
  mongoose.connect(`${userOwnedDB}`, () => {
    console.log('Chronos MongoDB database is connected...');
  });
}

// Use keys in queryObj to match users' queryFreq input and determine which time unit to use.
// queryObj will be used as 2nd argument for the setInterval function. 
const queryObj = {
  s: 1000, // 1000 milliseconds per second
  m: 60000, // 1000 milliseconds * 60 seconds
  h: 3600000, // 60 seconds * 60 minutes per hour * 1000 milliseconds per second
  d: 86400000, // 60 sec. * 60 min * 1000 ms per sec * 24 hours per day
  w: 604800000, // 60 sec/min * 60 min/hr * 1000 ms/sec * 24 hours/day * 7 days per week
};

// Creates a coomunication table in the user database the stores all of the data from each request
chronos.microCom = (userOwnedDB, currentMicroservice, wantMicroHealth, queryFreq) => {
  //Connects chronos to the user's database
  chronos.connectDB(userOwnedDB);
  
  //Checks if the user wants the MicroHealth of the server to be recorded. If so, the microHealth is invoked
  if (wantMicroHealth === 'yes' || wantMicroHealth === 'y') {
    chronos.microHealth(currentMicroservice,queryFreq)
  } 

  //returns a middleware that creates a new communication document in the mongoDB database whenever a response for the request comes thru
  return function (req, res, next) {
    // provides the schema for Communication
    require('./Communication.js');

    // creates a model off of the Communication Schema
    const Communication = mongoose.model('Communication');

    // creates newCommunication object that stores the data from each request
    const newCommunication = {
      currentMicroservice,
      targetedEndpoint: req.originalUrl,
      reqType: req.method,
      timeSent: Date.now(),
      correlatingId: res.getHeaders()['x-correlation-id'],
    };
    // adds resStatus and resMessage to the newCommunication object
    // sends the data to database and goes to the next middleware
    res.on('finish', () => {
      newCommunication.resStatus = res.statusCode;
      newCommunication.resMessage = res.statusMessage;
      const communication = new Communication(newCommunication);

      communication.save()
        .then(() => {
          next();
        })
        .catch((err) => {
          if (err) {
            throw err;
          }
        });
    });
    next();
  };
}

// creates a table in the user database that store the health of the server base on the frequency the user stated
chronos.microHealth = (currentMicroservice,queryFreq) => {
  require('./MicroserviceHealth.js');
  const MicroserviceHealth = mongoose.model('MicroserviceHealth');
  let cpuCurrentSpeed;
  let cpuTemperature;
  let cpuCurrentLoadPercentage;
  let totalMemory;
  let freeMemory;
  let usedMemory;
  let activeMemory;
  let latency;
  let timestamp;
  let totalNumProcesses;
  let numBlockedProcesses;
  let numRunningProcesses;
  let numSleepingProcesses;
  // New Docker container stats (9).
  let containerId;
  let containerMemUsage;
  let containerMemLimit;
  let containerMemPercent;
  let containerCpuPercent;
  let networkReceived;
  let networkSent;
  let containerProcessCount;
  let containerRestartCount;

  // Note the frequency setting (2nd argument: queryObj[queryFreq]) at the end of this setInterval.
  setInterval(() => {
    si.cpuCurrentspeed()
      .then((data) => {
        cpuCurrentSpeed = data.avg;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });

    si.cpuTemperature()
      .then((data) => {
        cpuTemperature = data.main;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
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
        if (err) {
          throw err;
        }
      });

    si.processes()
      .then((data) => {
        totalNumProcesses = data.all;
        numBlockedProcesses = data.blocked;
        numRunningProcesses = data.running;
        numSleepingProcesses = data.sleeping;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });

    si.inetLatency()
      .then((data) => {
        latency = data;
      })
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
    
    // Passing in '*' to get stats on ALL containers.
      // Assumes that only one container is running for each microsvc (for now).
      // Targets the only container by pointing to data[0].
    si.dockerContainerStats('*')
      .then((data) => {
        // console.log('"data" from si.dockerContainerStats:', data);
        containerId = data[0].id;
        containerMemUsage = data[0].mem_usage;
        containerMemLimit = data[0].mem_limit;
        containerMemPercent = data[0].mem_percent;
        containerCpuPercent = data[0].cpu_percent;
        networkReceived = data[0].netIO.rx;
        networkSent = data[0].netIO.wx;
        containerProcessCount = data[0].pids;
        containerRestartCount = data[0].restartCount;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    const newHealthPoint = {
      timestamp: Date.now(),
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
      latency,
      containerId,
      containerMemUsage,
      containerMemLimit,
      containerMemPercent,
      containerCpuPercent,
      networkReceived,
      networkSent,
      containerProcessCount,
      containerRestartCount,
    };

    const healthPoint = new MicroserviceHealth(newHealthPoint);
    healthPoint
      .save()
      .then(() => {console.log('Saved to MongoDB!')})
      .catch((err) => {
        if (err) {
          throw err;
        }
      });
  }, queryObj[queryFreq]);
};

module.exports = chronos;
