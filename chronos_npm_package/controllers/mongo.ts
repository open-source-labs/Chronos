// // import mongoose from 'mongoose';
// // import alert from './alert';
// // import CommunicationModel from '../models/CommunicationModel';
// // import ServicesModel from '../models/ServicesModel';
// // import HealthModelFunc from'../models/HealthModel';
// // import ContainerInfoFunc from'../models/ContainerInfo';
// // import KafkaModel  from'../models/KafkaModel';
// // import KubernetesModel from'../models/KubernetesModel';
// // import collectHealthData from'./healthHelpers';
// // import MetricsModel from '../models/MetricsModel';
// // import dockerHelper from './dockerHelper';
// // import utilities from './utilities.js';
// // import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel';

// // mongoose.set('strictQuery', true);

// // const mongo = {};

// // // This object is used to determine if metrics that are received from setInterval queries should be saved to the db or not.

// // /**
// //  * Initializes connection to MongoDB database using provided URI
// //  * @param {Object} database Contains DB type and DB URI
// //  */
// // mongo.connect = async ({ database }) => {
// //   console.log('Attempting to connect to database...');
// //   try {
// //     await mongoose.connect(`${database.URI}`);
// //     console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
// //   } catch ({ message }) {
// //     console.log('Error connecting to MongoDB:', message);
// //   }
// // };

// // /**
// //  * Create services collection with each entry representing a microservice
// //  * @param {string} microservice Microservice name
// //  * @param {number} interval Interval to collect data
// //  */

// // mongo.services = ({ microservice, interval }) => {
// //   console.log(`Saving "${microservice}" to services...`);
// //   const newService = { microservice, interval };
// //   const service = new ServicesModel(newService);

// //   service
// //     .save()
// //     .then(() => console.log(`Added new service "${microservice}"`))
// //     .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
// // };

// // /**
// //  * Creates a communications collection if one does not yet exist and
// //  * traces the request throughout its life cycle. Will send a notification
// //  * to the user if contact information is provided
// //  * @param {string} microservice Microservice name
// //  * @param {Object|undefined} slack Slack settings
// //  * @param {Object|undefined} email Email settings
// //  */
// // mongo.communications = ({ microservice, slack, email }) => {
// //   console.log('Recording request cycle...');

// //   return function (req, res, next) {
// //     // Setup newComms object to store data from each request
// //     const newComms = {
// //       microservice: microservice,
// //       endpoint: req.originalUrl,
// //       request: req.method,
// //       correlatingid: res.getHeaders()['x-correlation-id'],
// //     };
// //     // console.log("NEW COMMS",newComms)

// //     res.on('finish', () => {
// //       /**
// //        * OPTIONAL FEATURE
// //        * If user provides contact information, send an alert if the
// //        * status code is over or equal to 400
// //        */
// //       if (res.statusCode >= 400) {
// //         if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
// //         if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
// //       }

// //       /** Add status code and message to newComms */
// //       newComms.responsestatus = res.statusCode;
// //       newComms.responsemessage = res.statusMessage;

// //       const communication = new CommunicationModel(newComms);
// //       communication
// //         .save()
// //         .then(() => {
// //           console.log('Request cycle saved');
// //         })
// //         .catch(err => console.log(`Error saving communications: `, err.message));
// //     });

// //     // Call next middleware
// //     next();
// //   };
// // };

// // /**
// //  * Creates a new table per microservice which records all health data
// //  * @param {string} microservice Microservice name
// //  * @param {number} interval Interval for continuous data collection
// //  */
// // mongo.health = async ({ microservice, interval, mode }) => {
// //   //MetricsModel tracks which metrics are selected in the MetricsContainer component
// //   //HealthModel tracks all the cpu health data in each of the services databases

// //   setInterval(() => {
// //     collectHealthData()
// //       .then(async healthMetrics => {
// //         const currentMetrics = await MetricsModel.find({mode})
        
// //         if (currentMetrics.length !== healthMetrics.length) {
// //           await mongo.addMetrics(healthMetrics, mode, currentMetrics);
// //         }
// //         const HealthModel = HealthModelFunc(`${microservice}`);
// //         await HealthModel.insertMany(healthMetrics);
// //         return
// //       })
// //       .then(() => {
// //         console.log('Health data recorded in MongoDB');
// //       })
// //       .catch(err => console.log('Error inserting health documents: ', err));
// //   }, 10000);
// // };

// // /**
// //  * !Runs instead of health if dockerized is true
// //  * Collects information on the docker container
// //  */
// // mongo.docker = ({ microservice, interval, mode }) => { //:config file, interval of calls, nada
// //   // Create collection using name of microservice
// //   const containerInfo = ContainerInfoFunc(`${microservice}`);
// //   dockerHelper
// //     .getDockerContainer(microservice)
// //     .then(containerData => {
// //       setInterval(() => {
// //         dockerHelper
// //           .readDockerContainer(containerData)
// //           .then(data => {
// //             return containerInfo.create(data);
// //           })
// //           .catch(err => {
// //             throw new Error(err);
// //           });
// //       }, interval);
// //     })

// //     .catch(error => {
// //       if (error.constructor.name === 'Error') throw error;
// //       else throw new Error(error);
// //     });
// // };

// // /*
// //  This function takes as a parameter the promise returned from the kafkaFetch().
// //  It then takes the returned array of metrics, turns them into documents based on
// //  KafkaModel.js, and inserts them into the db at the provided uri with insertMany()
// // */
// // mongo.serverQuery = async config => {
// //   await mongo.saveService(config);
// //   await mongo.setQueryOnInterval(config);
// // };

// // mongo.saveService = config => {
// //   let microservice;
// //   if (config.mode === 'kafka') {
// //     microservice = 'kafkametrics';
// //   } else if (config.mode === 'kubernetes') {
// //     microservice = 'kubernetesmetrics';
// //   } else if (config.mode === 'docker') {
// //     microservice = `${config.containerName}`;
// //   } else {
// //     throw new Error('Unrecongnized mode');
// //   }

// //   const service = new ServicesModel({
// //     microservice: microservice,
// //     interval: config.interval,
// //   });

// //   service
// //     .save()
// //     .then(() => console.log(`Adding "${microservice}" to the services table`))
// //     .catch(err =>
// //       console.log(`Error saving "${microservice}" to the services table: `, err.message)
// //     );
// // };

// // mongo.setQueryOnInterval = async config => {
// //   let model;
// //   let metricsQuery;

// //   let length = 0;
// //   const currentMetricNames = {};

// //   if (config.mode === 'kafka') {
// //     model = KafkaModel;
// //     metricsQuery = await utilities.kafkaMetricsQuery;
// //   } else if (config.mode === 'kubernetes') {
// //     model = KubernetesModel;
// //     metricsQuery = await utilities.promMetricsQuery;
// //   } else if (config.mode === 'docker') {
// //     model = ContainerInfoFunc(`${config.containerName}`);
// //     //console.log('setQueryOnInterval line 212 dockerModel:', ContainerInfoFunc(`${config.containerName}`));
// //     metricsQuery = utilities.promMetricsQuery;
// //     //console.log('setQueryOnInterval line 214 metricsQuery:', metricsQuery);
// //   } else {
// //     throw new Error('Unrecognized mode');
// //   }

// //   length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);

// //   console.log('currentMetricNames.length: ', Object.keys(currentMetricNames).length);
// //   // Use setInterval to send queries to metrics server and then pipe responses to database
// //   setInterval(() => {
// //     metricsQuery(config)
// //       // This updates the Metrics Model with all chosen metrics. If there are no chosen metrics it sets all available metrics as chosen metrics within the metrics model.
// //       .then(async parsedArray => {
// //         //await mongo.createGrafanaDashboards(config, parsedArray);
// //         console.log('parsedArray.length is: ', parsedArray.length);
// //         // This conditional would be used if new metrics are available to be tracked.
// //         if (length !== parsedArray.length) {
// //           // for (let metric of parsedArray) {
// //           //   if (!(metric.metric in currentMetricNames)) {
// //           //     await model.create(metric);
// //           //     //currentMetricNames[metric] = true;
// //           //   }
// //           // }
// //           ///////
// //           length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames, model);
// //         }

