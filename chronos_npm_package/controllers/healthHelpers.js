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
      .cpu()
      .then(data => ({
        speed_in_GHz: data.speed,
        speedMax_in_GHz: data.speedMax,
        num_of_cores: data.cores,
        num_of_processors: data.processors,
        'cache.l1d in bytes': data.cache.l1d,
        'cache.l1i in bytes': data.cache.l1i,
        'cache.l2 in bytes': data.cache.l2,
        'cache.l3 in bytes': data.cache.l3,
      }))
      .then(data => {
        const cpuMetrics = [];
        for (const metric in data) {
          cpuMetrics.push({
            metric,
            value: data[metric],
            category: 'CPU',
            time,
          });
        }
        return cpuMetrics;
      })
      .catch(err => {
        if (err) {
          throw err;
        }
      })
  );
  promises.push(
    si
      .cpuCurrentspeed()
      .then(data => ({
        average_CPU_speed_in_GHz: data.avg,
        minimum_CPU_speed_in_GHz: data.min,
        maximum_CPU_speed_in_GHz: data.max,
      }))
      .then(data => {
        const cpuSpeedMetrics = [];
        for (const metric in data) {
          cpuSpeedMetrics.push({
            metric,
            value: data[metric],
            category: 'CPU',
            time,
          });
        }
        return cpuSpeedMetrics;
      })
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
        average_temperature: data.main,
        max_temperature: data.max,
      }))
      .then(data => {
        const cpuTemperatureMetrics = [];
        for (const metric in data) {
          cpuTemperatureMetrics.push({
            metric,
            value: data[metric],
            category: 'CPU',
            time,
          });
        }
        return cpuTemperatureMetrics;
      })
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
        average_CPU_load_percent: data.avg,
        current_CPU_load_percent: data.currentLoad,
        current_CPU_load_user_percent: data.currentLoadUser,
        current_CPU_load__system_percent: data.currentLoadSystem,
        current_CPU_load_nice_percent: data.currentLoadNice,
        current_CPU_load_idle_percent: data.currentLoadIdle,
        current_CPU_load_raw_ticks: data.rawCurrentLoad,
      }))
      .then(data => {
        const cpuLoadMetrics = [];
        for (const metric in data) {
          cpuLoadMetrics.push({
            metric,
            value: data[metric],
            category: 'CPU',
            time,
          });
        }
        return cpuLoadMetrics;
      })
      .catch(err => {
        throw err;
      })
  );

  promises.push(
    si
      .mem()
      .then(data => ({
        totalmemory_in_bytes: data.total,
        freememory_in_bytes: data.free,
        usedmemory_in_bytes: data.used,
        activememory_in_bytes: data.active,
        buffers_plus_cache_in_bytes: data.buffcache,
        available_memory: data.available,
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
