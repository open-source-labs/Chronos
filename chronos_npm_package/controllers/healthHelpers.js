const si = require('systeminformation');

const healthHelpers = {};

/*
This method returns an promise that resolves to an array of
si data points.
*/

healthHelpers.collectHealthData = () => {
  // Create an array to hold the promises returned by si
  const promises = [];
  // for use with every object
  const time = Date.now();
  // Fill the array of promises
  promises.push(
    si
      .cpuCurrentspeed()
      .then(data => ({
        metric: 'cpuspeed',
        value: data.avg,
        category: 'CPU',
        time,
      }))
      .catch(err => {
        if (err) {
          throw err;
        }
      })
  );

  promises.push(
    si
      .cpuTemperature()
      .then(data => ({
        metric: 'cputemp',
        value: data.main,
        category: 'CPU',
        time,
      }))
      .catch(err => {
        if (err) {
          throw err;
        }
      })
  );

  promises.push(
    si
      .currentLoad()
      .then(data => ({
        metric: 'cpuloadpercent',
        value: data.currentload,
        category: 'CPU',
        time,
      }))
      .catch(err => {
        throw err;
      })
  );

  promises.push(
    si
      .mem()
      .then(data => ({
        totalmemory: data.total,
        freememory: data.free,
        usedmemory: data.used,
        activememory: data.active,
      }))
      .then(data => {
        const memMetrics = [];
        for (const metric in data) {
          memMetrics.push({
            metric,
            value: data[metric],
            category: 'Memory',
            time,
          });
        }
        return memMetrics;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      })
  );

  promises.push(
    si
      .processes()
      .then(data => ({
        totalprocesses: data.all,
        blockedprocesses: data.blocked,
        runningprocesses: data.running,
        sleepingprocesses: data.sleeping,
      }))
      .then(data => {
        const processMetrics = [];
        for (const metric in data) {
          processMetrics.push({
            metric,
            value: data[metric],
            category: 'Processes',
            time,
          });
        }
        return processMetrics;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      })
  );

  promises.push(
    si
      .inetLatency()
      .then(data => ({
        metric: 'latency',
        value: data,
        category: 'Latency',
        time,
      }))
      .catch(err => {
        if (err) {
          throw err;
        }
      })
  );
  // Return an promise that resolves to an array of all of the data points unnested
  return Promise.all(promises).then(array => array.flat());
};

module.exports = healthHelpers;