// //         if (config.mode === 'docker') {
// //           const documents = [];
// //           for (const metric of parsedArray) {
// //             /**
// //              * This will check if the current metric in the parsed array
// //              * evaluates to true within the currentMetricNames object
// //              * which is updated by the user when they select/deselect metrics on the electron app
// //              * helping to avoid overloading the db with unnecessary data.
// //              */

// //             if (currentMetricNames[metric.metric]) documents.push(model(metric));
// //           }
// //           await model.insertMany(parsedArray, err => {
// //             if (err) {
// //               console.error(err)
// //             } else {
// //               console.log(`${config.mode} metrics recorded in MongoDB`)
// //             }
// //           });
// //         }


// //         let allMetrics = await model.find({});
// //         console.log('allMetrics.length: ', allMetrics.length);
// //         console.log("🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 start creating dashboards 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡")
// //         await mongo.createGrafanaDashboards(config, allMetrics);
// //         console.log("✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ finish creating dashboards ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅")
// //       })
// //       // .then(() => {
// //       //   console.log(`${config.mode} metrics recorded in MongoDB`)
// //       // })
// //       .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
// //   }, 40000);
// // };

// // mongo.getSavedMetricsLength = async (mode, currentMetricNames) => {
// //   let currentMetrics = await MetricsModel.find({ mode: mode });
// //   if (currentMetrics.length > 0) {
// //     currentMetrics.forEach(el => {
// //       const { metric, selected } = el;
// //       currentMetricNames[metric] = selected;
// //     });
// //   }
// //   return currentMetrics.length ? currentMetrics.length : 0;
// // };

// // mongo.addMetrics = async (healthMetrics, mode, currentMetricNames) => {
// //   //This function adds only the new metrics from metrics model to the metrics database
// //   const newMets = [];
// //   for (let healthMetric of healthMetrics) {
// //     const { metric, category} = healthMetric
// //     if (!(metric in currentMetricNames)) {
// //       newMets.push({ metric, mode,category });
// //       currentMetricNames[metric.metric] = true;
// //     }
// //   };
// //   await MetricsModel.create(newMets);
// //   return healthMetrics.length;
// // };
// // // This middleware could be used if the user would like to update their chronos data in real time (immediately after updating saved metrics on the Chronos desktop app), but they would have to expose a URL/port to be queried for the Electron front end.
// // //
// // // mongo.modifyMetrics = (config) => {
// // //   return function (req, res, next) {
// // //     res.on('finish', () => {
// // //       if (req.body.URI === URI && req.body.mode === config.mode) {
// // //         currentMetricNames = req.body.metrics;
// // //       }
// // //       else return next({err: 'Modified metrics passed in to the modifyMetrics route cannot be added', log: 'It is possible that the URI is incorrect, or that you are attempting to add metrics for the incorrect mode type'})
// // //     });
// // //     return next();
// // //   };
// // // }

// // mongo.createGrafanaDashboards = async (config, parsedArray) => {
// //   try {
// //     console.log('In mongo.createGrafanaDashboards!!!')
// //     console.log('Calling utilities.getGrafanaDatasource()');
// //     const datasource = await utilities.getGrafanaDatasource(config.grafanaAPIKey);
// //     //console.log('Calling utilities.promMetricsQuery()');
// //     //const parsedArray = await utilities.promMetricsQuery(config);
// //     //const datasource = await utilities.getGrafanaDatasource();
// //     // console.log("parsedArray is: ", parsedArray.slice(0, 5));
// //     // console.log('parsedArray.length is: ', parsedArray.length);
// //     for (let metric of parsedArray) {
// //       console.log(`🎉 creating dashboard 🎉`);
// //       await utilities.createGrafanaDashboard(metric, datasource, "timeseries", config.grafanaAPIKey);
// //     }

// //     // await parsedArray.forEach(async (metric, i) => {
// //     //   //console.log("metric is: ", metric);
// //     //   console.log(`creating ${i}th dashboard`);
// //     //   await utilities.createGrafanaDashboard(metric, datasource);
// //     // });
// //   } catch (err) {
// //     console.error("error in mongo.createGrafanaDashboards: ", err)
// //   }
// // };

// // mongo.storeGrafanaAPIKey = async (config) => {
// //   try {
// //     console.log('In mongo.storeGrafanaAPIKey!!!')
// //     await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
// //     console.log('Grafana API Key stored in MongoDB');
// //   } catch (err) {
// //     console.error("error in mongo.storeGrafanaAPIKey: ", err);
// //   }
// // }



// // module.exports = mongo;

// import mongoose from 'mongoose';
// import alert from './alert';
// import CommunicationModel from '../models/CommunicationModel';
// import ServicesModel from '../models/ServicesModel';
// import HealthModelFunc from '../models/HealthModel';
// import ContainerInfoFunc from '../models/ContainerInfo';
// import KafkaModel from '../models/KafkaModel';
// import KubernetesModel from '../models/KubernetesModel';
// // Change the import to a named import if collectHealthData is exported that way.
// import { collectHealthData } from './healthHelpers';  
// import MetricsModel from '../models/MetricsModel';
// import dockerHelper from './dockerHelper';
// // If utilities exports an object with a property `helpers`, leave the import as-is.
// import utilities from './utilities.js';
// import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel';

// mongoose.set('strictQuery', true);

// /* ---------------------------------------------------------------------------
//    (Interface & mongo object initialization code omitted for brevity; assume
//    they remain as in the previous update.)
// --------------------------------------------------------------------------- */

// interface MongoController {
//   // ... (interface as previously declared)
//   connect: ({ database }: { database: { URI: string } }) => Promise<void>;
//   services: ({ microservice, interval }: { microservice: string; interval: number }) => void;
//   communications: ({
//     microservice,
//     slack,
//     email,
//   }: {
//     microservice: string;
//     slack?: any;
//     email?: any;
//   }) => (req: any, res: any, next: any) => void;
//   health: ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string; }) => Promise<void>;
//   docker: ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string; }) => void;
//   serverQuery: (config: any) => Promise<void>;
//   saveService: (config: any) => void;
//   setQueryOnInterval: (config: any) => Promise<void>;
//   getSavedMetricsLength: (mode: string, currentMetricNames: { [key: string]: any }) => Promise<number>;
//   addMetrics: (healthMetrics: any, mode: string, currentMetricNames: { [key: string]: any }) => Promise<number>;
//   createGrafanaDashboards: (config: any, parsedArray: any[]) => Promise<void>;
//   storeGrafanaAPIKey: (config: any) => Promise<void>;
// }

// const mongo: MongoController = {} as MongoController;

// /* --------------------- CONNECT, SERVICES, COMMUNICATIONS --------------------- */

// // (connect, services, and communications remain unchanged from previous update)

// mongo.connect = async ({ database }: { database: { URI: string } }): Promise<void> => {
//   console.log('Attempting to connect to database...');
//   try {
//     await mongoose.connect(database.URI);
//     console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
//   } catch ({ message }) {
//     console.log('Error connecting to MongoDB:', message);
//   }
// };

// mongo.services = ({ microservice, interval }: { microservice: string; interval: number }): void => {
//   console.log(`Saving "${microservice}" to services...`);
//   const newService = { microservice, interval };
//   const service = new ServicesModel(newService);
//   service
//     .save()
//     .then(() => console.log(`Added new service "${microservice}"`))
//     .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
// };

