/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import connectPostgres from '../databases/postgres';
import connectMongo from '../databases/mongo';
import CommunicationModel from '../models/CommunicationsModel';
import HealthModelFunc from '../models/HealthModel';
import ServicesModel from '../models/ServicesModel';
import DockerModelFunc from '../models/DockerModel';
import KafkaModel from '../models/KafkaModel';
import fetch, { FetchError } from 'electron-fetch';
//import { postgresFetch, mongoFetch }  from './dataHelpers';
import { fetchData } from './dataHelpers';
import MetricsModel from '../models/MetricsModel';

const mongoFetch = fetchData.mongoFetch;
const postgresFetch = fetchData.postgresFetch;
const AWS = require('aws-sdk');

require('dotenv').config({
  path: path.join(__dirname, './.env'),
});
// Initiate pool variable for SQL setup
let pool: any;

// Stores database type: 1) MongoDB or 2) SQL
let currentDatabaseType: string;

// Provide location to settings.json
const settingsLocation = path.resolve(__dirname, '../../settings.json');

/**
 * @event   connect
 * @desc    Connects user to database and sets global currentDatabaseType which
 *          is accessed in info.commsData and info.healthData
 */
ipcMain.on('connect', async (message: Electron.IpcMainEvent, username: string, index: number) => {
  try {
    // Extract databaseType and URI from settings.json at particular index
    // get index from application context
    const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
    const userDatabase = fileContents[username].services[index];
    // We get index from sidebar container: which is the mapplication (DEMO)
    const [databaseType, URI] = [userDatabase[1], userDatabase[2]];

    // Connect to the proper database
    if (databaseType === 'MongoDB') await connectMongo(index, URI);
    if (databaseType === 'SQL') pool = await connectPostgres(index, URI);

    // Currently set to a global variable
    currentDatabaseType = databaseType;

    message.sender.send('databaseConnected', 'connected!');
    // eslint-disable-next-line no-shadow
  } catch ({ message }) {
    console.log('Error in "connect" event', message);
  }
});

/**
 * @event   serviceRequest/serviceResponse
 * @desc    Query to services table for all microservices of a specific app
 */
ipcMain.on('servicesRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any;

    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      // Get all documents from the services collection
      result = await ServicesModel.find();
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get all rows from the services table
      const query = `SELECT * FROM services`;
      result = await pool.query(query);
      result = result.rows;
    }

    // Async event emitter - send response
    message.sender.send('servicesResponse', JSON.stringify(result));
    // eslint-disable-next-line no-shadow
  } catch ({ message }) {
    console.log('Error in "servicesRequest" event', message);
  }
});

/**
 * @event   commsRequest/commsResponse
 * @desc    Query for all communication data
 */
ipcMain.on('commsRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any;

    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      // Get all documents
      result = await CommunicationModel.find().exec();
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get all rows
      const getCommunications = 'SELECT * FROM communications';
      result = await pool.query(getCommunications);
      result = result.rows;
    }

    // Async event emitter - send response
    message.sender.send('commsResponse', JSON.stringify(result));
  } catch (error) {
    // Catch errors
    console.log('Error in "commsRequest" event: ', error);
  }
});

/**
 * @event   healthRequest/healthResponse
 * @desc    Query for health data for a particular microservice (last 50 data points)
 */
ipcMain.on('healthRequest', async (message: Electron.IpcMainEvent, service: string) => {
  try {
    let result: any;

    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      result = await mongoFetch(service);
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get last 50 documents. If less than 50 get all
      result = await postgresFetch(service, pool);
    }

    // Async event emitter - send response'

    message.sender.send('healthResponse', JSON.stringify(result));
  } catch (error) {
    // Catch errors
    console.log('Error in "healthRequest" event', message);
    message.sender.send('healthResponse', {});
  }
});

/**
 * @event   dockerRequest/DockerResponse
 * @desc    Query for health data for a particular microservice (last 50 data points)
 */
