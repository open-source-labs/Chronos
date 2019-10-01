const pg = require('pg');
const si = require('systeminformation');
const pool = require('./sqlDB.js')

const chronos = {};

chronos.microCom = userInputMSName => {
  return function(req, res, next) {
    pool.query(
      `CREATE TABLE IF NOT EXISTS communications(
        id serial PRIMARY KEY,
        currentMicroservice varchar(500) NOT NULL,
        targetedEndpoint varchar(500) NOT NULL,
        reqType varchar(500),
        timeSent timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,
       (err, results) => {
        if (err) {
          throw err
        }
      }
    )

    let currentMicroservice = userInputMSName
    let targetedEndpoint = req.originalUrl
    let reqType = req.method

    values = [currentMicroservice, targetedEndpoint, reqType]

    let queryString = `INSERT INTO communications(currentMicroservice, targetedEndpoint, reqType) VALUES ($1, $2, $3)`

    pool.query(queryString, values, (err, result) => {
      if (err) {
        throw err
      }
    })
    next()
  }
},

chronos.microHealth = userInputMSName => {
  
  let cpuCurrentSpeed, cpuTemperature, totalMemory, freeMemory, usedMemory, activeMemory, latency;
  let currentMicroservice, totalNumProcesses, numBlockedProcesses, numRunningProcesses, numSleepingProcesses;
  currentMicroservice = userInputMSName;
  pool.query(
    `CREATE TABLE IF NOT EXISTS healthInfo (
      id SERIAL PRIMARY KEY NOT NULL,
      time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      currentMicroservice varchar(500) NOT NULL,
      cpuCurrentSpeed float NOT NULL,
      cpuTemperature integer NOT NULL,
      totalMemory real NOT NULL,
      freeMemory real NOT NULL,
      usedMemory real NOT NULL,
      activeMemory real NOT NULL,
      totalNumProcesses real NOT NULL,
      numRunningProcesses real NOT NULL,
      numBlockedProcesses real NOT NULL,
      numSleepingProcesses real NOT NULL,
      latency float NOT NULL
    )`,
    (err, results) => {
      if (err) {
        throw err
      } 
    }
  )
  setInterval(() => {
  
    si.cpuCurrentspeed()
      .then(data => {
        cpuCurrentSpeed = data.avg;
      })
      .catch(err => {
        throw err
      });

    si.cpuTemperature()
      .then(data => {
        cpuTemperature = data.main;
      })
      .catch(err => {
        throw err
      });

    si.mem()
      .then(data => {
        totalMemory = data.total;
        freeMemory = data.free;
        usedMemory = data.used;
        activeMemory = data.active;
      })
      .catch(err => {
        throw err
      });

    si.processes()
      .then(data => {
        totalNumProcesses = data.all;
        numBlockedProcesses = data.blocked;
        numRunningProcesses = data.running;
        numSleepingProcesses = data.sleeping;
      })
      .catch(err => {
        throw err
      });

    si.inetLatency()
      .then(data => {
        latency = data;
      })
      .catch(err => {
        throw err
      });

      let queryString = `INSERT INTO healthInfo(
       currentMicroservice,
       cpuCurrentSpeed,
       cpuTemperature,
       totalMemory,
       freeMemory,
       usedMemory,
       activeMemory,
       totalNumProcesses,
       numRunningProcesses,
       numBlockedProcesses,
       numSleepingProcesses,
       latency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

      let values = [
        currentMicroservice, 
        cpuCurrentSpeed, 
        cpuTemperature, 
        totalMemory, 
        freeMemory,
        usedMemory,
        activeMemory,
        totalNumProcesses,
        numRunningProcesses,
        numBlockedProcesses,
        numSleepingProcesses,
        latency]

      pool.query(queryString, values, (err, results) => {
        if (err) {
          throw err
        } 
      })    
  }, 1000);
}

module.exports = chronos;
