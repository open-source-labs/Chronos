const si = require('systeminformation');
const chronos = {};


chronos.microCom = (userOwnedDB, userInputMSName, req, res, next) => {
  const { Client } = require("pg");
  const uri = userOwnedDB;

  const client = new Client({
    connectionString: uri
  })

  client.connect((err, client, release) => {
    if (err) {
      console.log("Issue connecting to db");
    }
  })

  client.query(
    `CREATE TABLE IF NOT EXISTS communications(
    id serial PRIMARY KEY,
    currentMicroservice varchar(500) NOT NULL,
    targetedEndpoint varchar(500) NOT NULL,
    reqType varchar(500),
    resStatus integer,
    resMessage varchar(500),
    timeSent timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
    (err, results) => {
      if (err) {
        throw err;
      } 
    }
  )
   return (req, res, next) => {

      let currentMicroservice = userInputMSName;
      let targetedEndpoint = req.originalUrl;
      let reqType = req.method;

      
      let queryString = `INSERT INTO communications(currentMicroservice, targetedEndpoint, reqType, resStatus, resMessage) VALUES ($1, $2, $3, $4, $5)`;
      
      res.on('finish', () => {
        resStatus = res.statusCode;
        resMessage = res.statusMessage;
            values = [
              currentMicroservice,
              targetedEndpoint,
              reqType,
              resStatus,
              resMessage
            ];
      client.query(queryString, values, (err, result) => {
        console.log(3)
        if (err) {
          throw err;
        } 
      })
    })
     next();
  }
},
  chronos.microHealth = (userOwnedDB, userInputMSName) => {
    const { Client } = require("pg");
    const uri = userOwnedDB;

    const client = new Client({
      connectionString: uri
    });

    client.connect((err, client, release) => {
      if (err) {
        console.log("Issue connecting to db");
      }
    });

    let cpuCurrentSpeed, 
      cpuTemperature, 
      cpuCurrentLoadPercentage,
      totalMemory,
      freeMemory,
      usedMemory,
      activeMemory,
      latency,
      currentMicroservice,
      totalNumProcesses,
      numBlockedProcesses,
      numRunningProcesses,
      numSleepingProcesses;
      
    currentMicroservice = userInputMSName;

    client.query(
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
      latency float DEFAULT 0.0
    )`,
      (err, results) => {
        if (err) {
          throw err;
        }
      }
    );
    setInterval(() => {
      si.cpuCurrentspeed()
        .then(data => {
          cpuCurrentSpeed = data.avg;
        })
        .catch(err => {
          throw err;
        });

      si.cpuTemperature()
        .then(data => {
          cpuTemperature = data.main;
        })
        .catch(err => {
          throw err;
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
          throw err;
        });

      si.processes()
        .then(data => {
          totalNumProcesses = data.all;
          numBlockedProcesses = data.blocked;
          numRunningProcesses = data.running;
          numSleepingProcesses = data.sleeping;
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

      let queryString = `INSERT INTO healthInfo(
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
       latency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

      let values = [
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
      });
    }, 1000);
  };

module.exports = chronos;
