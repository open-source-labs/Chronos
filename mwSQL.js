// NPM package that gathers health information
const si = require('systeminformation');
const chronos = {};

// queryObj determines the setInterval needed for microHealth based on queryFreq parameter provided by user
let queryObj = {
  s: 1000, // 1000 milliseconds per second
  m: 60000, // 1000 milliseconds * 60 seconds
  h: 3600000, // 60 seconds * 60 minutes per hour * 1000 milliseconds per second
  d: 86400000, // 60 sec. * 60 min * 1000 ms per sec * 24 hours per day
  w: 604800000, // 60 sec/min * 60 min/hr * 1000 ms/sec * 24 hours/day * 7 days per week
}

//microCom 
chronos.microCom = (userOwnedDB, userInputMSName, req, res, next) => {
  // create connection to user owned database
  // we're using PostgreSQL and need to require pg
  const { Client } = require("pg");
  // grabbed from user input
  const uri = userOwnedDB;

  // creates a new instance of client
  const client = new Client({
    connectionString: uri
  })

  // connects to DB, else throws error
  client.connect((err, client, release) => {
    if (err) {
      throw new Error("Issue connecting to db");
    }
  })

  // query created DB and create table if it doesn't already exist and create the columns. Throws error if needed. 
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
    //user-input name for current microservice
    let currentMicroservice = userInputMSName;
    //What was our endpoint? Grabbed from request object
    let targetedEndpoint = req.originalUrl;
    //Type of request. Grabbed from request object
    let reqType = req.method;

    let queryString = `INSERT INTO communications(currentMicroservice, targetedEndpoint, reqType, resStatus, resMessage) VALUES ($1, $2, $3, $4, $5)`;

    // Waits for response to finish before pushing information into database
    res.on('finish', () => {
      //Grabs status code from response object
      resStatus = res.statusCode;
      //Grabs status message from response object
      resMessage = res.statusMessage;
      values = [
        currentMicroservice,
        targetedEndpoint,
        reqType,
        resStatus,
        resMessage
      ];
      //Creates query to insert values into table. Throws error if error occurs    
      client.query(queryString, values, (err, result) => {
        if (err) {
          throw err;
        }
      })
    })
    next();
  }
},
  //microHealth
  chronos.microHealth = (userOwnedDB, userInputMSName, queryFreq) => {
    // create connection to user owned database
    // we're using PostgreSQL and need to require pg
    const { Client } = require("pg");
    // grabbed from user input
    const uri = userOwnedDB;

    // creates a new instance of client
    const client = new Client({
      connectionString: uri
    });
    // connects to DB, else throws error
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

    //grabbed from userInput
    currentMicroservice = userInputMSName;

    // query created DB and create table if it doesn't already exist and create the columns. Throws error if needed.
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
    //uses setInterval to regularly query user's microservices as needed
    setInterval(() => {
      //microservice health queries from system information npm documentation
      //returns promise that needs to be resolved or rejected before info can 
      //be grabbed and saved to created variables
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

      //Creates query to insert values into table. Throws error if error occurs
      client.query(queryString, values, (err, results) => {
        if (err) {
          throw err;
        }
      });
    }, queryObj[queryFreq]);
  };

module.exports = chronos;