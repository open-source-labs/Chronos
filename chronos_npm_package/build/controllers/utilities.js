"use strict";
// // const axios = require('axios').default;
// import axios from 'axios';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { createGrafanaPanelObject, updateGrafanaPanelObject }from './GrafanaPanel';
// /**
//  * User Config object {
//   microservice: string - Name of the microservice. Will be used as a table name in the chronos's db
//   interval: number - The number of milliseconds between every collection of data
//   dockerized: boolean - Should be set to true if the service is running inside of a container
//   jmxuri: string - (optional) The address exposed by the JMX Exporter for collecting Kafka metrics
//   database: {
//     connection: should be a string and only supports 'REST' and 'gRPC'
//     type: should be a string and only supports 'MongoDB' and 'PostgreSQL'.
//     URI: should be a connection string to the database where you intend Chronos to record metrics
//   }
//   notifications: an array - optional for configuring slack or email notifications
// }
// */
// /**
//  * Helper function to validate input from user's configuration options
//  * Throws an error on input valid data types or on missing fields
//  * Sets the default interval to 5 seconds and dockerized to false
//  */
// const helpers = {
//   /** Validate all required fields exist and are valid input types */
//   validateInput: config => {
//     const out = config;
//     const {
//       microservice,
//       database,
//       interval,
//       dockerized,
//       jmxuri,
//       port,
//       mode,
//       promService,
//       promPort,
//     } = config;
//     if (!microservice || typeof microservice !== 'string') {
//       throw new Error('Invalid input "microservice": Please provide a name for your microservice');
//     }
//     if (!database.type || typeof database.type !== 'string') {
//       throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
//     }
//     if (!database.URI || typeof database.URI !== 'string') {
//       throw new Error('Invalid input "database URI": Please provide the URI to your database');
//     }
//     if (!database.connection || typeof database.connection !== 'string') {
//       throw new Error(
//         'Invalid input "database connection type: Please provide the type of connection'
//       );
//     }
//     const modeTypes = ['kafka', 'kubernetes', 'microservices', 'docker'];
//     if (!mode || !modeTypes.includes(mode)) {
//       throw new Error(
//         'You must input a mode into your chronos.config file. The mode may either be "kubernetes", "kafka", "microservice", or "docker"'
//       );
//     }
//     if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
//       throw new Error(
//         'Invalid input for "jmxuri" in chronos-config.js: Please provide the address of the JMX Exporter'
//       );
//     }
//     if (mode === 'kubernetes' || mode === 'docker') {
//       if (
//         !promService ||
//         typeof promService !== 'string' ||
//         !promPort ||
//         typeof promPort !== 'number'
//       ) {
//         throw new Error(
//           'Invalid input for promService or promPort. promPort must be number and promService must be a string'
//         );
//       }
//     }
//     if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
//       throw new Error(
//         `Invalid input "${database.type}". Chronos only supports PostgreSQL and MongoDB.`
//       );
//     }
//     if (database.connection !== 'REST' && database.connection !== 'gRPC') {
//       throw new Error(
//         `Invalid database connection "${database.connection}". Chronos only supports REST and gRPC.`
//       );
//     }
//     // Default interval to one minute
//     if (!interval || typeof interval !== 'number') config.interval = 60000;
//     // Default dockerized to false
//     if (dockerized === undefined || dockerized.constructor.name !== 'Boolean')
//       config.dockerized = false;
//     return config;
//   },
//   /**
//    * Sets up notifications depending if the user provides the options
//    * Method adds properties to the existing userConfig object with the key
//    * being the notification type and the value being the notification settings
//    */
//   addNotifications: config => {
//     const { notifications } = config;
//     //POTENTIAL BUG: notifications defaults to an empty array so it should always be truthy. I think code will fire regardless
//     if (notifications) {
//       // Current notification methods supported
//       const features = ['slack', 'email', 'sms'];
//       // Setup notifications for user
//       notifications.forEach(obj => {
//         const { type } = obj;
//         // Throw errors on unsupported notification methods
//         if (!features.includes(type)) {
//           throw new Error(`${type} is not a supported notification method for Chronos`);
//         } else {
//           config[type] = obj.settings;
//         }
//       });
//     }
//     return config;
//   },
//   /**
//    * Determines URI if the user is running kafka or kubernetes
//    * @param {*} config
//    * @returns URI for exposed port
//    */
//   getMetricsURI: config => {
//     if (config.mode === 'kafka') {
//       return config.jmxuri;
//     } else if (config.mode === 'kubernetes' || config.mode === 'docker') {
//       return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
//     } else {
//       throw new Error('Unrecognized mode');
//     }
//   },
//   /**
//    * Confirms URI provided is queryable
//    * @param {*} config
//    * @returns undefined
//    */
//   testMetricsQuery: async config => {
//     let URI = helpers.getMetricsURI(config);
//     URI += 'up';
//     try {
//       const response = await axios.get(URI);
//       if (response.status !== 200) console.error('Invalid response from metrics server:', URI, response.status, response.data);
//       else console.log('Successful initial response from metrics server:', URI);
//       return response;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Unable to query metrics server: ' + URI);
//     }
//   },
//   /**
//    * Queries the kafka URI and parses response data
//    * @param {*} config
//    * @returns parsed response data
//    */
//   kafkaMetricsQuery: async config => {
//     const URI = helpers.getMetricsURI(config);
//     try {
//       const response = await axios.get(URI);
//       return helpers.extractWord(config.mode, response.data);
//     } catch (error) {
//       return console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//     }
//   },
//   /**
//    * Confirms that configuration mode is kafka and parses through data in response to an axios.get request
//    * @param {*} mode string
//    * @param {*} text object
//    * @returns object with the gathered metric, value, time gathered, and category of event
//    */
//   extractWord: (mode, text) => {
//     const res = [];
//     const arr = text.split('\n');
//     const time = Date.now();
//     const category = 'Event';
//     for (const element of arr) {
//       // Handle comments and edge cases
//       if (!element || element[0] === '#') continue;
//       if (
//         mode === 'kafka' &&
//         (element.substring(0, 3) === 'jmx' || element.substring(0, 4) === "'jmx")
//       )
//         continue;
//       const lastSpace = element.lastIndexOf(' ');
//       const metric = element.slice(0, lastSpace);
//       const value = Number(element.slice(lastSpace + 1));
//       if (!isNaN(value)) {
//         res.push({ metric, value, time, category });
//       } else {
//         console.error(
//           'The following metric is invalid and was not saved to the database:\n',
//           element
//         );
//       }
//     }
//     // console.log('Parsed Array length is: ', res.length);
//     return res;
//   },
//   /**
//    * Querys all available prometheus metrics and returns a parsed response
//    * @param {*} config
//    * @returns
//    */
//   promMetricsQuery: async config => {
//     const URI = helpers.getMetricsURI(config);
//     let query;
//     if (config.mode === 'docker') {
//       query = URI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`);
//     } else {
//       query = URI + encodeURIComponent('{__name__=~".+",container=""}');
//     }
//     try {
//       const response = await axios.get(query);
//       //console.log('promMetricsQuery line 236:', response.data.data.result);
//       return helpers.parseProm(config, response.data.data.result);
//     } catch (error) {
//       return console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//     }
//   },
//   /**
//    * Parses response from Prometheus request and returns object with
//    * @param {*} data
//    * @returns bject with the gathered metric, value, time gathered, and category of event
//    */
//   parseProm: (config, data) => {
//     const res = [];
//     const time = Date.now();
//     const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';
//     /**
//      * Opportunity for improvement: Prometheus may query metrics that have the same job + instance + metric
//      * which means they end up having the same name (see name variable).
//      * When this happens, it means that the parsedArray returned from this function
//      * will  have a different length than the metricNames length.
//      * To avoid this, Chronos currently only saves the first occurence of any particular ${name}.
//      * This can be improved in the future by distinguishing between each ${name},
//      * but be aware that if the ${name} is too long, it will be rejected by the database.
//      */
//     const names = new Set();
//     for (const info of data) {
//       let wholeName;
//       let name;
//       if (config.mode === 'docker') {
//         if (!info.metric.name) continue;
//         wholeName = info.metric['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       } else {
//         if (!info.metric.job) continue;
//         // Set the base name using the job, IP, and metric __name__
//         wholeName = info.metric.job + '/' + info.metric.instance + '/' + info.metric['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       }
//       if (names.has(name)) continue;
//       else {
//         names.add(name);
//         // Tack on the remaining key's values from the remaining metric descriptors
//         // This might result in an overly-long metric name though, so commented for now
//         // for (let field in info.metric) {
//         //     if ((field in usedCategories)) continue
//         //     name += '/' + info.metric[field];
//         // }
//         let value = info.value;
//         if (value.constructor.name === 'Array') value = info.value[1];
//         if (isNaN(value) || value === 'NaN') continue;
//         res.push({
//           metric: wholeName,
//           value: value,
//           time: time,
//           category: category,
//         })
//       }
//     }
//     console.log('is size equal?', res.length === new Set(res).size);
//     //console.log("!res is: ", res);
//     return res;
//   },
//   createGrafanaDashboard: async (
//     metric,
//     datasource,
//     graphType,
//     token
//   ) => {
//     let uid = metric.metric.replace(/.*\/.*\//g, '')
//     if (metric.metric.replace(/.*\/.*\//g, '').length >= 40) {
//       uid = metric.metric.slice(metric.metric.length - 39);
//     }
//     //console.log("uid is: ", uid)
//     //console.log("metric is: ", metric)
//     // create dashboard object boilerplate
//     const dashboard = {
//       "dashboard": {
//         "id": null,
//         "uid": uid,
//         "title": metric.metric.replace(/.*\/.*\//g, ''),
//         "tags": ["templated"],
//         "timezone": "browser",
//         "schemaVersion": 16,
//         "version": 0,
//         "refresh": "10s",
//         panels: [],
//       },
//       folderId: 0,
//       overwrite: true,
//     };
//     // push panel into dashboard object with a line for each metric in promQLQueries object
//     dashboard.dashboard.panels.push(createGrafanaPanelObject(metric, datasource, graphType));
//     try {
//       // POST request to Grafana Dashboard API to create a dashboard
//       const dashboardResponse = await axios.post(
//         'http://grafana:3000/api/dashboards/db',
//         JSON.stringify(dashboard),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token
//           },
//         }
//       );
//       // Descriptive error log for developers
//       if (dashboardResponse.status >= 400) {
//         console.log(
//           'Error with POST request to Grafana Dashboards API. In createGrafanaDashboard.'
//         );
//       } else {
//         // A simple console log to show when graphs are done being posted to Grafana.
//         console.log(`📊 Grafana graphs for the ${metric.metric.replace(/.*\/.*\//g, '')} metric are ready 📊 `);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getGrafanaDatasource: async (token) => {
//     // Fetch datasource information from grafana API.
//     // This datasource is PRECONFIGURED on launch using grafana config.
//     console.log('In utilities.getGrafanaDatasource!!!');
//     const datasourceResponse = await axios.get('http://grafana:3000/api/datasources', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token
//       },
//     });
//     // console.log('utilities.getGrafanaDatasource line 379:', datasourceResponse);
//     console.log("Successfully fetched datasource from Grafana API")
//     // Create a datasource object to be used within panels.
//     const datasource = {
//       type: datasourceResponse.data[0].type,
//       uid: datasourceResponse.data[0].uid,
//     };
//     // console.log('datasource is', datasource)
//     return datasource;
//   },
//   updateGrafanaDatasource: async (token) => {
//     // Fetch datasource information from grafana API.
//     // This datasource is PRECONFIGURED on launch using grafana config.
//     const datasourceResponse = await axios.get('http://localhost:32000/api/datasources', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': token
//       },
//     });
//     console.log("Successfully fetched datasource from Grafana API")
//     // Create a datasource object to be used within panels.
//     const datasource = {
//       type: datasourceResponse.data[0].type,
//       uid: datasourceResponse.data[0].uid,
//     };
//     console.log('datasource is', datasource)
//     return datasource;
//   },
//   updateGrafanaDashboard: async (graphType, token, metric, datasource) => {
//     let uid = metric.replace(/.*\/.*\//g, '')
//     if (metric.replace(/.*\/.*\//g, '').length >= 40) {
//       uid = metric.slice(metric.length - 39);
//     }
//     //console.log("uid is: ", uid)
//     //console.log("metric is: ", metric)
//     // create dashboard object boilerplate
//     const dashboard = {
//       "dashboard": {
//         "id": null,
//         "uid": uid,
//         "title": metric.replace(/.*\/.*\//g, ''),
//         "tags": ["templated"],
//         "timezone": "browser",
//         "schemaVersion": 16,
//         "version": 0,
//         "refresh": "10s",
//         panels: [],
//       },
//       folderId: 0,
//       overwrite: true,
//     };
//     // push panel into dashboard object with a line for each metric in promQLQueries object
//     dashboard.dashboard.panels.push(updateGrafanaPanelObject(metric, datasource, graphType));
//     try {
//       // POST request to Grafana Dashboard API to create a dashboard
//       const dashboardResponse = await axios.post(
//         'http://localhost:32000/api/dashboards/db',
//         JSON.stringify(dashboard),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token
//           },
//         }
//       );
//       //console.log("dashboardResponse is: ", dashboardResponse)
//       // Descriptive error log for developers
//       if (dashboardResponse.status >= 400) {
//         console.log(
//           'Error with POST request to Grafana Dashboards API. In updateGrafanaDashboard.'
//         );
//       } else {
//         // A simple console log to show when graphs are done being posted to Grafana.
//         console.log(`📊 Grafana graphs 📊 for the ${metric.replace(/.*\/.*\//g, '')} has been updated!!!`);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };
// // module.exports = helpers;
// export default {helpers};
// import axios from 'axios';
// // Use a default import from GrafanaPanel and destructure the needed functions.
// import GrafanaPanel from './GrafanaPanel';
// const { createGrafanaPanelObject, updateGrafanaPanelObject } = GrafanaPanel;
// // Define an interface for metric data to help TypeScript infer the type.
// interface MetricData {
//   metric: string;
//   value: number;
//   time: number;
//   category: string;
// }
// const helpers = {
//   /** Validate all required fields exist and are valid input types */
//   validateInput: config => {
//     const out = config;
//     const {
//       microservice,
//       database,
//       interval,
//       dockerized,
//       jmxuri,
//       port,
//       mode,
//       promService,
//       promPort,
//     } = config;
//     if (!microservice || typeof microservice !== 'string') {
//       throw new Error(
//         'Invalid input "microservice": Please provide a name for your microservice'
//       );
//     }
//     if (!database.type || typeof database.type !== 'string') {
//       throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
//     }
//     if (!database.URI || typeof database.URI !== 'string') {
//       throw new Error(
//         'Invalid input "database URI": Please provide the URI to your database'
//       );
//     }
//     if (!database.connection || typeof database.connection !== 'string') {
//       throw new Error(
//         'Invalid input "database connection type": Please provide the type of connection'
//       );
//     }
//     const modeTypes = ['kafka', 'kubernetes', 'microservices', 'docker'];
//     if (!mode || !modeTypes.includes(mode)) {
//       throw new Error(
//         'You must input a mode into your chronos.config file. The mode may either be "kubernetes", "kafka", "microservice", or "docker"'
//       );
//     }
//     if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
//       throw new Error(
//         'Invalid input for "jmxuri" in chronos-config.js: Please provide the address of the JMX Exporter'
//       );
//     }
//     if (mode === 'kubernetes' || mode === 'docker') {
//       if (
//         !promService ||
//         typeof promService !== 'string' ||
//         !promPort ||
//         typeof promPort !== 'number'
//       ) {
//         throw new Error(
//           'Invalid input for promService or promPort. promPort must be number and promService must be a string'
//         );
//       }
//     }
//     if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
//       throw new Error(
//         `Invalid input "${database.type}". Chronos only supports PostgreSQL and MongoDB.`
//       );
//     }
//     if (database.connection !== 'REST' && database.connection !== 'gRPC') {
//       throw new Error(
//         `Invalid database connection "${database.connection}". Chronos only supports REST and gRPC.`
//       );
//     }
//     // Default interval to one minute
//     if (!interval || typeof interval !== 'number') config.interval = 60000;
//     // Default dockerized to false
//     if (dockerized === undefined || dockerized.constructor.name !== 'Boolean')
//       config.dockerized = false;
//     return config;
//   },
//   /**
//    * Sets up notifications depending if the user provides the options.
//    * Adds properties to the userConfig object with the key being the notification type and the value being its settings.
//    */
//   addNotifications: config => {
//     const { notifications } = config;
//     if (notifications) {
//       const features = ['slack', 'email', 'sms'];
//       notifications.forEach(obj => {
//         const { type } = obj;
//         if (!features.includes(type)) {
//           throw new Error(`${type} is not a supported notification method for Chronos`);
//         } else {
//           config[type] = obj.settings;
//         }
//       });
//     }
//     return config;
//   },
//   /**
//    * Determines the URI based on the mode (kafka or kubernetes/docker)
//    */
//   getMetricsURI: config => {
//     if (config.mode === 'kafka') {
//       return config.jmxuri;
//     } else if (config.mode === 'kubernetes' || config.mode === 'docker') {
//       return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
//     } else {
//       throw new Error('Unrecognized mode');
//     }
//   },
//   /**
//    * Tests that the metrics URI is queryable.
//    */
//   testMetricsQuery: async config => {
//     let URI = helpers.getMetricsURI(config);
//     URI += 'up';
//     try {
//       const response = await axios.get(URI);
//       if (response.status !== 200)
//         console.error(
//           'Invalid response from metrics server:',
//           URI,
//           response.status,
//           response.data
//         );
//       else console.log('Successful initial response from metrics server:', URI);
//       return response;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Unable to query metrics server: ' + URI);
//     }
//   },
//   /**
//    * Queries the Kafka URI and parses response data.
//    */
//   kafkaMetricsQuery: async config => {
//     const URI = helpers.getMetricsURI(config);
//     try {
//       const response = await axios.get(URI);
//       return helpers.extractWord(config.mode, response.data);
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//     }
//   },
//   /**
//    * Parses response text from a Kafka metrics query.
//    */
//   extractWord: (mode, text) => {
//     const res: MetricData[] = []; // Explicitly typed array
//     const arr = text.split('\n');
//     const time = Date.now();
//     const category = 'Event';
//     for (const element of arr) {
//       if (!element || element[0] === '#') continue;
//       if (
//         mode === 'kafka' &&
//         (element.substring(0, 3) === 'jmx' || element.substring(0, 4) === "'jmx")
//       )
//         continue;
//       const lastSpace = element.lastIndexOf(' ');
//       const metric = element.slice(0, lastSpace);
//       const value = Number(element.slice(lastSpace + 1));
//       if (!isNaN(value)) {
//         res.push({ metric, value, time, category });
//       } else {
//         console.error(
//           'The following metric is invalid and was not saved to the database:\n',
//           element
//         );
//       }
//     }
//     return res;
//   },
//   /**
//    * Queries all available Prometheus metrics and returns parsed response data.
//    */
//   promMetricsQuery: async config => {
//     const URI = helpers.getMetricsURI(config);
//     let query;
//     if (config.mode === 'docker') {
//       query = URI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`);
//     } else {
//       query = URI + encodeURIComponent('{__name__=~".+",container=""}');
//     }
//     try {
//       const response = await axios.get(query);
//       return helpers.parseProm(config, response.data.data.result);
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//     }
//   },
//   /**
//    * Parses Prometheus query responses.
//    */
//   parseProm: (config, data) => {
//     const res: MetricData[] = []; // Explicitly typed array
//     const time = Date.now();
//     const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';
//     const names = new Set();
//     for (const info of data) {
//       let wholeName;
//       let name;
//       if (config.mode === 'docker') {
//         if (!info.metric.name) continue;
//         wholeName = info.metric['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       } else {
//         if (!info.metric.job) continue;
//         wholeName =
//           info.metric.job +
//           '/' +
//           info.metric.instance +
//           '/' +
//           info.metric['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       }
//       if (names.has(name)) continue;
//       names.add(name);
//       let value = info.value;
//       if (Array.isArray(value)) value = info.value[1];
//       if (isNaN(value) || value === 'NaN') continue;
//       res.push({
//         metric: wholeName,
//         value: value,
//         time: time,
//         category: category,
//       });
//     }
//     console.log('is size equal?', res.length === new Set(res).size);
//     return res;
//   },
//   /**
//    * Creates a Grafana dashboard with a panel based on the provided metric.
//    */
//   createGrafanaDashboard: async (metric, datasource, graphType, token) => {
//     let uid = metric.metric.replace(/.*\/.*\//g, '');
//     if (metric.metric.replace(/.*\/.*\//g, '').length >= 40) {
//       uid = metric.metric.slice(metric.metric.length - 39);
//     }
//     const dashboard = {
//       dashboard: {
//         id: null,
//         uid: uid,
//         title: metric.metric.replace(/.*\/.*\//g, ''),
//         tags: ['templated'],
//         timezone: 'browser',
//         schemaVersion: 16,
//         version: 0,
//         refresh: '10s',
//         panels: [] as any[], // Explicitly typed panels array
//       },
//       folderId: 0,
//       overwrite: true,
//     };
//     dashboard.dashboard.panels.push(
//       createGrafanaPanelObject(metric, datasource, graphType)
//     );
//     try {
//       const dashboardResponse = await axios.post(
//         'http://grafana:3000/api/dashboards/db',
//         JSON.stringify(dashboard),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token,
//           },
//         }
//       );
//       if (dashboardResponse.status >= 400) {
//         console.log(
//           'Error with POST request to Grafana Dashboards API. In createGrafanaDashboard.'
//         );
//       } else {
//         console.log(
//           `📊 Grafana graphs for the ${metric.metric.replace(/.*\/.*\//g, '')} metric are ready 📊`
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   /**
//    * Fetches Grafana datasource information.
//    */
//   getGrafanaDatasource: async token => {
//     console.log('In utilities.getGrafanaDatasource!!!');
//     const datasourceResponse = await axios.get('http://grafana:3000/api/datasources', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     console.log('Successfully fetched datasource from Grafana API');
//     const datasource = {
//       type: datasourceResponse.data[0].type,
//       uid: datasourceResponse.data[0].uid,
//     };
//     return datasource;
//   },
//   /**
//    * Fetches Grafana datasource information from a different endpoint.
//    */
//   updateGrafanaDatasource: async token => {
//     const datasourceResponse = await axios.get('http://localhost:32000/api/datasources', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     console.log('Successfully fetched datasource from Grafana API');
//     const datasource = {
//       type: datasourceResponse.data[0].type,
//       uid: datasourceResponse.data[0].uid,
//     };
//     console.log('datasource is', datasource);
//     return datasource;
//   },
//   /**
//    * Updates a Grafana dashboard by pushing an updated panel.
//    */
//   updateGrafanaDashboard: async (graphType, token, metric, datasource) => {
//     let uid = metric.replace(/.*\/.*\//g, '');
//     if (metric.replace(/.*\/.*\//g, '').length >= 40) {
//       uid = metric.slice(metric.length - 39);
//     }
//     const dashboard = {
//       dashboard: {
//         id: null,
//         uid: uid,
//         title: metric.replace(/.*\/.*\//g, ''),
//         tags: ['templated'],
//         timezone: 'browser',
//         schemaVersion: 16,
//         version: 0,
//         refresh: '10s',
//         panels: [] as any[], // Explicitly typed panels array
//       },
//       folderId: 0,
//       overwrite: true,
//     };
//     dashboard.dashboard.panels.push(
//       updateGrafanaPanelObject(metric, datasource, graphType)
//     );
//     try {
//       const dashboardResponse = await axios.post(
//         'http://localhost:32000/api/dashboards/db',
//         JSON.stringify(dashboard),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token,
//           },
//         }
//       );
//       if (dashboardResponse.status >= 400) {
//         console.log(
//           'Error with POST request to Grafana Dashboards API. In updateGrafanaDashboard.'
//         );
//       } else {
//         console.log(
//           `📊 Grafana graphs 📊 for the ${metric.replace(/.*\/.*\//g, '')} has been updated!!!`
//         );
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };
// export default { helpers };
// import axios from 'axios';
// // Use a default import from GrafanaPanel and destructure the needed functions.
// import GrafanaPanel from './GrafanaPanel';
// const { createGrafanaPanelObject, updateGrafanaPanelObject } = GrafanaPanel;
// // Define an interface for metric data to help TypeScript infer the type.
// interface MetricData {
//   metric: string;
//   value: number;
//   time: number;
//   category: string;
// }
// const helpers = {
//   /**
//    * Queries all available Prometheus metrics and returns parsed response data.
//    */
//   promMetricsQuery: async (config) => {
//     const URI = helpers.getMetricsURI(config);
//     let query;
//     if (config.mode === 'docker') {
//       query = URI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`);
//     } else {
//       query = URI + encodeURIComponent('{__name__=~".+",container=""}');
//     }
//     try {
//       const response = await axios.get(query);
//       return helpers.parseProm(config, response.data?.data?.result ?? []); // ✅ No more TS18046 error
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//       return [];
//     }
//   },
//   /**
//    * Queries the Kafka URI and parses response data.
//    */
//   kafkaMetricsQuery: async (config) => {
//     const URI = helpers.getMetricsURI(config);
//     try {
//       const response = await axios.get(URI);
//       return helpers.extractWord(config.mode, response.data ?? ""); // ✅ Safe fallback for missing response data
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//       return [];
//     }
//   },
//   /**
//    * Fetches Grafana datasource information.
//    */
//   getGrafanaDatasource: async (token) => {
//     console.log('In utilities.getGrafanaDatasource!!!');
//     try {
//       const datasourceResponse = await axios.get('http://grafana:3000/api/datasources', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });
//       console.log('Successfully fetched datasource from Grafana API');
//       return {
//         type: datasourceResponse.data?.[0]?.type ?? "unknown", // ✅ Prevents undefined errors
//         uid: datasourceResponse.data?.[0]?.uid ?? "unknown",
//       };
//     } catch (error) {
//       console.error("Error fetching Grafana datasource:", error);
//       return { type: "unknown", uid: "unknown" };
//     }
//   },
//   /**
//    * Fetches Grafana datasource information from a different endpoint.
//    */
//   updateGrafanaDatasource: async (token) => {
//     try {
//       const datasourceResponse = await axios.get('http://localhost:32000/api/datasources', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });
//       console.log('Successfully fetched datasource from Grafana API');
//       return {
//         type: datasourceResponse.data?.[0]?.type ?? "unknown", // ✅ Prevents undefined errors
//         uid: datasourceResponse.data?.[0]?.uid ?? "unknown",
//       };
//     } catch (error) {
//       console.error("Error updating Grafana datasource:", error);
//       return { type: "unknown", uid: "unknown" };
//     }
//   },
//   /**
//    * Parses Prometheus query responses.
//    */
//   parseProm: (config, data) => {
//     const res: MetricData[] = [];
//     const time = Date.now();
//     const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';
//     const names = new Set();
//     for (const info of data ?? []) { // ✅ Prevents iteration on undefined
//       let wholeName;
//       let name;
//       if (config.mode === 'docker') {
//         if (!info.metric?.name) continue;
//         wholeName = info.metric?.['__name__'] ?? "unknown";
//         name = wholeName.replace(/.*\/.*\//g, '');
//       } else {
//         if (!info.metric?.job) continue;
//         wholeName =
//           info.metric?.job +
//           '/' +
//           info.metric?.instance +
//           '/' +
//           info.metric?.['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       }
//       if (names.has(name)) continue;
//       names.add(name);
//       let value = info.value;
//       if (Array.isArray(value)) value = info.value[1] ?? 0;
//       if (isNaN(value) || value === 'NaN') continue;
//       res.push({
//         metric: wholeName,
//         value: value,
//         time: time,
//         category: category,
//       });
//     }
//     console.log('is size equal?', res.length === new Set(res).size);
//     return res;
//   }
// };
// export default { helpers };
// import axios from 'axios';
// import { createGrafanaPanelObject, updateGrafanaPanelObject } from './GrafanaPanel';
// // Define an interface for metric data to help TypeScript infer the type.
// interface MetricData {
//   metric: string;
//   value: number;
//   time: number;
//   category: string;
// }
// const helpers = {
//   /**
//    * Queries all available Prometheus metrics and returns parsed response data.
//    */
//   promMetricsQuery: async (config) => {
//     const URI = helpers.getMetricsURI(config);
//     let query;
//     if (config.mode === 'docker') {
//       query = URI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`);
//     } else {
//       query = URI + encodeURIComponent('{__name__=~".+",container=""}');
//     }
//     try {
//       const response = await axios.get(query);
//       return helpers.parseProm(config, response.data?.data?.result ?? []); // ✅ Prevents TS18046 error
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//       return [];
//     }
//   },
//   /**
//    * Queries the Kafka URI and parses response data.
//    */
//   kafkaMetricsQuery: async (config) => {
//     const URI = helpers.getMetricsURI(config);
//     try {
//       const response = await axios.get(URI);
//       return helpers.extractWord(config.mode, response.data ?? ""); // ✅ Safe fallback for missing response data
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//       return [];
//     }
//   },
//   /**
//    * Fetches Grafana datasource information.
//    */
//   getGrafanaDatasource: async (token) => {
//     console.log('In utilities.getGrafanaDatasource...');
//     try {
//       const datasourceResponse = await axios.get('http://grafana:3000/api/datasources', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });
//       console.log('Successfully fetched datasource from Grafana API');
//       return {
//         type: datasourceResponse.data?.[0]?.type ?? "unknown", // ✅ Prevents undefined errors
//         uid: datasourceResponse.data?.[0]?.uid ?? "unknown",
//       };
//     } catch (error) {
//       console.error("Error fetching Grafana datasource:", error);
//       return { type: "unknown", uid: "unknown" };
//     }
//   },
//   /**
//    * Fetches Grafana datasource information from a different endpoint.
//    */
//   updateGrafanaDatasource: async (token) => {
//     try {
//       const datasourceResponse = await axios.get('http://localhost:32000/api/datasources', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });
//       console.log('Successfully fetched datasource from Grafana API');
//       return {
//         type: datasourceResponse.data?.[0]?.type ?? "unknown", // ✅ Prevents undefined errors
//         uid: datasourceResponse.data?.[0]?.uid ?? "unknown",
//       };
//     } catch (error) {
//       console.error("Error updating Grafana datasource:", error);
//       return { type: "unknown", uid: "unknown" };
//     }
//   },
//   /**
//    * Parses Prometheus query responses.
//    */
//   parseProm: (config, data) => {
//     const res: MetricData[] = [];
//     const time = Date.now();
//     const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';
//     const names = new Set();
//     for (const info of data ?? []) { // ✅ Prevents iteration on undefined
//       let wholeName;
//       let name;
//       if (config.mode === 'docker') {
//         if (!info.metric?.name) continue;
//         wholeName = info.metric?.['__name__'] ?? "unknown";
//         name = wholeName.replace(/.*\/.*\//g, '');
//       } else {
//         if (!info.metric?.job) continue;
//         wholeName =
//           info.metric?.job +
//           '/' +
//           info.metric?.instance +
//           '/' +
//           info.metric?.['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       }
//       if (names.has(name)) continue;
//       names.add(name);
//       let value = info.value;
//       if (Array.isArray(value)) value = info.value[1] ?? 0;
//       if (isNaN(value) || value === 'NaN') continue;
//       res.push({
//         metric: wholeName,
//         value: value,
//         time: time,
//         category: category,
//       });
//     }
//     console.log('is size equal?', res.length === new Set(res).size);
//     return res;
//   }
// };
// export default { helpers };
// import axios from 'axios';
// import { createGrafanaPanelObject, updateGrafanaPanelObject } from './GrafanaPanel.ts';
// interface DatabaseConfig {
//   type: 'MongoDB' | 'PostgreSQL';
//   URI: string;
//   connection?: 'REST' | 'gRPC';
// }
// interface ChronosConfig {
//   microservice: string;
//   interval: number;
//   mode: 'kafka' | 'kubernetes' | 'microservices' | 'docker';
//   dockerized?: boolean;
//   database: DatabaseConfig;
//   notifications?: any[];
// }
// interface MetricData {
//   metric: string;
//   value: number;
//   time: number;
//   category: string;
// }
// export const helpers = {
//   /** Validate all required fields exist and are valid input types */
//   validateInput: (config: ChronosConfig): ChronosConfig => {
//     if (!config) throw new Error("Chronos config is undefined");
//     const { microservice, database, interval, dockerized, mode, jmxuri, promService, promPort } = config;
//     if (!microservice || typeof microservice !== "string") throw new Error("Invalid input: microservice must be a string.");
//     if (!database?.type || !['MongoDB', 'PostgreSQL'].includes(database.type)) throw new Error("Invalid database type.");
//     if (mode === "kafka" && jmxuri && typeof jmxuri !== "string") throw new Error("Invalid jmxuri, must be a string.");
//     if ((mode === "kubernetes" || mode === "docker") && (!promService || typeof promService !== "string" || !promPort || typeof promPort !== "number")) {
//       throw new Error("Invalid Prometheus service or port.");
//     }
//     config.interval = interval ?? 60000;
//     config.dockerized = dockerized ?? false;
//     return config;
//   },
//   addNotifications: (config: ChronosConfig): ChronosConfig => {
//     const { notifications } = config;
//     if (notifications) {
//       const features = ["slack", "email", "sms"];
//       notifications.forEach(obj => {
//         if (!features.includes(obj.type)) {
//           throw new Error(`${obj.type} is not a supported notification method.`);
//         }
//         config[obj.type] = obj.settings;
//       });
//     }
//     return config;
//   },
//   getMetricsURI: (config: ChronosConfig): string => {
//     if (config.mode === "kafka") return config.jmxuri ?? "";
//     if (config.mode === "kubernetes" || config.mode === "docker") return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
//     throw new Error("Unrecognized mode");
//   },
//   testMetricsQuery: async (config: ChronosConfig) => {
//     const URI = helpers.getMetricsURI(config) + "up";
//     try {
//       const response = await axios.get(URI);
//       if (response.status !== 200) console.error("Invalid response:", URI, response.status);
//       return response;
//     } catch (error) {
//       console.error(error);
//       throw new Error(`Unable to query metrics server: ${URI}`);
//     }
//   },
//   kafkaMetricsQuery: async (config: ChronosConfig): Promise<MetricData[]> => {
//     const URI = helpers.getMetricsURI(config);
//     try {
//       const response = await axios.get(URI);
//       return helpers.extractWord(config.mode, response.data ?? "");
//     } catch (error) {
//       console.error(config.mode, "Error fetching from URI:", URI, error);
//       return [];
//     }
//   },
//   extractWord: (mode: string, text: string): MetricData[] => {
//     const res: MetricData[] = [];
//     const arr = text.split("\n");
//     const time = Date.now();
//     const category = "Event";
//     for (const element of arr) {
//       if (!element || element[0] === "#") continue;
//       if (mode === "kafka" && (element.startsWith("jmx") || element.startsWith("'jmx"))) continue;
//       const lastSpace = element.lastIndexOf(" ");
//       const metric = element.slice(0, lastSpace);
//       const value = Number(element.slice(lastSpace + 1));
//       if (!isNaN(value)) {
//         res.push({ metric, value, time, category });
//       }
//     }
//     return res;
//   },
//   promMetricsQuery: async (config: ChronosConfig): Promise<MetricData[]> => {
//     const URI = helpers.getMetricsURI(config);
//     const query = config.mode === "docker" ? URI + encodeURIComponent(`{__name__=~".+",name="${config.database.type}"}`) : URI + encodeURIComponent('{__name__=~".+",container=""}');
//     try {
//       const response = await axios.get(query);
//       return helpers.parseProm(config, response.data?.data?.result ?? []);
//     } catch (error) {
//       console.error(config.mode, "Error fetching from URI:", URI, error);
//       return [];
//     }
//   },
//   parseProm: (config: ChronosConfig, data: any[]): MetricData[] => {
//     const res: MetricData[] = [];
//     const time = Date.now();
//     const category = config.mode === "docker" ? `${config.database.type}` : "Event";
//     const names = new Set();
//     for (const info of data) {
//       let wholeName = info?.metric?.["__name__"] ?? "";
//       let name = wholeName.replace(/.*\/.*\//g, "");
//       if (names.has(name)) continue;
//       names.add(name);
//       let value = Array.isArray(info.value) ? info.value[1] : info.value;
//       if (!isNaN(value)) {
//         res.push({ metric: wholeName, value, time, category });
//       }
//     }
//     return res;
//   }
// };
// export default { helpers };
// import axios from 'axios';
// import { createGrafanaPanelObject, updateGrafanaPanelObject } from '../controllers/GrafanaPanel';
// /**
//  * Chronos config interface (basic example)
//  */
// interface DatabaseConfig {
//   type: 'MongoDB' | 'PostgreSQL';
//   URI: string;
//   connection?: 'REST' | 'gRPC';
// }
// interface ChronosConfig {
//   microservice: string;
//   interval: number;
//   dockerized?: boolean;
//   jmxuri?: string;
//   port?: number;
//   mode: 'kafka' | 'kubernetes' | 'microservices' | 'docker';
//   promService?: string;
//   promPort?: number;
//   database: DatabaseConfig;
//   notifications?: Array<{
//     type: 'slack' | 'email' | 'sms';
//     settings: any;
//   }>;
//   containerName?: string;
//   grafanaAPIKey?: string; // in case you're storing the API key
// }
// /**
//  * We nest all Chronos utility functions inside a `helpers` object.
//  * That means calls will be `utilities.helpers.<functionName>`.
//  */
// const helpers = {
//   /** Validate config fields and set defaults */
//   validateInput: (config: Partial<ChronosConfig>): ChronosConfig => {
//     const {
//       microservice,
//       database,
//       interval,
//       dockerized,
//       jmxuri,
//       mode,
//       promService,
//       promPort,
//     } = config as ChronosConfig;
//     if (!microservice || typeof microservice !== 'string') {
//       throw new Error('Invalid input "microservice": Please provide a name for your microservice');
//     }
//     if (!database?.type || typeof database.type !== 'string') {
//       throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
//     }
//     if (!database.URI || typeof database.URI !== 'string') {
//       throw new Error('Invalid input "database URI": Please provide the URI to your database');
//     }
//     if (!database.connection || typeof database.connection !== 'string') {
//       throw new Error('Invalid "database connection" type: Please provide "REST" or "gRPC"');
//     }
//     // Allowed modes for Chronos
//     const modeTypes = ['kafka', 'kubernetes', 'microservices', 'docker'];
//     if (!mode || !modeTypes.includes(mode)) {
//       throw new Error(
//         'You must input a mode. Options: "kubernetes", "kafka", "microservices", or "docker"'
//       );
//     }
//     if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
//       throw new Error('Invalid input for "jmxuri": Must be a string');
//     }
//     if ((mode === 'kubernetes' || mode === 'docker') && (!promService || !promPort)) {
//       throw new Error('Missing "promService" or "promPort" for mode "kubernetes"/"docker"');
//     }
//     if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
//       throw new Error(`Invalid database type "${database.type}". Only PostgreSQL and MongoDB.`);
//     }
//     if (database.connection !== 'REST' && database.connection !== 'gRPC') {
//       throw new Error(`Invalid db connection "${database.connection}". Only REST/gRPC supported.`);
//     }
//     // Default interval to one minute
//     if (!interval || typeof interval !== 'number') config.interval = 60000;
//     // Default dockerized to false
//     if (dockerized === undefined) config.dockerized = false;
//     return config as ChronosConfig;
//   },
//   /** Configure notifications if user provides them */
//   addNotifications: (config: ChronosConfig): ChronosConfig => {
//     const { notifications } = config;
//     if (notifications) {
//       const validFeatures = ['slack', 'email', 'sms'];
//       notifications.forEach(obj => {
//         if (!validFeatures.includes(obj.type)) {
//           throw new Error(`${obj.type} is not a supported notification method for Chronos`);
//         } else {
//           (config as any)[obj.type] = obj.settings; // Insert the notification settings into config
//         }
//       });
//     }
//     return config;
//   },
//   /** Return the metrics URI depending on "mode" */
//   getMetricsURI: (config: ChronosConfig): string => {
//     if (config.mode === 'kafka') {
//       return config.jmxuri || '';
//     } else if (config.mode === 'kubernetes' || config.mode === 'docker') {
//       return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
//     }
//     throw new Error('Unrecognized mode');
//   },
//   /** Test if the metrics endpoint is reachable */
//   testMetricsQuery: async (config: ChronosConfig) => {
//     let URI = helpers.getMetricsURI(config) + 'up';
//     try {
//       const response = await axios.get(URI);
//       if (response.status !== 200) {
//         console.error('Invalid response from metrics server:', URI, response.status, response.data);
//       } else {
//         console.log('Successful initial response from metrics server:', URI);
//       }
//       return response;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Unable to query metrics server: ' + URI);
//     }
//   },
//   /** Fetch Kafka metrics, parse them */
//   kafkaMetricsQuery: async (config: ChronosConfig) => {
//     const URI = helpers.getMetricsURI(config);
//     try {
//       const response = await axios.get(URI);
//       return helpers.extractWord(config.mode, response.data);
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
//       return [];
//     }
//   },
//   /** Parse plaintext Kafka metrics (line-based) */
//   extractWord: (mode: string, text: string) => {
//     const res: Array<{
//       metric: string;
//       value: number;
//       time: number;
//       category: string;
//     }> = [];
//     const arr = text.split('\n');
//     const time = Date.now();
//     const category = 'Event';
//     for (const element of arr) {
//       if (!element || element.startsWith('#')) continue;
//       if (mode === 'kafka' && (element.startsWith('jmx') || element.startsWith("'jmx"))) continue;
//       const lastSpace = element.lastIndexOf(' ');
//       const metric = element.slice(0, lastSpace);
//       const val = Number(element.slice(lastSpace + 1));
//       if (!isNaN(val)) {
//         res.push({ metric, value: val, time, category });
//       } else {
//         console.error('Invalid metric (skipped):\n', element);
//       }
//     }
//     return res;
//   },
//   /** Fetch Prometheus metrics, parse them */
//   promMetricsQuery: async (config: ChronosConfig) => {
//     const baseURI = helpers.getMetricsURI(config);
//     const query =
//       config.mode === 'docker'
//         ? baseURI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`)
//         : baseURI + encodeURIComponent('{__name__=~".+",container=""}');
//     try {
//       const response = await axios.get(query);
//       const result = response.data?.data?.result || [];
//       return helpers.parseProm(config, result);
//     } catch (error) {
//       console.error(config.mode, '|', 'Error fetching from URI:', query, '\n', error);
//       return [];
//     }
//   },
//   /** Parse the Prometheus "result" array into standardized metrics objects */
//   parseProm: (
//     config: ChronosConfig,
//     data: any[]
//   ): Array<{ metric: string; value: number; time: number; category: string }> => {
//     const res = [];
//     const time = Date.now();
//     const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';
//     const names = new Set();
//     for (const info of data) {
//       let wholeName: string;
//       let name: string;
//       if (config.mode === 'docker') {
//         if (!info.metric.name) continue;
//         wholeName = info.metric['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       } else {
//         if (!info.metric.job) continue;
//         wholeName = info.metric.job + '/' + info.metric.instance + '/' + info.metric['__name__'];
//         name = wholeName.replace(/.*\/.*\//g, '');
//       }
//       if (names.has(name)) continue;
//       names.add(name);
//       let value = info.value;
//       if (Array.isArray(value)) value = value[1]; // [timestamp, value] pattern
//       if (isNaN(value) || value === 'NaN') continue;
//       res.push({
//         metric: wholeName,
//         value: Number(value),
//         time,
//         category,
//       });
//     }
//     console.log('is size equal?', res.length === new Set(res).size);
//     return res;
//   },
//   /** Creates a Grafana dashboard via API */
//   createGrafanaDashboard: async (
//     metric: { metric: string },
//     datasource: { type: string; uid: string },
//     graphType: string,
//     token: string
//   ) => {
//     let uid = metric.metric.replace(/.*\/.*\//g, '');
//     if (uid.length >= 40) {
//       uid = uid.slice(uid.length - 39);
//     }
//     const dashboard = {
//       dashboard: {
//         id: null,
//         uid,
//         title: uid,
//         tags: ['templated'],
//         timezone: 'browser',
//         schemaVersion: 16,
//         version: 0,
//         refresh: '10s',
//         panels: [],
//       },
//       folderId: 0,
//       overwrite: true,
//     };
//     dashboard.dashboard.panels.push(
//       createGrafanaPanelObject(metric, datasource, graphType)
//     );
//     try {
//       const dashboardResponse = await axios.post(
//         'http://grafana:3000/api/dashboards/db',
//         JSON.stringify(dashboard),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token, // e.g. 'Bearer <API_KEY>'
//         },
//       });
//       if (dashboardResponse.status >= 400) {
//         console.log(
//           'Error with POST request to Grafana Dashboards API. In createGrafanaDashboard.'
//         );
//       } else {
//         console.log(`📊 Grafana graphs for "${metric.metric}" are ready 📊 `);
//       }
//     } catch (err) {
//       console.log('Error creating Grafana dashboard:', err);
//     }
//   },
//   /** Fetches an existing datasource from Grafana */
//   getGrafanaDatasource: async (token: string) => {
//     console.log('In utilities.getGrafanaDatasource!!!');
//     const datasourceResponse = await axios.get('http://grafana:3000/api/datasources', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     console.log('Successfully fetched datasource from Grafana API');
//     const datasource = {
//       type: datasourceResponse.data[0].type,
//       uid: datasourceResponse.data[0].uid,
//     };
//     return datasource;
//   },
//   /** Fetches datasource from a different endpoint, presumably a custom plugin */
//   updateGrafanaDatasource: async (token: string) => {
//     const datasourceResponse = await axios.get('http://localhost:32000/api/datasources', {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: token,
//       },
//     });
//     console.log('Successfully fetched datasource from Grafana API');
//     const datasource = {
//       type: datasourceResponse.data[0].type,
//       uid: datasourceResponse.data[0].uid,
//     };
//     console.log('datasource is', datasource);
//     return datasource;
//   },
//   /** Updates an existing dashboard in Grafana */
//   updateGrafanaDashboard: async (
//     graphType: string,
//     token: string,
//     metric: string,
//     datasource: any
//   ) => {
//     let uid = metric.replace(/.*\/.*\//g, '');
//     if (uid.length >= 40) {
//       uid = uid.slice(uid.length - 39);
//     }
//     const dashboard = {
//       dashboard: {
//         id: null,
//         uid,
//         title: uid,
//         tags: ['templated'],
//         timezone: 'browser',
//         schemaVersion: 16,
//         version: 0,
//         refresh: '10s',
//         panels: [],
//       },
//       folderId: 0,
//       overwrite: true,
//     };
//     dashboard.dashboard.panels.push(
//       updateGrafanaPanelObject(metric, datasource, graphType)
//     );
//     try {
//       const dashboardResponse = await axios.post(
//         'http://localhost:32000/api/dashboards/db',
//         JSON.stringify(dashboard),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: token,
//         },
//       });
//       if (dashboardResponse.status >= 400) {
//         console.log(
//           'Error with POST request to Grafana Dashboards API. In updateGrafanaDashboard.'
//         );
//       } else {
//         console.log(
//           `📊 Grafana graphs for "${metric.replace(/.*\/.*\//g, '')}" have been updated!!!`
//         );
//       }
//     } catch (err) {
//       console.log('Error updating Grafana dashboard:', err);
//     }
//   },
// };
// /**
//  * Export an object containing `helpers`
//  *
//  * In `mongo.ts`, you'll do:
//  *   import utilities from './utilities';
//  *   metricsQuery = utilities.helpers.kafkaMetricsQuery;
//  *   await utilities.helpers.getGrafanaDatasource(...);
//  */
// export default {
//   helpers
// };
const axios_1 = __importDefault(require("axios"));
const GrafanaPanel_1 = require("./GrafanaPanel");
/**
 * All utility functions are nested inside 'helpers'.
 * That means in other files: `utilities.helpers.<function>`
 */