ipcMain.on('dockerRequest', async (message, service) => {
  try {
    let result: any;
    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      // Get document count
      let num = await DockerModelFunc(service).countDocuments();
      // Get last 50 documents. If less than 50 documents, get all
      num = Math.max(num, 50);
      result = await DockerModelFunc(service)
        .find()
        .skip(num - 50);
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get last 50 documents. If less than 50 get all
      const query = `
          SELECT * FROM ${service}
          ORDER BY _id DESC
          LIMIT 50`;

      // Execute query
      result = await pool.query(query);
      result = result.rows.reverse();
    }

    // Async event emitter - send response
    message.sender.send('dockerResponse', JSON.stringify(result));
  } catch (error) {
    // Catch errors
    console.log('Error in "dockerRequest" event', message);
    message.sender.send('dockerResponse', {});
  }
});

// This event allows the user to change which metrics are saved by the database, so that their database doesn't get bloated with unnecessary data that they don't actually want.
ipcMain.on('savedMetricsRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any = {};

    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      // Get all documents from the services collection
      result = await MetricsModel.find().lean();
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get all rows from the metrics table
      const query = `SELECT * FROM metrics;`;
      result = await pool.query(query);
      result = result.rows;
    }

    // Async event emitter - send response
    message.sender.send('savedMetricsResponse', result);
    // eslint-disable-next-line no-shadow
  } catch (err) {
    if (err) console.log('Error in "metricsRequest" event :', err.message);
  }
});

ipcMain.on('updateSavedMetrics', async (message: Electron.IpcMainEvent, args: Object[]) => {
  try {
    // Mongo Database
    if (currentDatabaseType === 'MongoDB' && args.length) {
      // Update the 'selected' option for each metric
      args.forEach(async (el: any) => {
        await MetricsModel.updateOne(
          { metric: el.metric },
          {
            $set: {
              selected: el.selected,
            },
          }
        );
      });
      // let result = await MetricsModel.update();
    }
    if (currentDatabaseType === 'SQL' && args.length) {
      args.forEach(async (el: any) => {
        await pool.query(`UPDATE metrics SET selected=${el.selected} WHERE metric='${el.metric}'`);
      });
    }
  } catch (err) {
    if (err) console.error(err);
  }
});

/**
 * @event   eventRequest/EventResponse
 * @desc
 */

// start fetch
function extractWord(str: string) {
  const res: any[] = [];
  const arr = str.split('\n'); // `/\n/`
  for (const element of arr) {
    if (
      element &&
      element.length !== 0 &&
      element[0] !== '#' &&
      element.substring(0, 3) !== 'jmx' &&
      element.substring(0, 4) !== "'jmx"
    ) {
      const metric = element.split(' ')[0];
      const metricValue = Number(element.split(' ')[1]);
      const time = Date.now();
      const temp = { metric: metric, category: 'Event', value: metricValue, time: time };
      res.push(temp);
    }
  }
  return res;
}

ipcMain.on('kafkaRequest', async message => {
  try {
    let result: any;
    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      result = await mongoFetch('kafkametrics');
    }
    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get last 50 documents. If less than 50 get all
      result = await postgresFetch('kafkametrics', pool);
    }

    message.sender.send('kafkaResponse', JSON.stringify(result));
  } catch (error) {
    // Catch errors
    console.log('Error in "kakfaRequest" event', message);
    message.sender.send('kafkaResponse', {});
  }
});

// JJ-ADDITION
ipcMain.on('kubernetesRequest', async message => {
  try {
    let result: any;
    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      result = await mongoFetch('kubernetesmetrics');
    }
    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get last 50 documents. If less than 50 get all
      result = await postgresFetch('kubernetesmetrics', pool);
    }
    message.sender.send('kubernetesResponse', JSON.stringify(result));
  } catch (error) {
    // Catch errors
    console.log('Error in "kubernetesRequest" event', message);
    message.sender.send('kubernetesResponse', {});
  }
});