// mongo.communications = ({
//   microservice,
//   slack,
//   email,
// }: {
//   microservice: string;
//   slack?: any;
//   email?: any;
// }) => {
//   console.log('Recording request cycle...');
//   return function (req: any, res: any, next: any): void {
//     const newComms = {
//       microservice: microservice,
//       endpoint: req.originalUrl,
//       request: req.method,
//       correlatingid: res.getHeaders()['x-correlation-id'],
//     };
//     res.on('finish', () => {
//       if (res.statusCode >= 400) {
//         if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
//         if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
//       }
//       newComms['responsestatus'] = res.statusCode;
//       newComms['responsemessage'] = res.statusMessage;
//       const communication = new CommunicationModel(newComms);
//       communication
//         .save()
//         .then(() => console.log('Request cycle saved'))
//         .catch(err => console.log(`Error saving communications: `, err.message));
//     });
//     next();
//   };
// };

// /* ---------------------------- HEALTH FUNCTION ---------------------------- */

// mongo.health = async ({
//   microservice,
//   interval,
//   mode,
// }: {
//   microservice: string;
//   interval: number;
//   mode: string;
// }): Promise<void> => {
//   // <-- Error at line 503: collectHealthData() not callable.
//   // After updating the import, we now call the function.
//   setInterval(() => {
//     collectHealthData()  // Now callable because we import it as a named function.
//       .then(async (healthMetrics: any) => {
//         const currentMetrics = await MetricsModel.find({ mode });
//         if (currentMetrics.length !== healthMetrics.length) {
//           await mongo.addMetrics(healthMetrics, mode, currentMetrics);
//         }
//         const HealthModel = HealthModelFunc(`${microservice}`);
//         await HealthModel.insertMany(healthMetrics);
//       })
//       .then(() => console.log('Health data recorded in MongoDB'))
//       .catch(err => console.log('Error inserting health documents: ', err));
//   }, 10000);
// };

// /* ----------------------------- DOCKER FUNCTION ----------------------------- */

// mongo.docker = ({
//   microservice,
//   interval,
//   mode,
// }: {
//   microservice: string;
//   interval: number;
//   mode: string;
// }): void => {
//   const containerInfo = ContainerInfoFunc(`${microservice}`);
//   dockerHelper
//     .getDockerContainer(microservice)
//     .then(containerData => {
//       setInterval(() => {
//         dockerHelper
//           .readDockerContainer(containerData)
//           .then(data => containerInfo.create(data))
//           .catch(err => { throw new Error(err); });
//       }, interval);
//     })
//     .catch(error => {
//       if (error.constructor.name === 'Error') throw error;
//       else throw new Error(error);
//     });
// };

// /* ---------------- SERVER QUERY & SAVE SERVICE ---------------- */

// mongo.serverQuery = async (config: any): Promise<void> => {
//   await mongo.saveService(config);
//   await mongo.setQueryOnInterval(config);
// };

// mongo.saveService = (config: any): void => {
//   let microservice: string;
//   if (config.mode === 'kafka') {
//     microservice = 'kafkametrics';
//   } else if (config.mode === 'kubernetes') {
//     microservice = 'kubernetesmetrics';
//   } else if (config.mode === 'docker') {
//     microservice = `${config.containerName}`;
//   } else {
//     throw new Error('Unrecognized mode');
//   }
//   const service = new ServicesModel({
//     microservice,
//     interval: config.interval,
//   });
//   service
//     .save()
//     .then(() => console.log(`Adding "${microservice}" to the services table`))
//     .catch(err =>
//       console.log(`Error saving "${microservice}" to the services table: `, err.message)
//     );
// };

// /* ---------------- SET QUERY ON INTERVAL ---------------- */

// mongo.setQueryOnInterval = async (config: any): Promise<void> => {
//   let model: any;
//   let metricsQuery: any;
//   let length = 0;
//   const currentMetricNames: { [key: string]: any } = {};
//   if (config.mode === 'kafka') {
//     model = KafkaModel;
//     // Update: use utilities.helpers.kafkaMetricsQuery instead of utilities.kafkaMetricsQuery
//     metricsQuery = await utilities.helpers.kafkaMetricsQuery;
//   } else if (config.mode === 'kubernetes') {
//     model = KubernetesModel;
//     metricsQuery = await utilities.helpers.promMetricsQuery;
//   } else if (config.mode === 'docker') {
//     model = ContainerInfoFunc(`${config.containerName}`);
//     metricsQuery = utilities.helpers.promMetricsQuery;
//   } else {
//     throw new Error('Unrecognized mode');
//   }
//   length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);
//   console.log('currentMetricNames.length: ', Object.keys(currentMetricNames).length);
//   setInterval(() => {
//     metricsQuery(config)
//       .then(async (parsedArray: any[]) => {
//         console.log('parsedArray.length is: ', parsedArray.length);
//         if (length !== parsedArray.length) {
//           length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
//         }
//         if (config.mode === 'docker') {
//           const documents: any[] = [];
//           for (const metric of parsedArray) {
//             if (currentMetricNames[metric.metric]) {
//               documents.push(model(metric));
//             }
//           }
//           await model.insertMany(parsedArray, (err: any) => {
//             if (err) console.error(err);
//             else console.log(`${config.mode} metrics recorded in MongoDB`);
//           });
//         }
//         const allMetrics = await model.find({});
//         console.log('allMetrics.length: ', allMetrics.length);
//         console.log("🟡 start creating dashboards 🟡");
//         await mongo.createGrafanaDashboards(config, allMetrics);
//         console.log("✅ finish creating dashboards ✅");
//       })
// //       .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
// //   }, 40000);
// // };

// // /* ---------------- GET SAVED METRICS LENGTH ---------------- */

// // mongo.getSavedMetricsLength = async (
// //   mode: string,
// //   currentMetricNames: { [key: string]: any }
// // ): Promise<number> => {
// //   const currentMetrics = await MetricsModel.find({ mode });
// //   if (currentMetrics.length > 0) {
// //     currentMetrics.forEach(el => {
// //       const { metric, selected } = el;
// //       currentMetricNames[metric] = selected;
// //     });
// //   }
// //   return currentMetrics.length;
// // };

// // /* ---------------- ADD METRICS ---------------- */

// // mongo.addMetrics = async (
// //   healthMetrics: any,
// //   mode: string,
// //   currentMetricNames: { [key: string]: any }
// // ): Promise<number> => {
// //   const newMets: any[] = [];
// //   for (let healthMetric of healthMetrics) {
// //     const { metric, category } = healthMetric;
// //     if (!(metric in currentMetricNames)) {
// //       newMets.push({ metric, mode, category });
// //       currentMetricNames[metric] = true;
// //     }
// //   }
// //   await MetricsModel.create(newMets);
// //   return healthMetrics.length;
// // };

// // /* ---------------- CREATE GRAFANA DASHBOARDS ---------------- */

// // mongo.createGrafanaDashboards = async (
// //   config: any,
// //   parsedArray: any[]
// // ): Promise<void> => {
// //   try {
// //     console.log('In mongo.createGrafanaDashboards!!!');
// //     // Update: call utilities.helpers.getGrafanaDatasource
// //     const datasource = await utilities.helpers.getGrafanaDatasource(config.grafanaAPIKey);
// //     for (let metric of parsedArray) {
// //       console.log(`🎉 creating dashboard 🎉`);
// //       // Update: call utilities.helpers.createGrafanaDashboard
// //       await utilities.helpers.createGrafanaDashboard(metric, datasource, "timeseries", config.grafanaAPIKey);
// //     }
// //   } catch (err) {
// //     console.error("error in mongo.createGrafanaDashboards: ", err);
// //   }
// // };

// // /* ---------------- STORE GRAFANA API KEY ---------------- */

