import * as si from 'systeminformation';

/**
 Defines the structure of a health metric**

 */
interface HealthMetric {
  metric: string; // Name of the metric (i.e, 'CPU Load')
  value: number | string | null; // The actual measured value (can be a number or string, or null if unavailable)
  category: string; // The general category (i.e, 'CPU', 'Memory', 'Processes')
  time: number; // Timestamp when the metric was recorded
}

/**
 Mapping of systeminformation methods to specific metrics**
 * - Each property in this object corresponds to a method in `systeminformation`.
 * - Inside each category (e.g., `cpu`, `mem`), we map human-friendly metric names to the `systeminformation` fields.
 * - This mapping allows us to **avoid hardcoding metric keys later**.
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
    current_CPU_load_system_percent: 'currentLoadSystem',
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
 healthHelpers: A module for collecting system health metrics**
 * - Uses async/await to ensure non-blocking data collection.
 */
const healthHelpers = {
  /**
   Gathers system health metrics asynchronously**
   * - Fetches CPU, memory, and process data using `systeminformation`.
   * - Returns a filtered list of valid health metric objects.
   * 
   * @returns A Promise resolving to an array of `HealthMetric` objects.
   */
  async collectHealthData(): Promise<HealthMetric[]> {
    const healthDataCollection: HealthMetric[] = [];
    const time = Date.now(); // Capture timestamp for all metrics

    //  **CPU Metrics**
    await si.cpu()
      .then(data => {
        const siMethodName = 'cpu';
        for (let metricName in collectedMetrics[siMethodName]) {
          healthDataCollection.push({
            metric: metricName,
            value: data[collectedMetrics[siMethodName][metricName]], // Map to `systeminformation` fields
            category: 'CPU',
            time,
          });
        }
      })
      .catch(err => {
        if (err) throw err;
      });

    //  **CPU Speed Metrics**
    await si.cpuCurrentSpeed()
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
        if (err) throw err;
      });

    //  **CPU Temperature Metrics**
    await si.cpuTemperature()
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
        if (err) throw err;
      });

    //  **CPU Load Metrics**
    await si.currentLoad()
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
        if (err) throw err;
      });

    //  **Memory Metrics**
    await si.mem()
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
        if (err) throw err;
      });

    // **Process Metrics**
    await si.processes()
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
        if (err) throw err;
      });

    //  **Network Latency Metrics**
    await si.inetLatency()
      .then(data => {
        healthDataCollection.push({
          metric: 'latency',
          value: data,
          category: 'Latency',
          time,
        });
      })
      .catch(err => {
        if (err) throw err;
      });

    // **Filter out invalid values before returning the final array**
    return healthDataCollection.filter(metric => {
      if (metric.value === null || metric.value === '') return false;
      const numericValue = typeof metric.value === 'number' ? metric.value : Number(metric.value);
      return !isNaN(numericValue);
    });
  },
};

export default healthHelpers;
