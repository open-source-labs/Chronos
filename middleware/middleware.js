const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const si = require('systeminformation');

//Required to get rid of deprecation warnings
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

const chronos = {};

chronos.connectDB = () => {
  mongoose.connect(
    "mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/chronos-access",
    () => {
      console.log("Chronos database is connected...");
    }
  );
}

chronos.microCom = (currentMicroservice) => {
  chronos.connectDB()
  return function (req, res, next) {
    console.log('HEY DO WE HIT THIS?')
    const currentMicroservicePath = currentMicroservice;

    require('./Communication.js')
    const Communication = mongoose.model("Communication")

    const newCommunication = {
      currentMicroservice: currentMicroservicePath,
      targetedEndpoint: req.originalUrl,
      reqType: req.method,
      timeSent: Date.now(),
    };

    const communication = new Communication(newCommunication);

    communication.save().then(()=> {
      console.log('New Microservice Communication Created')
      next();
    }).catch((err) => {
      if (err) {
        throw err;
      }
    })
  }
},

chronos.microHealth = (currentMicroservice) => {
  require('./MicroserviceHealth.js')
  const MicroserviceHealth = mongoose.model('MicroserviceHealth')
  let cpuCurrentSpeed, cpuTemperature, totalMemory, freeMemory, usedMemory, activeMemory, latency, timestamp;
  let currentMicroservicePath, totalNumProcesses, numBlockedProcesses, numRunningProcesses, numSleepingProcesses;

  chronos.connectDB();  
  currentMicroservicePath = currentMicroservice;

  setInterval(() => {
    si.cpuCurrentspeed()
    .then(data => {
      cpuCurrentSpeed = data.avg;
    })
    .catch((err) => {
      console.log(err)
    })
    
    si.cpuTemperature()
    .then(data => {
      cpuTemperature = data.main
    })
    .catch((err) => {
      console.log(err)
    })
    
    si.mem()
    .then(data => {
      totalMemory = data.total
      freeMemory = data.free
      usedMemory = data.used
      activeMemory = data.active
    })
    .catch((err) => {
      console.log(err)
    })
    
    si.processes()
    .then(data => {
      totalNumProcesses = data.all
      numBlockedProcesses = data.blocked
      numRunningProcesses = data.running
      numSleepingProcesses = data.sleeping
    })
    .catch((err) => {
      console.log(err)
    })

    si.inetLatency()
    .then(data => {
      latency = data 
    })
    .catch((err) => {
      console.log(err)
    })
    
    const newHealthPoint = {
      timestamp: Date.now(),
      currentMicroservice: currentMicroservice,
      cpuCurrentSpeed: cpuCurrentSpeed,
      cpuTemperature: cpuTemperature,
      totalMemory: totalMemory,
      freeMemory: freeMemory,
      usedMemory: usedMemory,
      activeMemory: activeMemory,
      totalNumProcesses: totalNumProcesses,
      numRunningProcesses: numRunningProcesses,
      numBlockedProcesses: numBlockedProcesses,
      numSleepingProcesses: numSleepingProcesses,
      latency: latency
    }
    
    const healthPoint = new MicroserviceHealth(newHealthPoint)
    healthPoint.save()
    .then(() => {
      console.log('New Microservice Health Point Created')
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    })
  }, 1000)
}

module.exports = chronos;

  // module.exports = function(currentMicroservice) {
  //   return function (req,res,next) {
  //     mongoose.connect(
  //       "mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/chronos-access",
  //       () => {
  //         console.log("Chronos database is connected...");
  //       }
  //     );
  //     const currentMicroservicePath = currentMicroservice;

  //     require('./Communication.js')
  //     const Communication = mongoose.model("Communication")

  //     const newCommunication = {
  //       currentMicroservice: currentMicroservicePath,
  //       targetedEndpoint: req.originalUrl,
  //       reqType: req.method,
  //       timeSent: Date.now(),
  //     };

  //     const communication = new Communication(newCommunication);

  //     communication.save().then(()=> {
  //       console.log('New Microservice Communication Created')
  //     }).catch((err) => {
  //       if (err) {
  //         throw err;
  //       }
  //     })

  //     require('./MicroserviceHealth.js')
  //     const MicroserviceHealth = mongoose.model('MicroserviceHealth')
  //     let cpuCurrentSpeed, cpuTemperature, totalMemory, freeMemory, usedMemory, activeMemory;
  //     let totalNumProcesses, numBlockedProcesses, numRunningProcesses, numSleepingProcesses;
    
  //       si.cpuCurrentspeed()
  //         .then(data => {
  //           console.log(data)
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })

  //       si.cpuTemperature()
  //         .then(data => {
  //           cpuTemperature = data.main
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })

  //       si.mem()
  //         .then(data => {
  //           totalMemory = data.total
  //           freeMemory = data.free
  //           usedMemory = data.used
  //           activeMemory = data.active
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })

  //       si.processes()
  //         .then(data => {
  //           totalNumProcesses = data.all
  //           numBlockedProcesses = data.blocked
  //           numRunningProcesses = data.running
  //           numSleepingProcesses = data.sleeping
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })

  //       const newHealthPoint = {
  //         currentMicroservice: currentMicroservice,
  //         cpuCurrentSpeed: cpuCurrentSpeed,
  //         cpuTemperature: cpuTemperature,
  //         totalMemory: totalMemory,
  //         freeMemory: freeMemory,
  //         usedMemory: usedMemory,
  //         activeMemory: activeMemory,
  //         totalNumProcesses: totalNumProcesses,
  //         numRunningProcesses: numRunningProcesses,
  //         numBlockedProcesses: numBlockedProcesses,
  //         numSleepingProcesses: numSleepingProcesses
  //       }

  //       const healthPoint = new MicroserviceHealth(newHealthPoint)
  //       healthPoint.save()
  //         .then(() => {
  //           console.log('New Microservice Communication Created')
  //         })
  //         .catch((err) => {
  //           if (err) {
  //             throw err;
  //           }
  //         })
  //        // We are currently able to access the responses, but are not sending status codes or messages
  //       // This is due to the way the microservices are written.
  //       next();
  //   }
  // }