// // mongo.storeGrafanaAPIKey = async (config: any): Promise<void> => {
// //   try {
// //     console.log('In mongo.storeGrafanaAPIKey!!!');
// //     await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
// //     console.log('Grafana API Key stored in MongoDB');
// //   } catch (err) {
// //     console.error("error in mongo.storeGrafanaAPIKey: ", err);
// //   }
// // };

// // /* =============================================================================
// //    4. Export the Updated Mongo Controller
// //    ============================================================================= */
// // export default mongo;
// import mongoose from 'mongoose';
// import alert from './alert';
// import CommunicationModel from '../models/CommunicationModel';
// import ServicesModel from '../models/ServicesModel';
// import HealthModelFunc from '../models/HealthModel';
// import ContainerInfoFunc from '../models/ContainerInfo';
// import KafkaModel from '../models/KafkaModel';
// import KubernetesModel from '../models/KubernetesModel';
// // Updated import: use the default import since healthHelpers is exported as default.
// import healthHelpers from './healthHelpers';
// import MetricsModel from '../models/MetricsModel';
// import dockerHelper from './dockerHelper';
// // If utilities exports an object with a property `helpers`, leave the import as-is.
// import utilities from './utilities.js';
// import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel';

// mongoose.set('strictQuery', true);

// /* -----------------------------------------------------------------------------
//    Interface & mongo object initialization code (omitted for brevity)
// ----------------------------------------------------------------------------- */

// interface MongoController {
//   connect: ({ database }: { database: { URI: string } }) => Promise<void>;
//   services: ({ microservice, interval }: { microservice: string; interval: number }) => void;
//   communications: ({
//     microservice,
//     slack,
//     email,
//   }: {
//     microservice: string;
//     slack?: any;
//     email?: any;
//   }) => (req: any, res: any, next: any) => void;
//   health: ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string; }) => Promise<void>;
//   docker: ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string; }) => void;
//   serverQuery: (config: any) => Promise<void>;
//   saveService: (config: any) => void;
//   setQueryOnInterval: (config: any) => Promise<void>;
//   getSavedMetricsLength: (mode: string, currentMetricNames: { [key: string]: any }) => Promise<number>;
//   addMetrics: (healthMetrics: any, mode: string, currentMetricNames: { [key: string]: any }) => Promise<number>;
//   createGrafanaDashboards: (config: any, parsedArray: any[]) => Promise<void>;
//   storeGrafanaAPIKey: (config: any) => Promise<void>;
// }

// const mongo: MongoController = {} as MongoController;

// /* --------------------- CONNECT, SERVICES, COMMUNICATIONS --------------------- */

// mongo.connect = async ({ database }: { database: { URI: string } }): Promise<void> => {
//   console.log('Attempting to connect to database...');
//   try {
//     await mongoose.connect(database.URI);
//     console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
//   } catch ({ message }) {
//     console.log('Error connecting to MongoDB:', message);
//   }
// };

// mongo.services = ({ microservice, interval }: { microservice: string; interval: number }): void => {
//   console.log(`Saving "${microservice}" to services...`);
//   const newService = { microservice, interval };
//   const service = new ServicesModel(newService);
//   service
//     .save()
//     .then(() => console.log(`Added new service "${microservice}"`))
//     .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
// };

// mongo.communications = ({
//   microservice,
//   slack,
//   email,
// }: {
//   microservice: string;
//   slack?: any;
//   email?: any;
// }) => {
//   console.log('Recording request cycle...');
//   return function (req: any, res: any, next: any): void {
//     const newComms = {
//       microservice: microservice,
//       endpoint: req.originalUrl,
//       request: req.method,
//       correlatingid: res.getHeaders()['x-correlation-id'],
//     };
//     res.on('finish', () => {
//       if (res.statusCode >= 400) {
//         if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
//         if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
//       }
//       newComms['responsestatus'] = res.statusCode;
//       newComms['responsemessage'] = res.statusMessage;
//       const communication = new CommunicationModel(newComms);
//       communication
//         .save()
//         .then(() => console.log('Request cycle saved'))
//         .catch(err => console.log(`Error saving communications: `, err.message));
//     });
//     next();
//   };
// };

// /* ---------------------------- HEALTH FUNCTION ---------------------------- */

// mongo.health = async ({
//   microservice,
//   interval,
//   mode,
// }: {
//   microservice: string;
//   interval: number;
//   mode: string;
// }): Promise<void> => {
//   setInterval(() => {
//     // Call collectHealthData as a property of the default imported healthHelpers object.
//     healthHelpers.collectHealthData()
//       .then(async (healthMetrics: any) => {
//         const currentMetrics = await MetricsModel.find({ mode });
//         if (currentMetrics.length !== healthMetrics.length) {
//           await mongo.addMetrics(healthMetrics, mode, currentMetrics);
//         }
//         const HealthModel = HealthModelFunc(`${microservice}`);
//         await HealthModel.insertMany(healthMetrics);
//       })
//       .then(() => console.log('Health data recorded in MongoDB'))
//       .catch(err => console.log('Error inserting health documents: ', err));
//   }, 10000);
// };

// /* ----------------------------- DOCKER FUNCTION ----------------------------- */

// mongo.docker = ({
//   microservice,
//   interval,
//   mode,
// }: {
//   microservice: string;
//   interval: number;
//   mode: string;
// }): void => {
//   const containerInfo = ContainerInfoFunc(`${microservice}`);
//   dockerHelper
//     .getDockerContainer(microservice)
//     .then(containerData => {
//       setInterval(() => {
//         dockerHelper
//           .readDockerContainer(containerData)
//           .then(data => containerInfo.create(data))
//           .catch(err => {
//             throw new Error(err);
//           });
//       }, interval);
//     })
//     .catch(error => {
//       if (error.constructor.name === 'Error') throw error;
//       else throw new Error(error);
//     });
// };

// /* ---------------- SERVER QUERY & SAVE SERVICE ---------------- */

// mongo.serverQuery = async (config: any): Promise<void> => {
//   await mongo.saveService(config);
//   await mongo.setQueryOnInterval(config);
// };

// mongo.saveService = (config: any): void => {
//   let microservice: string;
//   if (config.mode === 'kafka') {
//     microservice = 'kafkametrics';
//   } else if (config.mode === 'kubernetes') {
//     microservice = 'kubernetesmetrics';
//   } else if (config.mode === 'docker') {
//     microservice = `${config.containerName}`;
//   } else {
//     throw new Error('Unrecognized mode');
//   }
//   const service = new ServicesModel({
//     microservice,
//     interval: config.interval,
//   });
//   service
//     .save()
//     .then(() => console.log(`Adding "${microservice}" to the services table`))
//     .catch(err =>
//       console.log(`Error saving "${microservice}" to the services table: `, err.message)
//     );
// };

// /* ---------------- SET QUERY ON INTERVAL ---------------- */

// mongo.setQueryOnInterval = async (config: any): Promise<void> => {
//   let model: any;
//   let metricsQuery: any;
//   let length = 0;
//   const currentMetricNames: { [key: string]: any } = {};
//   if (config.mode === 'kafka') {
//     model = KafkaModel;
//     metricsQuery = await utilities.helpers.kafkaMetricsQuery;
//   } else if (config.mode === 'kubernetes') {
//     model = KubernetesModel;
//     metricsQuery = await utilities.helpers.promMetricsQuery;
//   } else if (config.mode === 'docker') {
//     model = ContainerInfoFunc(`${config.containerName}`);
//     metricsQuery = utilities.helpers.promMetricsQuery;
//   } else {
//     throw new Error('Unrecognized mode');
//   }
//   length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);
//   console.log('currentMetricNames.length: ', Object.keys(currentMetricNames).length);
//   setInterval(() => {
//     metricsQuery(config)
//       .then(async (parsedArray: any[]) => {
//         console.log('parsedArray.length is: ', parsedArray.length);
//         if (length !== parsedArray.length) {
//           length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
//         }
//         if (config.mode === 'docker') {
//           const documents: any[] = [];
//           for (const metric of parsedArray) {
//             if (currentMetricNames[metric.metric]) {
//               documents.push(model(metric));
//             }
//           }
//           await model.insertMany(parsedArray, (err: any) => {
//             if (err) console.error(err);
//             else console.log(`${config.mode} metrics recorded in MongoDB`);
//           });
//         }
//         const allMetrics = await model.find({});
//         console.log('allMetrics.length: ', allMetrics.length);
//         console.log("🟡 start creating dashboards 🟡");
//         await mongo.createGrafanaDashboards(config, allMetrics);
//         console.log("✅ finish creating dashboards ✅");
//       })
//       .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
//   }, 40000);
// };