/**
 * @event   event ec2MetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for EC2 instances
 *          with the passed in parameters
 * @params  username: current user from DashboardContext
 *          appIndex: clicked card's index in the application array from ApplicationContext
 */
ipcMain.on(
  'ec2MetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      // find the clicked service in settings
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];

      // grab variables needed in the parameters for Cloudwatch
      const [region, typeOfService, instanceId, accessKey, secretAccessKey] = [
        userAwsService[2],
        userAwsService[4],
        userAwsService[6],
        userAwsService[7],
        userAwsService[8],
      ];

      // create a new Cloudwatch instance
      const cloudwatch = new AWS.CloudWatch({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      });

      // metrics being requested. Each metric will get its own graph in AwsGraphContainer. List of metrics available can be found in AWS Documentation
      const metricsNamesArray = ['CPUUtilization', 'NetworkIn', 'NetworkOut', 'DiskReadBytes'];

      const paramsArray = metricsNamesArray.map(metric => {
        // param needed for Cloudwatch to fetch data, highly opinionated boilerplate
        const params = {
          EndTime: new Date(),
          MetricName: metric,
          Namespace: typeOfService,
          Period: 60,
          StartTime: new Date(new Date().getTime() - 60 * 60 * 1000),
          Statistics: ['Average'],
          Dimensions: [
            {
              Name: 'InstanceId',
              Value: instanceId,
            },
          ],
        };

        return params;
      });

      const fetchData = async () => {
        const fetched = {};

        for (let i = 0; i < paramsArray.length; i++) {
          // getMetricsStatistics: the fetch method using the current params
          const data = await cloudwatch.getMetricStatistics(paramsArray[i]).promise();

          // transform data in format for frontend to render graphs
          const newData = data.Datapoints.map((el, index: number) => {
            let transformedData = {};

            (transformedData['time'] = data.Datapoints[index].Timestamp),
              (transformedData['metric'] = data.Label),
              (transformedData['value'] = data.Datapoints[index].Average),
              (transformedData['unit'] = data.Datapoints[index].Unit);

            return transformedData;
          });

          fetched[paramsArray[i].MetricName] = newData;
        }

        return fetched;
      };

      fetchData().then(data => {
        message.sender.send('ec2MetricsResponse', JSON.stringify(data)); // send data to frontend
      });
    } catch (err) {
      console.log('Error in "ec2MetricsRequest" event', message);
      message.sender.send('ec2MetricsResponse', {
        CPUUtilization: [],
        NetworkIn: [],
        NetworkOut: [],
        DiskReadBytes: [],
      });
    }
  }
);

/**
 * @event   event ecsMetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for ECS Clusters/Services
 *          with the passed in parameters
 * @params  username: current user from DashboardContext
 *          appIndex: clicked card's index in the application array from ApplicationContext
 */