const helpers = {
    /** Validate config fields and set defaults */
    validateInput: (config) => {
        const { microservice, database, interval, dockerized, jmxuri, mode, promService, promPort } = config;
        if (!microservice || typeof microservice !== 'string') {
            throw new Error('Invalid input "microservice": Please provide a name for your microservice');
        }
        if (!database?.type || typeof database.type !== 'string') {
            throw new Error('Invalid input "database type": Chronos supports PostgreSQL and MongoDB');
        }
        if (!database.URI || typeof database.URI !== 'string') {
            throw new Error('Invalid input "database URI": Please provide the URI to your database');
        }
        if (!database.connection || typeof database.connection !== 'string') {
            throw new Error('Invalid "database connection" type: Please provide "REST" or "gRPC"');
        }
        const modeTypes = ['kafka', 'kubernetes', 'microservices', 'docker'];
        if (!mode || !modeTypes.includes(mode)) {
            throw new Error('You must input a mode. Options: "kubernetes", "kafka", "microservices", or "docker"');
        }
        if (mode === 'kafka' && jmxuri && typeof jmxuri !== 'string') {
            throw new Error('Invalid input for "jmxuri": Must be a string');
        }
        if ((mode === 'kubernetes' || mode === 'docker') && (!promService || !promPort)) {
            throw new Error('Missing "promService" or "promPort" for mode "kubernetes"/"docker"');
        }
        if (database.type !== 'PostgreSQL' && database.type !== 'MongoDB') {
            throw new Error(`Invalid database type "${database.type}". Only PostgreSQL and MongoDB.`);
        }
        if (database.connection !== 'REST' && database.connection !== 'gRPC') {
            throw new Error(`Invalid db connection "${database.connection}". Only REST/gRPC supported.`);
        }
        // Default interval to one minute
        if (!interval || typeof interval !== 'number')
            config.interval = 60000;
        // Default dockerized to false
        if (dockerized === undefined)
            config.dockerized = false;
        return config;
    },
    /** Configure notifications if user provides them */
    addNotifications: (config) => {
        const { notifications } = config;
        if (notifications) {
            const validFeatures = ['slack', 'email', 'sms'];
            notifications.forEach(obj => {
                if (!validFeatures.includes(obj.type)) {
                    throw new Error(`${obj.type} is not a supported notification method for Chronos`);
                }
                else {
                    // Insert the notification settings onto config
                    config[obj.type] = obj.settings;
                }
            });
        }
        return config;
    },
    /** Return the metrics URI depending on "mode" */
    getMetricsURI: (config) => {
        if (config.mode === 'kafka') {
            return config.jmxuri || '';
        }
        else if (config.mode === 'kubernetes' || config.mode === 'docker') {
            return `http://${config.promService}:${config.promPort}/api/v1/query?query=`;
        }
        throw new Error('Unrecognized mode');
    },
    /** Test if the metrics endpoint is reachable */
    testMetricsQuery: async (config) => {
        const URI = helpers.getMetricsURI(config) + 'up';
        try {
            // Cast response as any to avoid 'unknown'
            const response = await axios_1.default.get(URI);
            if (response.status !== 200) {
                console.error('Invalid response from metrics server:', URI, response.status, response.data);
            }
            else {
                console.log('Successful initial response from metrics server:', URI);
            }
            return response;
        }
        catch (error) {
            console.error(error);
            throw new Error('Unable to query metrics server: ' + URI);
        }
    },
    /** Fetch Kafka metrics, parse them */
    kafkaMetricsQuery: async (config) => {
        const URI = helpers.getMetricsURI(config);
        try {
            const response = await axios_1.default.get(URI);
            return helpers.extractWord(config.mode, response.data ?? '');
        }
        catch (error) {
            console.error(config.mode, '|', 'Error fetching from URI:', URI, '\n', error);
            return [];
        }
    },
    /** Parse plaintext Kafka metrics (line-based) */
    extractWord: (mode, text) => {
        const res = [];
        const arr = text.split('\n');
        const time = Date.now();
        const category = 'Event';
        for (const element of arr) {
            if (!element || element.startsWith('#'))
                continue;
            if (mode === 'kafka' && (element.startsWith('jmx') || element.startsWith("'jmx")))
                continue;
            const lastSpace = element.lastIndexOf(' ');
            const metric = element.slice(0, lastSpace);
            const val = Number(element.slice(lastSpace + 1));
            if (!isNaN(val)) {
                res.push({ metric, value: val, time, category });
            }
            else {
                console.error('Invalid metric (skipped):\n', element);
            }
        }
        return res;
    },
    /** Fetch Prometheus metrics, parse them */
    promMetricsQuery: async (config) => {
        const baseURI = helpers.getMetricsURI(config);
        const query = config.mode === 'docker'
            ? baseURI + encodeURIComponent(`{__name__=~".+",name="${config.containerName}"}`)
            : baseURI + encodeURIComponent('{__name__=~".+",container=""}');
        try {
            // cast as any to avoid TS18046
            const response = await axios_1.default.get(query);
            const result = response.data?.data?.result || [];
            return helpers.parseProm(config, result);
        }
        catch (error) {
            console.error(config.mode, '|', 'Error fetching from URI:', query, '\n', error);
            return [];
        }
    },
    /** Parse the Prometheus "result" array into standardized metrics objects */
    parseProm: (config, data) => {
        const res = [];
        const time = Date.now();
        const category = config.mode === 'docker' ? `${config.containerName}` : 'Event';
        const names = new Set();
        for (const info of data) {
            let wholeName;
            let name;
            if (config.mode === 'docker') {
                if (!info.metric?.name)
                    continue;
                wholeName = info.metric['__name__'];
                name = wholeName.replace(/.*\/.*\//g, '');
            }
            else {
                if (!info.metric?.job)
                    continue;
                wholeName = info.metric.job + '/' + info.metric.instance + '/' + info.metric['__name__'];
                name = wholeName.replace(/.*\/.*\//g, '');
            }
            if (names.has(name))
                continue;
            names.add(name);
            let value = info.value;
            if (Array.isArray(value))
                value = value[1]; // e.g. [timestamp, val]
            if (isNaN(value))
                continue;
            res.push({
                metric: wholeName,
                value: Number(value),
                time,
                category,
            });
        }
        console.log('is size equal?', res.length === new Set(res).size);
        return res;
    },
    /** Creates a Grafana dashboard via API */
    createGrafanaDashboard: async (metric, datasource, graphType, token) => {
        let uid = metric.metric.replace(/.*\/.*\//g, '');
        if (uid.length >= 40) {
            uid = uid.slice(uid.length - 39);
        }
        const dashboard = {
            dashboard: {
                id: null,
                uid,
                title: uid,
                tags: ['templated'],
                timezone: 'browser',
                schemaVersion: 16,
                version: 0,
                refresh: '10s',
                panels: [],
            },
            folderId: 0,
            overwrite: true,
        };
        dashboard.dashboard.panels.push((0, GrafanaPanel_1.createGrafanaPanelObject)(metric, datasource, graphType));
        try {
            const dashboardResponse = await axios_1.default.post('http://grafana:3000/api/dashboards/db', JSON.stringify(dashboard), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            if (dashboardResponse.status >= 400) {
                console.log('Error with POST request to Grafana Dashboards API. In createGrafanaDashboard.');
            }
            else {
                console.log(`📊 Grafana graphs for "${metric.metric}" are ready 📊 `);
            }
        }
        catch (err) {
            console.log('Error creating Grafana dashboard:', err);
        }
    },
    /** Fetches an existing datasource from Grafana */
    getGrafanaDatasource: async (token) => {
        console.log('In utilities.getGrafanaDatasource!!!');
        const datasourceResponse = await axios_1.default.get('http://grafana:3000/api/datasources', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        console.log('Successfully fetched datasource from Grafana API');
        // Safe fallback
        const datasource = {
            type: datasourceResponse.data?.[0]?.type ?? 'unknown',
            uid: datasourceResponse.data?.[0]?.uid ?? 'unknown',
        };
        return datasource;
    },
    /** Fetches datasource from a different endpoint, presumably a custom plugin */
    updateGrafanaDatasource: async (token) => {
        const datasourceResponse = await axios_1.default.get('http://localhost:32000/api/datasources', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });
        console.log('Successfully fetched datasource from Grafana API');
        const datasource = {
            type: datasourceResponse.data?.[0]?.type ?? 'unknown',
            uid: datasourceResponse.data?.[0]?.uid ?? 'unknown',
        };
        console.log('datasource is', datasource);
        return datasource;
    },
    /** Updates an existing dashboard in Grafana */
    updateGrafanaDashboard: async (graphType, token, metric, datasource) => {
        let uid = metric.replace(/.*\/.*\//g, '');
        if (uid.length >= 40) {
            uid = uid.slice(uid.length - 39);
        }
        const dashboard = {
            dashboard: {
                id: null,
                uid,
                title: uid,
                tags: ['templated'],
                timezone: 'browser',
                schemaVersion: 16,
                version: 0,
                refresh: '10s',
                panels: [],
            },
            folderId: 0,
            overwrite: true,
        };
        dashboard.dashboard.panels.push((0, GrafanaPanel_1.updateGrafanaPanelObject)(metric, datasource, graphType));
        try {
            const dashboardResponse = await axios_1.default.post('http://localhost:32000/api/dashboards/db', JSON.stringify(dashboard), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            if (dashboardResponse.status >= 400) {
                console.log('Error with POST request to Grafana Dashboards API. In updateGrafanaDashboard.');
            }
            else {
                console.log(`📊 Grafana graphs for "${metric.replace(/.*\/.*\//g, '')}" have been updated!!!`);
            }
        }
        catch (err) {
            console.log('Error updating Grafana dashboard:', err);
        }
    },
};
/** Export an object containing `helpers` */
exports.default = {
    helpers,
};
//# sourceMappingURL=utilities.js.map