// /* ---------------- GET SAVED METRICS LENGTH ---------------- */

// mongo.getSavedMetricsLength = async (
//   mode: string,
//   currentMetricNames: { [key: string]: any }
// ): Promise<number> => {
//   const currentMetrics = await MetricsModel.find({ mode });
//   if (currentMetrics.length > 0) {
//     currentMetrics.forEach(el => {
//       const { metric, selected } = el;
//       currentMetricNames[metric] = selected;
//     });
//   }
//   return currentMetrics.length;
// };

// /* ---------------- ADD METRICS ---------------- */

// mongo.addMetrics = async (
//   healthMetrics: any,
//   mode: string,
//   currentMetricNames: { [key: string]: any }
// ): Promise<number> => {
//   const newMets: any[] = [];
//   for (let healthMetric of healthMetrics) {
//     const { metric, category } = healthMetric;
//     if (!(metric in currentMetricNames)) {
//       newMets.push({ metric, mode, category });
//       currentMetricNames[metric] = true;
//     }
//   }
//   await MetricsModel.create(newMets);
//   return healthMetrics.length;
// };

// /* ---------------- CREATE GRAFANA DASHBOARDS ---------------- */

// mongo.createGrafanaDashboards = async (
//   config: any,
//   parsedArray: any[]
// ): Promise<void> => {
//   try {
//     console.log('In mongo.createGrafanaDashboards!!!');
//     const datasource = await utilities.helpers.getGrafanaDatasource(config.grafanaAPIKey);
//     for (let metric of parsedArray) {
//       console.log(`🎉 creating dashboard 🎉`);
//       await utilities.helpers.createGrafanaDashboard(metric, datasource, "timeseries", config.grafanaAPIKey);
//     }
//   } catch (err) {
//     console.error("error in mongo.createGrafanaDashboards: ", err);
//   }
// };

// /* ---------------- STORE GRAFANA API KEY ---------------- */

// mongo.storeGrafanaAPIKey = async (config: any): Promise<void> => {
//   try {
//     console.log('In mongo.storeGrafanaAPIKey!!!');
//     await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
//     console.log('Grafana API Key stored in MongoDB');
//   } catch (err) {
//     console.error("error in mongo.storeGrafanaAPIKey: ", err);
//   }
// };

// /* =============================================================================
//    Export the Updated Mongo Controller
// ============================================================================= */
// export default mongo;

// import mongoose from 'mongoose';
// import alert from './alert';
// import CommunicationModel from '../models/CommunicationModel';
// import ServicesModel from '../models/ServicesModel';
// import HealthModelFunc from '../models/HealthModel';
// import ContainerInfoFunc from '../models/ContainerInfo';
// import KafkaModel from '../models/KafkaModel';
// import KubernetesModel from '../models/KubernetesModel';
// // Updated import: use the default import since healthHelpers is exported as default.
// import healthHelpers from './healthHelpers';
// import MetricsModel from '../models/MetricsModel';
// import dockerHelper from './dockerHelper';
// // If utilities exports an object with a property `helpers`, leave the import as-is.
// import utilities from './utilities.js';
// import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel';

// mongoose.set('strictQuery', true);

// /* -----------------------------------------------------------------------------
//    Interface & mongo object initialization code (omitted for brevity)
// ----------------------------------------------------------------------------- */

// interface MongoController {
//   connect: ({ database }: { database: { URI: string } }) => Promise<void>;
//   services: ({ microservice, interval }: { microservice: string; interval: number }) => void;
//   communications: ({
//     microservice,
//     slack,
//     email,
//   }: {
//     microservice: string;
//     slack?: any;
//     email?: any;
//   }) => (req: any, res: any, next: any) => void;
//   health: ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string; }) => Promise<void>;
//   docker: ({ microservice, interval, mode }: { microservice: string; interval: number; mode: string; }) => void;
//   serverQuery: (config: any) => Promise<void>;
//   saveService: (config: any) => void;
//   setQueryOnInterval: (config: any) => Promise<void>;
//   getSavedMetricsLength: (mode: string, currentMetricNames: { [key: string]: any }) => Promise<number>;
//   addMetrics: (healthMetrics: any, mode: string, currentMetricNames: { [key: string]: any }) => Promise<number>;
//   createGrafanaDashboards: (config: any, parsedArray: any[]) => Promise<void>;
//   storeGrafanaAPIKey: (config: any) => Promise<void>;
// }

// const mongo: MongoController = {} as MongoController;

// /* --------------------- CONNECT, SERVICES, COMMUNICATIONS --------------------- */

// mongo.connect = async ({ database }: { database: { URI: string } }): Promise<void> => {
//   console.log('Attempting to connect to database...');
//   try {
//     await mongoose.connect(database.URI);
//     console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
//   } catch ({ message }) {
//     console.log('Error connecting to MongoDB:', message);
//   }
// };

// mongo.services = ({ microservice, interval }: { microservice: string; interval: number }): void => {
//   console.log(`Saving "${microservice}" to services...`);
//   const newService = { microservice, interval };
//   const service = new ServicesModel(newService);
//   service
//     .save()
//     .then(() => console.log(`Added new service "${microservice}"`))
//     .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
// };

// mongo.communications = ({
//   microservice,
//   slack,
//   email,
// }: {
//   microservice: string;
//   slack?: any;
//   email?: any;
// }) => {
//   console.log('Recording request cycle...');
//   return function (req: any, res: any, next: any): void {
//     const newComms = {
//       microservice: microservice,
//       endpoint: req.originalUrl,
//       request: req.method,
//       correlatingid: res.getHeaders()['x-correlation-id'],
//     };
//     res.on('finish', () => {
//       if (res.statusCode >= 400) {
//         if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
//         if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
//       }
//       newComms['responsestatus'] = res.statusCode;
//       newComms['responsemessage'] = res.statusMessage;
//       const communication = new CommunicationModel(newComms);
//       communication
//         .save()
//         .then(() => console.log('Request cycle saved'))
//         .catch(err => console.log(`Error saving communications: `, err.message));
//     });
//     next();
//   };
// };

// /* ---------------------------- HEALTH FUNCTION ---------------------------- */

// mongo.health = async ({
//   microservice,
//   interval,
//   mode,
// }: {
//   microservice: string;
//   interval: number;
//   mode: string;
// }): Promise<void> => {
//   setInterval(() => {
//     // Use non-null assertion to ensure collectHealthData is defined.
//     healthHelpers.collectHealthData!()
//       .then(async (healthMetrics: any) => {
//         const currentMetrics = await MetricsModel.find({ mode });
//         if (currentMetrics.length !== healthMetrics.length) {
//           await mongo.addMetrics(healthMetrics, mode, currentMetrics);
//         }
//         const HealthModel = HealthModelFunc(`${microservice}`);
//         await HealthModel.insertMany(healthMetrics);
//       })
//       .then(() => console.log('Health data recorded in MongoDB'))
//       .catch(err => console.log('Error inserting health documents: ', err));
//   }, 10000);
// };

