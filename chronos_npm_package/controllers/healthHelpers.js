const si = require('systeminformation');

const healthHelpers = {};

/**
 * This object contains all systeminformation methods,
 * metric names, and corresponding data points
 */

const collectedMetrics = {
  cpu: {
    speed_in_GHz: 'speed',
    speedMax_in_GHz: 'speedMax',
    num_of_cores: 'cores',
    num_of_processors: 'processors',
    'cache.l1d in bytes': 'cache.l1d',
    'cache.l1i in bytes': 'cache.l1i',
    'cache.l2 in bytes': 'cache.l2',
    'cache.l3 in bytes': 'cache.l3',
  },
  cpuCurrentSpeed: {
    average_CPU_speed_in_GHz: 'avg',
    minimum_CPU_speed_in_GHz: 'min',
    maximum_CPU_speed_in_GHz: 'max',
  },
  cpuTemperature: {
    average_temperature: 'main',
    max_temperature: 'max',
  },
  currentLoad: {
    average_CPU_load_percent: 'avg',
    current_CPU_load_percent: 'currentLoad',
    current_CPU_load_user_percent: 'currentLoadUser',
    current_CPU_load__system_percent: 'currentLoadSystem',
    current_CPU_load_nice_percent: 'currentLoadNice',
    current_CPU_load_idle_percent: 'currentLoadIdle',
    current_CPU_load_raw_ticks: 'rawCurrentLoad',
  },
  mem: {
    totalmemory_in_bytes: 'total',
    freememory_in_bytes: 'free',
    usedmemory_in_bytes: 'used',
    activememory_in_bytes: 'active',
    buffers_plus_cache_in_bytes: 'buffcache',
    available_memory: 'available',
  },
  processes: {
    totalprocesses: 'all',
    blockedprocesses: 'blocked',
    runningprocesses: 'running',
    sleepingprocesses: 'sleeping',
  },
  inetLatency: 'all data collected',
};

/**
 * collectHealthData scrapes metrics for microservices
 * @returns Promise array with each metric in an object
 */

healthHelpers.collectHealthData = () => {
  const healthDataCollection = [];
  const time = Date.now();

  /** obtains core CPU metrics and creates and pushes object with
   *  metric name and value to the healthDataCollection array
   */
  si.cpu()
    .then(data => {
      const siMethodName = 'cpu';
      for (let metricName in collectedMetrics[siMethodName]) {
        healthDataCollection.push({
          metric: metricName,
          value: data[collectedMetrics[siMethodName][metricName]],
          category: 'CPU',
          time,
        });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /** obtains CPU speed metrics and creates and pushes object with
   *  metric name and value to the healthDataCollection array
   */
  si.cpuCurrentSpeed()
    .then(data => {
      const siMethodName = 'cpuCurrentSpeed';
      for (let metricName in collectedMetrics[siMethodName]) {
        healthDataCollection.push({
          metric: metricName,
          value: data[collectedMetrics[siMethodName][metricName]],
          category: 'CPU',
          time,
        });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /** obtains CPU temperature metrics and creates and pushes object with
   *  metric name and value to the healthDataCollection array
   */

  si.cpuTemperature()
    .then(data => {
      const siMethodName = 'cpuTemperature';
      for (let metricName in collectedMetrics[siMethodName]) {
        healthDataCollection.push({
          metric: metricName,
          value: data[collectedMetrics[siMethodName][metricName]],
          category: 'CPU',
          time,
        });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /**
   * obtains metrics relating to current load and creates and pushes object with
   * metric name and value to the healthDataCollection array
   */
  si.currentLoad()
    .then(data => {
      const siMethodName = 'currentLoad';
      for (let metricName in collectedMetrics[siMethodName]) {
        healthDataCollection.push({
          metric: metricName,
          value: data[collectedMetrics[siMethodName][metricName]],
          category: 'CPU',
          time,
        });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /**
   * obtains metrics relating to memory and creates and pushes object with
   * metric name and value to the healthDataCollection array
   */
  si.mem()
    .then(data => {
      const siMethodName = 'mem';
      for (let metricName in collectedMetrics[siMethodName]) {
        healthDataCollection.push({
          metric: metricName,
          value: data[collectedMetrics[siMethodName][metricName]],
          category: 'Memory',
          time,
        });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /** obtains metrics relating to current processes and creates and pushes object with
   *  metric name and value to the healthDataCollection array
   */
  si.processes()
    .then(data => {
      const siMethodName = 'processes';
      for (let metricName in collectedMetrics[siMethodName]) {
        healthDataCollection.push({
          metric: metricName,
          value: data[collectedMetrics[siMethodName][metricName]],
          category: 'Processes',
          time,
        });
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /** obtains latency and creates and pushes object with
   *  metric name and value to the healthDataCollection array
   */
  si.inetLatency()
    .then(data => {
      const siMethodName = 'inetLatency';
      healthDataCollection.push({
        metric: 'latency',
        value: data,
        category: 'Latency',
        time,
      });
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });

  /** Return a promise that resolves to an array of all of the data points
   * and removes any empty strings, NaN, or "NaN" from values prevent database errors
   */
  return Promise.all(healthDataCollection).then(array =>
    array.filter(metric => {
      if (isNaN(metric.value) || metric.value === 'NaN' || metric.value === '') return false;
      else return true;
    })
  );
};

module.exports = healthHelpers;
