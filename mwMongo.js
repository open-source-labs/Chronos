const mongoose = require('mongoose');
const si = require('systeminformation');

//Required to get rid of deprecation warnings
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

const chronos = {};
let currentMicroservicePath;
chronos.connectDB = (userOwnedDB) => {
  mongoose.connect(`${userOwnedDB}`,
    () => {
      console.log("Chronos database is connected...");
    }
  );
},

chronos.microCom = (userOwnedDB, currentMicroservice) => {
  chronos.connectDB(userOwnedDB)
  return function(req, res, next) {
    currentMicroservicePath = currentMicroservice;

    require("./Communication.js");
    const Communication = mongoose.model("Communication");

    const newCommunication = {
      currentMicroservice: currentMicroservicePath,
      targetedEndpoint: req.originalUrl,
      reqType: req.method,
      timeSent: Date.now(),
      correlatingId: res.getHeaders()['x-correlation-id']
    };

    res.on("finish", () => {
      newCommunication.resStatus = res.statusCode;
      newCommunication.resMessage = res.statusMessage;
      const communication = new Communication(newCommunication);

      communication.save()
        .then(() => {
          next();
        })
        .catch(err => {
          if (err) {
            throw err;
          }
        });
    });
    next();
  };
},
  chronos.microHealth = (userOwnedDB, currentMicroservice) => {
   chronos.connectDB(userOwnedDB)
    require("./MicroserviceHealth.js");
    const MicroserviceHealth = mongoose.model("MicroserviceHealth");
    let cpuCurrentSpeed,
      cpuTemperature,
      cpuCurrentLoadPercentage,
      totalMemory,
      freeMemory,
      usedMemory,
      activeMemory,
      latency,
      timestamp,
      totalNumProcesses,
      numBlockedProcesses,
      numRunningProcesses,
      numSleepingProcesses;

    setInterval(() => {
      si.cpuCurrentspeed()
        .then(data => {
          cpuCurrentSpeed = data.avg;
        })
        .catch(err => {
          if (err) {
            throw err;
          }
        });

      si.cpuTemperature()
        .then(data => {
          cpuTemperature = data.main;
        })
        .catch(err => {
          if (err) {
            throw err;
          }
        });

      si.currentLoad()
        .then(data => {
          cpuCurrentLoadPercentage = data.currentload
        })
        .catch(err => {
          throw err;
        })

      si.mem()
        .then(data => {
          totalMemory = data.total;
          freeMemory = data.free;
          usedMemory = data.used;
          activeMemory = data.active;
        })
        .catch(err => {
          if (err) {
            throw err;
          }
        });

      si.processes()
        .then(data => {
          totalNumProcesses = data.all;
          numBlockedProcesses = data.blocked;
          numRunningProcesses = data.running;
          numSleepingProcesses = data.sleeping;
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

      const newHealthPoint = {
        timestamp: Date.now(),
        currentMicroservice: currentMicroservicePath,
        cpuCurrentSpeed: cpuCurrentSpeed,
        cpuTemperature: cpuTemperature,
        cpuCurrentLoadPercentage: cpuCurrentLoadPercentage,
        totalMemory: totalMemory,
        freeMemory: freeMemory,
        usedMemory: usedMemory,
        activeMemory: activeMemory,
        totalNumProcesses: totalNumProcesses,
        numRunningProcesses: numRunningProcesses,
        numBlockedProcesses: numBlockedProcesses,
        numSleepingProcesses: numSleepingProcesses,
        latency: latency
      };

      const healthPoint = new MicroserviceHealth(newHealthPoint);
      healthPoint
        .save()
        .then(() => {})
        .catch(err => {
          if (err) {
            throw err;
          }
        });
    }, 1000);
  };

module.exports = chronos;