// /* ----------------------------- DOCKER FUNCTION ----------------------------- */

// mongo.docker = ({
//   microservice,
//   interval,
//   mode,
// }: {
//   microservice: string;
//   interval: number;
//   mode: string;
// }): void => {
//   const containerInfo = ContainerInfoFunc(`${microservice}`);
//   dockerHelper
//     .getDockerContainer(microservice)
//     .then(containerData => {
//       setInterval(() => {
//         dockerHelper
//           .readDockerContainer(containerData)
//           .then(data => containerInfo.create(data))
//           .catch(err => {
//             throw new Error(err);
//           });
//       }, interval);
//     })
//     .catch(error => {
//       if (error.constructor.name === 'Error') throw error;
//       else throw new Error(error);
//     });
// };

// /* ---------------- SERVER QUERY & SAVE SERVICE ---------------- */

// mongo.serverQuery = async (config: any): Promise<void> => {
//   await mongo.saveService(config);
//   await mongo.setQueryOnInterval(config);
// };

// mongo.saveService = (config: any): void => {
//   let microservice: string;
//   if (config.mode === 'kafka') {
//     microservice = 'kafkametrics';
//   } else if (config.mode === 'kubernetes') {
//     microservice = 'kubernetesmetrics';
//   } else if (config.mode === 'docker') {
//     microservice = `${config.containerName}`;
//   } else {
//     throw new Error('Unrecognized mode');
//   }
//   const service = new ServicesModel({
//     microservice,
//     interval: config.interval,
//   });
//   service
//     .save()
//     .then(() => console.log(`Adding "${microservice}" to the services table`))
//     .catch(err =>
//       console.log(`Error saving "${microservice}" to the services table: `, err.message)
//     );
// };

// /* ---------------- SET QUERY ON INTERVAL ---------------- */

// mongo.setQueryOnInterval = async (config: any): Promise<void> => {
//   let model: any;
//   let metricsQuery: any;
//   let length = 0;
//   const currentMetricNames: { [key: string]: any } = {};
//   if (config.mode === 'kafka') {
//     model = KafkaModel;
//     metricsQuery = await utilities.helpers.kafkaMetricsQuery;
//   } else if (config.mode === 'kubernetes') {
//     model = KubernetesModel;
//     metricsQuery = await utilities.helpers.promMetricsQuery;
//   } else if (config.mode === 'docker') {
//     model = ContainerInfoFunc(`${config.containerName}`);
//     metricsQuery = utilities.helpers.promMetricsQuery;
//   } else {
//     throw new Error('Unrecognized mode');
//   }
//   length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);
//   console.log('currentMetricNames.length: ', Object.keys(currentMetricNames).length);
//   setInterval(() => {
//     metricsQuery(config)
//       .then(async (parsedArray: any[]) => {
//         console.log('parsedArray.length is: ', parsedArray.length);
//         if (length !== parsedArray.length) {
//           length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
//         }
//         if (config.mode === 'docker') {
//           const documents: any[] = [];
//           for (const metric of parsedArray) {
//             if (currentMetricNames[metric.metric]) {
//               documents.push(model(metric));
//             }
//           }
//           await model.insertMany(parsedArray, (err: any) => {
//             if (err) console.error(err);
//             else console.log(`${config.mode} metrics recorded in MongoDB`);
//           });
//         }
//         const allMetrics = await model.find({});
//         console.log('allMetrics.length: ', allMetrics.length);
//         console.log("🟡 start creating dashboards 🟡");
//         await mongo.createGrafanaDashboards(config, allMetrics);
//         console.log("✅ finish creating dashboards ✅");
//       })
//       .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
//   }, 40000);
// };

// /* ---------------- GET SAVED METRICS LENGTH ---------------- */

// mongo.getSavedMetricsLength = async (
//   mode: string,
//   currentMetricNames: { [key: string]: any }
// ): Promise<number> => {
//   const currentMetrics = await MetricsModel.find({ mode });
//   if (currentMetrics.length > 0) {
//     currentMetrics.forEach(el => {
//       const { metric, selected } = el;
//       currentMetricNames[metric] = selected;
//     });
//   }
//   return currentMetrics.length;
// };

// /* ---------------- ADD METRICS ---------------- */

// mongo.addMetrics = async (
//   healthMetrics: any,
//   mode: string,
//   currentMetricNames: { [key: string]: any }
// ): Promise<number> => {
//   const newMets: any[] = [];
//   for (let healthMetric of healthMetrics) {
//     const { metric, category } = healthMetric;
//     if (!(metric in currentMetricNames)) {
//       newMets.push({ metric, mode, category });
//       currentMetricNames[metric] = true;
//     }
//   }
//   await MetricsModel.create(newMets);
//   return healthMetrics.length;
// };

// /* ---------------- CREATE GRAFANA DASHBOARDS ---------------- */

// // mongo.createGrafanaDashboards = async (
// //   config: any,
// //   parsedArray: any[]
// // ): Promise<void> => {
// //   try {
// //     console.log('In mongo.createGrafanaDashboards!!!');
// //     const datasource = await utilities.helpers.getGrafanaDatasource(config.grafanaAPIKey);
// //     for (let metric of parsedArray) {
// //       console.log(`🎉 creating dashboard 🎉`);
// //       await utilities.helpers.createGrafanaDashboard(metric, datasource, "timeseries", config.grafanaAPIKey);
// //     }
// //   } catch (err) {
// //     console.error("error in mongo.createGrafanaDashboards: ", err);
// //   }
// // };

// // /* ---------------- STORE GRAFANA API KEY ---------------- */

// // mongo.storeGrafanaAPIKey = async (config: any): Promise<void> => {
// //   try {
// //     console.log('In mongo.storeGrafanaAPIKey!!!');
// //     await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
// //     console.log('Grafana API Key stored in MongoDB');
// //   } catch (err) {
// //     console.error("error in mongo.storeGrafanaAPIKey: ", err);
// //   }
// // };

// /* =============================================================================
//    Export the Updated Mongo Controller
// ============================================================================= */
// export default mongo;
// Example: utilities.ts
// import mongoose from 'mongoose';
// import alert from './alert';
// import CommunicationModel from '../models/CommunicationModel';
// import ServicesModel from '../models/ServicesModel';
// import HealthModelFunc from '../models/HealthModel';
// import ContainerInfoFunc from '../models/ContainerInfo';
// import KafkaModel from '../models/KafkaModel';
// import KubernetesModel from '../models/KubernetesModel';
// // We assume `collectHealthData` is a default or named import from 'healthHelpers'.
// import collectHealthData from './healthHelpers';
// import MetricsModel from '../models/MetricsModel';
// import dockerHelper from './dockerHelper';
// // We assume `utilities` exports an object with the missing Grafana functions:
// import utilities from './utilities';
// import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel';

// mongoose.set('strictQuery', true);

// const mongo: any = {}; // or define a proper TypeScript interface if desired

// /** 1) Connect to MongoDB */
// mongo.connect = async ({ database }: { database: { URI: string } }) => {
//   console.log('Attempting to connect to database...');
//   try {
//     await mongoose.connect(database.URI);
//     console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
//   } catch (error: any) {
//     console.log('Error connecting to MongoDB:', error.message);
//   }
// };

// /** 2) Create services collection */
// mongo.services = ({ microservice, interval }: { microservice: string; interval: number }) => {
//   console.log(`Saving "${microservice}" to services...`);
//   const newService = { microservice, interval };
//   const service = new ServicesModel(newService);

//   service
//     .save()
//     .then(() => console.log(`Added new service "${microservice}"`))
//     .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
// };