ipcMain.on(
  'ecsMetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      // similar function architecture as EC2 fetch request
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];

      const [region, typeOfService, accessKey, secretAccessKey] = [
        userAwsService[2],
        userAwsService[4],
        userAwsService[7],
        userAwsService[8],
      ];

      const cloudwatch = new AWS.CloudWatch({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      });

      const listMetricsParams = {
        Namespace: 'AWS/ECS',
      };

      let clusterName: string = '';
      const serviceNames: string[] = [];
      const ecsData = {};

      cloudwatch.listMetrics(listMetricsParams, (err, data) => {
        if (err) {
          console.log('Error', err);
        } else {
          for (let i = 0; i < data.Metrics.length; i++) {
            const dimensions: any[] = data.Metrics[i].Dimensions;

            for (let j = 0; j < dimensions.length; j++) {
              if (dimensions[j].Name === 'ClusterName') {
                clusterName = dimensions[j].Value;
              }

              if (dimensions[j].Name === 'ServiceName') {
                if (!serviceNames.includes(dimensions[j].Value)) {
                  serviceNames.push(dimensions[j].Value);
                }
              }
            }
          }
        }

        const fetchData = async () => {
          if (clusterName !== '' && serviceNames.length !== 0) {
            for (let i = 0; i < serviceNames.length; i++) {
              let currentService = serviceNames[i];

              // cluster may have multiple services, and each service needs its own parameter
              const params = {
                MetricDataQueries: [
                  {
                    Id: 'm1',
                    MetricStat: {
                      Metric: {
                        Namespace: 'AWS/ECS',
                        MetricName: 'CPUUtilization',
                        Dimensions: [
                          {
                            Name: 'ClusterName',
                            Value: clusterName,
                          },
                          {
                            Name: 'ServiceName',
                            Value: currentService,
                          },
                        ],
                      },
                      Period: 60,
                      Stat: 'Average',
                    },
                    ReturnData: true,
                  },
                  {
                    Id: 'm2',
                    MetricStat: {
                      Metric: {
                        Namespace: 'AWS/ECS',
                        MetricName: 'MemoryUtilization',
                        Dimensions: [
                          {
                            Name: 'ClusterName',
                            Value: clusterName,
                          },
                          {
                            Name: 'ServiceName',
                            Value: currentService,
                          },
                        ],
                      },
                      Period: 60,
                      Stat: 'Average',
                    },
                    ReturnData: true,
                  },
                ],
                StartTime: new Date(Date.now() - 60 * 60 * 1000),
                EndTime: new Date(),
                ScanBy: 'TimestampDescending',
              };

              const data = await cloudwatch.getMetricData(params).promise();

              ecsData[currentService] = {
                CPUUtilization: {
                  value: data.MetricDataResults[0].Values,
                  time: data.MetricDataResults[0].Timestamps,
                },
                MemoryUtilization: {
                  value: data.MetricDataResults[1].Values,
                  time: data.MetricDataResults[1].Timestamps,
                },
              };
            }
          }

          ecsData['clusterInfo'] = {
            clusterName: clusterName,
            region: region,
            typeOfService: typeOfService,
          };
          return ecsData;
        };

        fetchData().then(data => {
          message.sender.send('ecsMetricsResponse', JSON.stringify(data));
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
);

ipcMain.on(
  'awsAppInfoRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];

      const [typeOfService, region, awsUrl] = [userAwsService[4], userAwsService[2], userAwsService[9]];
      const response = {
        typeOfService: typeOfService,
        region: region,
        awsUrl: awsUrl
      };

      message.sender.send('awsAppInfoResponse', JSON.stringify(response));
    } catch (err) {
      console.log('Error in awsAppInfoRequest', message);
      message.sender.send('awsAppInfoResponse', { typeOfService: '', region: '' });
    }
  }
);

// ipcMain.on(
//   'eksMetricsRequest',
//   async (message: Electron.IpcMainEvent, username: string, appIndex: number, clusterUrl: string) => {
//     try {
//       // similar function architecture as EC2 fetch request
//       const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
//       //const userAwsService = fileContents[username]?.services[appIndex];
//       // set the username and password 
//       const username = 'admin';
//       const password = 'prom-operator';
//       // Encode username and password (required to send via fetch)
//       // we have to coed in the user and password so that we can get into the grafana api
//       const encodedCredentials = btoa(`${username}:${password}`);
  

//     // possibly hve to change these?
//       let clusterName: string = '';
//       const serviceNames: string[] = [];
//       const ecsData = {};
//       const dashboardSearchStrings = {
//         nodeExporterUId: 'Node%20Exporter%20/%20Nodes',
//         prometheusUId: 'Prometheus%20/%20Overview',
//         kubeletUId: 'Kubernetes%20/%20Kubelet',
//         apiServerUId: 'Kubernetes%20/%20API%20Server',
//       };
//       const response = await fetch(
//         // make a get request to the cluster url through the grafana api and get the data 
//         `${clusterUrl}/api/dashboards/db`,
//         {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Basic ${encodedCredentials}`,
//           },
//         }
//       )
//       // we'll used this pared data to show the dashboard 
//       const parsed  = await response.json();

//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

//end fetch
