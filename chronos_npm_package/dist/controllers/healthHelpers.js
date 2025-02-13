// // import * as si from 'systeminformation';
// // const healthHelpers = {};
// // /**
// //  * This object contains all systeminformation methods,
// //  * metric names, and corresponding data points
// //  */
// // const collectedMetrics = {
// //   cpu: {
// //     speed_in_GHz: 'speed',
// //     speedMax_in_GHz: 'speedMax',
// //     num_of_cores: 'cores',
// //     num_of_processors: 'processors',
// //     'cache.l1d in bytes': 'cache.l1d',
// //     'cache.l1i in bytes': 'cache.l1i',
// //     'cache.l2 in bytes': 'cache.l2',
// //     'cache.l3 in bytes': 'cache.l3',
// //   },
// //   cpuCurrentSpeed: {
// //     average_CPU_speed_in_GHz: 'avg',
// //     minimum_CPU_speed_in_GHz: 'min',
// //     maximum_CPU_speed_in_GHz: 'max',
// //   },
// //   cpuTemperature: {
// //     average_temperature: 'main',
// //     max_temperature: 'max',
// //   },
// //   currentLoad: {
// //     average_CPU_load_percent: 'avg',
// //     current_CPU_load_percent: 'currentLoad',
// //     current_CPU_load_user_percent: 'currentLoadUser',
// //     current_CPU_load__system_percent: 'currentLoadSystem',
// //     current_CPU_load_nice_percent: 'currentLoadNice',
// //     current_CPU_load_idle_percent: 'currentLoadIdle',
// //     current_CPU_load_raw_ticks: 'rawCurrentLoad',
// //   },
// //   mem: {
// //     totalmemory_in_bytes: 'total',
// //     freememory_in_bytes: 'free',
// //     usedmemory_in_bytes: 'used',
// //     activememory_in_bytes: 'active',
// //     buffers_plus_cache_in_bytes: 'buffcache',
// //     available_memory: 'available',
// //   },
// //   processes: {
// //     totalprocesses: 'all',
// //     blockedprocesses: 'blocked',
// //     runningprocesses: 'running',
// //     sleepingprocesses: 'sleeping',
// //   },
// //   inetLatency: 'all data collected',
// // };
// // /**
// //  * collectHealthData scrapes metrics for microservices
// //  * @returns Promise array with each metric in an object
// //  */
// // healthHelpers.collectHealthData = async() => {
// //   const healthDataCollection = [];
// //   const time = Date.now();
// //   /** obtains core CPU metrics and creates and pushes object with
// //    *  metric name and value to the healthDataCollection array
// //    */
// //   await si.cpu()
// //     .then(data => {
// //       // console.log(data)
// //       const siMethodName = 'cpu';
// //       for (let metricName in collectedMetrics[siMethodName]) {
// //         healthDataCollection.push({
// //           metric: metricName,
// //           value: data[collectedMetrics[siMethodName][metricName]],
// //           category: 'CPU',
// //           time,
// //         });
// //       }
// //       // console.log('CPU HEALTH METRICS',healthDataCollection)
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /** obtains CPU speed metrics and creates and pushes object with
// //    *  metric name and value to the healthDataCollection array
// //    */
// //   await si.cpuCurrentSpeed()
// //     .then(data => {
// //       const siMethodName = 'cpuCurrentSpeed';
// //       for (let metricName in collectedMetrics[siMethodName]) {
// //         healthDataCollection.push({
// //           metric: metricName,
// //           value: data[collectedMetrics[siMethodName][metricName]],
// //           category: 'CPU',
// //           time,
// //         });
// //       }
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /** obtains CPU temperature metrics and creates and pushes object with
// //    *  metric name and value to the healthDataCollection array
// //    */
// //   await si.cpuTemperature()
// //     .then(data => {
// //       const siMethodName = 'cpuTemperature';
// //       for (let metricName in collectedMetrics[siMethodName]) {
// //         healthDataCollection.push({
// //           metric: metricName,
// //           value: data[collectedMetrics[siMethodName][metricName]],
// //           category: 'CPU',
// //           time,
// //         });
// //       }
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /**
// //    * obtains metrics relating to current load and creates and pushes object with
// //    * metric name and value to the healthDataCollection array
// //    */
// //   await si.currentLoad()
// //     .then(data => {
// //       const siMethodName = 'currentLoad';
// //       for (let metricName in collectedMetrics[siMethodName]) {
// //         healthDataCollection.push({
// //           metric: metricName,
// //           value: data[collectedMetrics[siMethodName][metricName]],
// //           category: 'CPU',
// //           time,
// //         });
// //       }
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /**
// //    * obtains metrics relating to memory and creates and pushes object with
// //    * metric name and value to the healthDataCollection array
// //    */
// //   await si.mem()
// //     .then(data => {
// //       const siMethodName = 'mem';
// //       for (let metricName in collectedMetrics[siMethodName]) {
// //         healthDataCollection.push({
// //           metric: metricName,
// //           value: data[collectedMetrics[siMethodName][metricName]],
// //           category: 'Memory',
// //           time,
// //         });
// //       }
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /** obtains metrics relating to current processes and creates and pushes object with
// //    *  metric name and value to the healthDataCollection array
// //    */
// //   await si.processes()
// //     .then(data => {
// //       const siMethodName = 'processes';
// //       for (let metricName in collectedMetrics[siMethodName]) {
// //         healthDataCollection.push({
// //           metric: metricName,
// //           value: data[collectedMetrics[siMethodName][metricName]],
// //           category: 'Processes',
// //           time,
// //         });
// //       }
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /** obtains latency and creates and pushes object with
// //    *  metric name and value to the healthDataCollection array
// //    */
// //   await si.inetLatency()
// //     .then(data => {
// //       healthDataCollection.push({
// //         metric: 'latency',
// //         value: data,
// //         category: 'Latency',
// //         time,
// //       });
// //     })
// //     .catch(err => {
// //       if (err) {
// //         throw err;
// //       }
// //     });
// //   /** Return a promise that resolves to an array of all of the data points
// //    * and removes any empty strings, NaN, or "NaN" from values prevent database errors
// //    */
// //   return Promise.all(healthDataCollection).then(array => {
// //     // console.log("PROMISE ARRAY",array)
// //     return array.filter(metric => {
// //       if (isNaN(metric.value) || metric.value === 'NaN' || metric.value === '' || metric.value === null) return false;
// //       else return true;
// //     })
// //   }
// //   );
// // };
// // export default healthHelpers;
// import * as si from 'systeminformation';
// // Define an interface for the metric objects
// interface HealthMetric {
//   metric: string;
//   value: number;
//   category: string;
//   time: number;
// }
// // Create a helpers object. You could also define an interface for it if desired.
// const healthHelpers: { collectHealthData?: () => Promise<HealthMetric[]> } = {};
// /**
//  * This object contains all systeminformation methods,
//  * metric names, and corresponding data points
//  */
// const collectedMetrics = {
//   cpu: {
//     speed_in_GHz: 'speed',
//     speedMax_in_GHz: 'speedMax',
//     num_of_cores: 'cores',
//     num_of_processors: 'processors',
//     'cache.l1d in bytes': 'cache.l1d',
//     'cache.l1i in bytes': 'cache.l1i',
//     'cache.l2 in bytes': 'cache.l2',
//     'cache.l3 in bytes': 'cache.l3',
//   },
//   cpuCurrentSpeed: {
//     average_CPU_speed_in_GHz: 'avg',
//     minimum_CPU_speed_in_GHz: 'min',
//     maximum_CPU_speed_in_GHz: 'max',
//   },
//   cpuTemperature: {
//     average_temperature: 'main',
//     max_temperature: 'max',
//   },
//   currentLoad: {
//     average_CPU_load_percent: 'avg',
//     current_CPU_load_percent: 'currentLoad',
//     current_CPU_load_user_percent: 'currentLoadUser',
//     current_CPU_load__system_percent: 'currentLoadSystem',
//     current_CPU_load_nice_percent: 'currentLoadNice',
//     current_CPU_load_idle_percent: 'currentLoadIdle',
//     current_CPU_load_raw_ticks: 'rawCurrentLoad',
//   },
//   mem: {
//     totalmemory_in_bytes: 'total',
//     freememory_in_bytes: 'free',
//     usedmemory_in_bytes: 'used',
//     activememory_in_bytes: 'active',
//     buffers_plus_cache_in_bytes: 'buffcache',
//     available_memory: 'available',
//   },
//   processes: {
//     totalprocesses: 'all',
//     blockedprocesses: 'blocked',
//     runningprocesses: 'running',
//     sleepingprocesses: 'sleeping',
//   },
//   inetLatency: 'all data collected',
// };
// /**
//  * collectHealthData scrapes metrics for microservices
//  * @returns Promise array with each metric in an object
//  */
// healthHelpers.collectHealthData = async (): Promise<HealthMetric[]> => {
//   // Annotate the array so TypeScript knows what it contains
//   const healthDataCollection: HealthMetric[] = [];
//   const time = Date.now();
//   // Obtain core CPU metrics
//   await si.cpu()
//     .then(data => {
//       const siMethodName = 'cpu';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Obtain CPU speed metrics
//   await si.cpuCurrentSpeed()
//     .then(data => {
//       const siMethodName = 'cpuCurrentSpeed';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Obtain CPU temperature metrics
//   await si.cpuTemperature()
//     .then(data => {
//       const siMethodName = 'cpuTemperature';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Obtain current load metrics
//   await si.currentLoad()
//     .then(data => {
//       const siMethodName = 'currentLoad';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Obtain memory metrics
//   await si.mem()
//     .then(data => {
//       const siMethodName = 'mem';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'Memory',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Obtain process metrics
//   await si.processes()
//     .then(data => {
//       const siMethodName = 'processes';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'Processes',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Obtain latency metric
//   await si.inetLatency()
//     .then(data => {
//       healthDataCollection.push({
//         metric: 'latency',
//         value: data,
//         category: 'Latency',
//         time,
//       });
//     })
//     .catch(err => {
//       if (err) {
//         throw err;
//       }
//     });
//   // Return the filtered collection. Since all elements are objects,
//   // Promise.all isn’t necessary here (unless you had promises inside the array),
//   // but it works fine.
//   return Promise.all(healthDataCollection).then(array =>
//     array.filter(metric => {
//       // Remove any metrics with invalid values
//       if (isNaN(metric.value) || metric.value === 'NaN' || metric.value === '' || metric.value === null) {
//         return false;
//       }
//       return true;
//     })
//   );
// };
// export default healthHelpers;
// import * as si from 'systeminformation';
// // Update the HealthMetric interface to allow value to be a number, string, or null.
// interface HealthMetric {
//   metric: string;
//   value: number | string | null;
//   category: string;
//   time: number;
// }
// // Create the helpers object.
// const healthHelpers: { collectHealthData?: () => Promise<HealthMetric[]> } = {};
// /**
//  * This object contains all systeminformation methods,
//  * metric names, and corresponding data points.
//  */
// const collectedMetrics = {
//   cpu: {
//     speed_in_GHz: 'speed',
//     speedMax_in_GHz: 'speedMax',
//     num_of_cores: 'cores',
//     num_of_processors: 'processors',
//     'cache.l1d in bytes': 'cache.l1d',
//     'cache.l1i in bytes': 'cache.l1i',
//     'cache.l2 in bytes': 'cache.l2',
//     'cache.l3 in bytes': 'cache.l3',
//   },
//   cpuCurrentSpeed: {
//     average_CPU_speed_in_GHz: 'avg',
//     minimum_CPU_speed_in_GHz: 'min',
//     maximum_CPU_speed_in_GHz: 'max',
//   },
//   cpuTemperature: {
//     average_temperature: 'main',
//     max_temperature: 'max',
//   },
//   currentLoad: {
//     average_CPU_load_percent: 'avg',
//     current_CPU_load_percent: 'currentLoad',
//     current_CPU_load_user_percent: 'currentLoadUser',
//     current_CPU_load__system_percent: 'currentLoadSystem',
//     current_CPU_load_nice_percent: 'currentLoadNice',
//     current_CPU_load_idle_percent: 'currentLoadIdle',
//     current_CPU_load_raw_ticks: 'rawCurrentLoad',
//   },
//   mem: {
//     totalmemory_in_bytes: 'total',
//     freememory_in_bytes: 'free',
//     usedmemory_in_bytes: 'used',
//     activememory_in_bytes: 'active',
//     buffers_plus_cache_in_bytes: 'buffcache',
//     available_memory: 'available',
//   },
//   processes: {
//     totalprocesses: 'all',
//     blockedprocesses: 'blocked',
//     runningprocesses: 'running',
//     sleepingprocesses: 'sleeping',
//   },
//   inetLatency: 'all data collected',
// };
// /**
//  * collectHealthData scrapes metrics for microservices.
//  * @returns Promise that resolves to an array of health metric objects.
//  */
// healthHelpers.collectHealthData = async (): Promise<HealthMetric[]> => {
//   const healthDataCollection: HealthMetric[] = [];
//   const time = Date.now();
//   // Obtain core CPU metrics
//   await si.cpu()
//     .then(data => {
//       const siMethodName = 'cpu';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Obtain CPU speed metrics
//   await si.cpuCurrentSpeed()
//     .then(data => {
//       const siMethodName = 'cpuCurrentSpeed';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Obtain CPU temperature metrics
//   await si.cpuTemperature()
//     .then(data => {
//       const siMethodName = 'cpuTemperature';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Obtain current load metrics
//   await si.currentLoad()
//     .then(data => {
//       const siMethodName = 'currentLoad';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'CPU',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Obtain memory metrics
//   await si.mem()
//     .then(data => {
//       const siMethodName = 'mem';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'Memory',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Obtain process metrics
//   await si.processes()
//     .then(data => {
//       const siMethodName = 'processes';
//       for (let metricName in collectedMetrics[siMethodName]) {
//         healthDataCollection.push({
//           metric: metricName,
//           value: data[collectedMetrics[siMethodName][metricName]],
//           category: 'Processes',
//           time,
//         });
//       }
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Obtain latency metric
//   await si.inetLatency()
//     .then(data => {
//       healthDataCollection.push({
//         metric: 'latency',
//         value: data,
//         category: 'Latency',
//         time,
//       });
//     })
//     .catch(err => {
//       if (err) throw err;
//     });
//   // Return the filtered collection.
//   // For each metric, if value is null or an empty string, or if converting it to a number results in NaN,
//   // filter it out.
//   return Promise.all(healthDataCollection).then(array =>
//     array.filter(metric => {
//       if (metric.value === null || metric.value === '') {
//         return false;
//       }
//       const numericValue =
//         typeof metric.value === 'number'
//           ? metric.value
//           : Number(metric.value);
//       return !isNaN(numericValue);
//     })
//   );
// };
// export default healthHelpers;
import * as si from 'systeminformation';
/**
 * This object contains all systeminformation methods,
 * metric names, and corresponding data points.
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
 * The `healthHelpers` object with a guaranteed `.collectHealthData()` method.
 */
const healthHelpers = {
    /**
     * Scrapes metrics for microservices.
     * @returns Promise that resolves to an array of health metric objects.
     */
    async collectHealthData() {
        const healthDataCollection = [];
        const time = Date.now();
        // Obtain core CPU metrics
        await si.cpu()
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
            if (err)
                throw err;
        });
        // Obtain CPU speed metrics
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
            if (err)
                throw err;
        });
        // Obtain CPU temperature metrics
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
            if (err)
                throw err;
        });
        // Obtain current load metrics
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
            if (err)
                throw err;
        });
        // Obtain memory metrics
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
            if (err)
                throw err;
        });
        // Obtain process metrics
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
            if (err)
                throw err;
        });
        // Obtain latency metric
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
            if (err)
                throw err;
        });
        // Return the filtered collection.
        // For each metric, filter out null/empty values or NaN after converting to number.
        return Promise.all(healthDataCollection).then(array => array.filter(metric => {
            if (metric.value === null || metric.value === '') {
                return false;
            }
            const numericValue = typeof metric.value === 'number' ? metric.value : Number(metric.value);
            return !isNaN(numericValue);
        }));
    },
};
export default healthHelpers;
//# sourceMappingURL=healthHelpers.js.map