// /** 3) Logs each request/response cycle, optionally sends Slack/Email alerts */
// mongo.communications = ({ microservice, slack, email }: any) => {
//   console.log('Recording request cycle...');
//   return function (req: any, res: any, next: any) {
//     const newComms = {
//       microservice,
//       endpoint: req.originalUrl,
//       request: req.method,
//       correlatingid: res.getHeaders()['x-correlation-id'],
//     };
//     res.on('finish', () => {
//       if (res.statusCode >= 400) {
//         if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
//         if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
//       }
//       newComms['responsestatus'] = res.statusCode;
//       newComms['responsemessage'] = res.statusMessage;

//       const communication = new CommunicationModel(newComms);
//       communication
//         .save()
//         .then(() => console.log('Request cycle saved'))
//         .catch(err => console.log(`Error saving communications: `, err.message));
//     });
//     next();
//   };
// };

// /** 4) Collect health data in intervals if not dockerized */
// mongo.health = async ({ microservice, interval, mode }: any) => {
//   setInterval(() => {
//     collectHealthData()
//       .then(async (healthMetrics: any[]) => {
//         const currentMetrics = await MetricsModel.find({ mode });
//         if (currentMetrics.length !== healthMetrics.length) {
//           await mongo.addMetrics(healthMetrics, mode, currentMetrics);
//         }
//         const HealthModel = HealthModelFunc(`${microservice}`);
//         await HealthModel.insertMany(healthMetrics);
//       })
//       .then(() => {
//         console.log('Health data recorded in MongoDB');
//       })
//       .catch((err: any) => console.log('Error inserting health documents: ', err));
//   }, interval || 10000);
// };

// /** 5) If dockerized, collects container info on intervals */
// mongo.docker = ({ microservice, interval, mode }: any) => {
//   const containerInfo = ContainerInfoFunc(`${microservice}`);
//   dockerHelper
//     .getDockerContainer(microservice)
//     .then(containerData => {
//       setInterval(() => {
//         dockerHelper
//           .readDockerContainer(containerData)
//           .then(data => containerInfo.create(data))
//           .catch(err => {
//             throw new Error(err);
//           });
//       }, interval || 10000);
//     })
//     .catch(error => {
//       throw new Error(error);
//     });
// };

// /** 6) Called for 'kafka', 'kubernetes', or 'docker' mode to set queries on intervals */
// mongo.serverQuery = async (config: any) => {
//   await mongo.saveService(config);
//   await mongo.setQueryOnInterval(config);
// };

// /** Save the microservice entry in 'services' table */
// mongo.saveService = (config: any) => {
//   let microservice;
//   if (config.mode === 'kafka') {
//     microservice = 'kafkametrics';
//   } else if (config.mode === 'kubernetes') {
//     microservice = 'kubernetesmetrics';
//   } else if (config.mode === 'docker') {
//     microservice = `${config.containerName}`;
//   } else {
//     throw new Error('Unrecognized mode');
//   }

//   const service = new ServicesModel({
//     microservice,
//     interval: config.interval,
//   });
//   service
//     .save()
//     .then(() => console.log(`Adding "${microservice}" to the services table`))
//     .catch(err =>
//       console.log(`Error saving "${microservice}" to the services table: `, err.message)
//     );
// };

// /** Schedules queries to Prometheus or Kafka at intervals, then calls createGrafanaDashboards */
// mongo.setQueryOnInterval = async (config: any) => {
//   let model: any;
//   let metricsQuery: Function;
//   let length = 0;
//   const currentMetricNames: Record<string, boolean> = {};

//   if (config.mode === 'kafka') {
//     model = KafkaModel;
//     metricsQuery = utilities.kafkaMetricsQuery;   // if it's a function, no `await` needed
//   } else if (config.mode === 'kubernetes') {
//     model = KubernetesModel;
//     metricsQuery = utilities.promMetricsQuery;
//   } else if (config.mode === 'docker') {
//     model = ContainerInfoFunc(`${config.containerName}`);
//     metricsQuery = utilities.promMetricsQuery;
//   } else {
//     throw new Error('Unrecognized mode');
//   }

//   length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);

//   setInterval(() => {
//     metricsQuery(config)
//       .then(async (parsedArray: any[]) => {
//         console.log('parsedArray.length is: ', parsedArray.length);
//         if (length !== parsedArray.length) {
//           length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
//         }

//         if (config.mode === 'docker') {
//           const documents: any[] = [];
//           for (const metric of parsedArray) {
//             // Only store if user has 'selected' the metric
//             if (currentMetricNames[metric.metric]) {
//               documents.push(model(metric));
//             }
//           }
//           await model.insertMany(documents, (err: any) => {
//             if (err) console.error(err);
//             else console.log(`${config.mode} metrics recorded in MongoDB`);
//           });
//         }

//         const allMetrics = await model.find({});
//         console.log('allMetrics.length: ', allMetrics.length);

//         console.log('🟡 start creating dashboards 🟡');
//         await mongo.createGrafanaDashboards(config, allMetrics);
//         console.log('✅ finish creating dashboards ✅');
//       })
//       .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
//   }, config.interval || 40000);
// };

// /** Helper to map saved metrics & user selections in the DB */
// mongo.getSavedMetricsLength = async (mode: string, currentMetricNames: Record<string, boolean>) => {
//   const currentMetrics = await MetricsModel.find({ mode });
//   if (currentMetrics.length > 0) {
//     currentMetrics.forEach((el: any) => {
//       const { metric, selected } = el;
//       currentMetricNames[metric] = selected;
//     });
//   }
//   return currentMetrics.length;
// };

// /** Insert newly discovered metrics into the Metrics collection */
// mongo.addMetrics = async (healthMetrics: any[], mode: string, currentMetricNames: Record<string, boolean>) => {
//   const newMets: any[] = [];
//   for (let healthMetric of healthMetrics) {
//     const { metric, category } = healthMetric;
//     if (!(metric in currentMetricNames)) {
//       newMets.push({ metric, mode, category });
//       currentMetricNames[metric] = true;
//     }
//   }
//   await MetricsModel.create(newMets);
//   return healthMetrics.length;
// };

// /** Auto-provisions Grafana dashboards for the newly collected metrics */
// mongo.createGrafanaDashboards = async (config: any, parsedArray: any[]) => {
//   try {
//     console.log('In mongo.createGrafanaDashboards!!!');
//     console.log('Calling utilities.getGrafanaDatasource()');

//     // -> calls the newly reintroduced function
//     const datasource = await utilities.getGrafanaDatasource(config.grafanaAPIKey);

//     for (let metric of parsedArray) {
//       console.log(`🎉 creating dashboard 🎉`);
//       // -> calls the newly reintroduced function
//       await utilities.createGrafanaDashboard(metric, datasource, 'timeseries', config.grafanaAPIKey);
//     }
//   } catch (err) {
//     console.error('error in mongo.createGrafanaDashboards: ', err);
//   }
// };

// /** Optionally store the Grafana API Key in MongoDB */
// mongo.storeGrafanaAPIKey = async (config: any) => {
//   try {
//     console.log('In mongo.storeGrafanaAPIKey!!!');
//     await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
//     console.log('Grafana API Key stored in MongoDB');
//   } catch (err) {
//     console.error('error in mongo.storeGrafanaAPIKey: ', err);
//   }
// };

// export default mongo;
import mongoose from 'mongoose';
import alert from './alert';
import CommunicationModel from '../models/CommunicationModel';
import ServicesModel from '../models/ServicesModel';
import HealthModelFunc from '../models/HealthModel';
import ContainerInfoFunc from '../models/ContainerInfo';
import KafkaModel from '../models/KafkaModel';
import KubernetesModel from '../models/KubernetesModel';

// 👇 Import the *object* from healthHelpers, not a direct function
import healthHelpers from './healthHelpers';

import MetricsModel from '../models/MetricsModel';
import dockerHelper from './dockerHelper';
import utilities from './utilities';
import GrafanaAPIKeyModel from '../models/GrafanaAPIKeyModel';

mongoose.set('strictQuery', true);

const mongo: any = {};

/** 1) Connect to MongoDB */
mongo.connect = async ({ database }: { database: { URI: string } }) => {
  console.log('Attempting to connect to database...');
  try {
    await mongoose.connect(database.URI);
    console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
  } catch (error: any) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

/** 2) Create services collection */
mongo.services = ({ microservice, interval }: { microservice: string; interval: number }) => {
  console.log(`Saving "${microservice}" to services...`);
  const newService = { microservice, interval };
  const service = new ServicesModel(newService);

  service
    .save()
    .then(() => console.log(`Added new service "${microservice}"`))
    .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
};

/** 3) Logs each request/response cycle, optionally sends Slack/Email alerts */
mongo.communications = ({ microservice, slack, email }: any) => {
  console.log('Recording request cycle...');
  return function (req: any, res: any, next: any) {
    const newComms = {
      microservice,
      endpoint: req.originalUrl,
      request: req.method,
      correlatingid: res.getHeaders()['x-correlation-id'],
    };
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
        if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
      }
      newComms['responsestatus'] = res.statusCode;
      newComms['responsemessage'] = res.statusMessage;

      const communication = new CommunicationModel(newComms);
      communication
        .save()
        .then(() => console.log('Request cycle saved'))
        .catch(err => console.log(`Error saving communications: `, err.message));
    });
    next();
  };
};

/** 4) Collect health data in intervals if not dockerized */
mongo.health = async ({ microservice, interval, mode }: any) => {
  // default to 10 seconds if interval not provided
  const pollInterval = interval || 10000;

  setInterval(() => {
    // 👇 Call the object's method
    healthHelpers.collectHealthData() 
      .then(async (healthMetrics: any[]) => {
        // Insert your logic for storing metrics
        const currentMetrics = await MetricsModel.find({ mode });
        if (currentMetrics.length !== healthMetrics.length) {
          await mongo.addMetrics(healthMetrics, mode, currentMetrics);
        }
        const HealthModel = HealthModelFunc(`${microservice}`);
        await HealthModel.insertMany(healthMetrics);
      })
      .then(() => {
        console.log('Health data recorded in MongoDB');
      })
      .catch((err: any) => console.log('Error inserting health documents: ', err));
  }, pollInterval);
};

/** 5) If dockerized, collects container info on intervals */
mongo.docker = ({ microservice, interval, mode }: any) => {
  const pollInterval = interval || 10000;

  const containerInfo = ContainerInfoFunc(`${microservice}`);
  dockerHelper
    .getDockerContainer(microservice)
    .then(containerData => {
      setInterval(() => {
        dockerHelper
          .readDockerContainer(containerData)
          .then(data => containerInfo.create(data))
          .catch(err => {
            throw new Error(err);
          });
      }, pollInterval);
    })
    .catch(error => {
      throw new Error(error);
    });
};

/** 6) Called for 'kafka', 'kubernetes', or 'docker' mode to set queries on intervals */
mongo.serverQuery = async (config: any) => {
  await mongo.saveService(config);
  await mongo.setQueryOnInterval(config);
};

/** Save the microservice entry in 'services' table */
mongo.saveService = (config: any) => {
  let microservice;
  if (config.mode === 'kafka') {
    microservice = 'kafkametrics';
  } else if (config.mode === 'kubernetes') {
    microservice = 'kubernetesmetrics';
  } else if (config.mode === 'docker') {
    microservice = `${config.containerName}`;
  } else {
    throw new Error('Unrecognized mode');
  }

  const service = new ServicesModel({
    microservice,
    interval: config.interval,
  });
  service
    .save()
    .then(() => console.log(`Adding "${microservice}" to the services table`))
    .catch(err =>
      console.log(`Error saving "${microservice}" to the services table: `, err.message)
    );
};

/** Schedules queries to Prometheus or Kafka at intervals, then calls createGrafanaDashboards */
mongo.setQueryOnInterval = async (config: any) => {
  let model: any;
  let metricsQuery: Function;
  let length = 0;
  const currentMetricNames: Record<string, boolean> = {};

  if (config.mode === 'kafka') {
    model = KafkaModel;
    metricsQuery = utilities.helpers.kafkaMetricsQuery;   
  } else if (config.mode === 'kubernetes') {
    model = KubernetesModel;
    metricsQuery = utilities.helpers.promMetricsQuery;
  } else if (config.mode === 'docker') {
    model = ContainerInfoFunc(`${config.containerName}`);
    metricsQuery = utilities.helpers.promMetricsQuery;
  } else {
    throw new Error('Unrecognized mode');
  }

  length = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);

  setInterval(() => {
    metricsQuery(config)
      .then(async (parsedArray: any[]) => {
        console.log('parsedArray.length is: ', parsedArray.length);
        if (length !== parsedArray.length) {
          length = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
        }

        if (config.mode === 'docker') {
          const documents: any[] = [];
          for (const metric of parsedArray) {
            if (currentMetricNames[metric.metric]) {
              documents.push(model(metric));
            }
          }
          await model.insertMany(documents, (err: any) => {
            if (err) console.error(err);
            else console.log(`${config.mode} metrics recorded in MongoDB`);
          });
        }

        const allMetrics = await model.find({});
        console.log('allMetrics.length: ', allMetrics.length);

        console.log('🟡 start creating dashboards 🟡');
        await mongo.createGrafanaDashboards(config, allMetrics);
        console.log('✅ finish creating dashboards ✅');
      })
      .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
  }, config.interval || 40000);
};

/** Helper to map saved metrics & user selections in the DB */
mongo.getSavedMetricsLength = async (mode: string, currentMetricNames: Record<string, boolean>) => {
  const currentMetrics = await MetricsModel.find({ mode });
  if (currentMetrics.length > 0) {
    currentMetrics.forEach((el: any) => {
      const { metric, selected } = el;
      currentMetricNames[metric] = selected;
    });
  }
  return currentMetrics.length;
};

/** Insert newly discovered metrics into the Metrics collection */
mongo.addMetrics = async (healthMetrics: any[], mode: string, currentMetricNames: Record<string, boolean>) => {
  const newMets: any[] = [];
  for (let healthMetric of healthMetrics) {
    const { metric, category } = healthMetric;
    if (!(metric in currentMetricNames)) {
      newMets.push({ metric, mode, category });
      currentMetricNames[metric] = true;
    }
  }
  await MetricsModel.create(newMets);
  return healthMetrics.length;
};

/** Auto-provisions Grafana dashboards for the newly collected metrics */
mongo.createGrafanaDashboards = async (config: any, parsedArray: any[]) => {
  try {
    console.log('In mongo.createGrafanaDashboards!!!');
    console.log('Calling utilities.getGrafanaDatasource()');

    const datasource = await utilities.helpers.getGrafanaDatasource(config.grafanaAPIKey);
    for (let metric of parsedArray) {
      console.log(`🎉 creating dashboard 🎉`);
      await utilities.helpers.createGrafanaDashboard(metric, datasource, 'timeseries', config.grafanaAPIKey);
    }
  } catch (err) {
    console.error('error in mongo.createGrafanaDashboards: ', err);
  }
};

/** Optionally store the Grafana API Key in MongoDB */
mongo.storeGrafanaAPIKey = async (config: any) => {
  try {
    console.log('In mongo.storeGrafanaAPIKey!!!');
    await GrafanaAPIKeyModel.create({ token: config.grafanaAPIKey });
    console.log('Grafana API Key stored in MongoDB');
  } catch (err) {
    console.error('error in mongo.storeGrafanaAPIKey: ', err);
  }
};

export default mongo;
