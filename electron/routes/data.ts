// /* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import connectPostgres from '../databases/postgres';
import connectMongo from '../databases/mongo';
import CommunicationModel from '../models/CommunicationModel';
import ServicesModel from '../models/ServicesModel';
import DockerModelFunc from '../models/DockerModel';
import fetch from 'electron-fetch';
import { fetchData } from './dataHelpers';
import MetricsModel from '../models/MetricsModel';
const log = require('electron-log');
const User = require('../models/UserModel');

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

// v10 notes: should only be calling connect for local instances. Currently, the services array is different for
// local instances vs cloud instances but this function can still be called by cloud instances, causing an issue.
// fix below is a band-aid for now, a better solution would be optimal.
/**
 * @event   connect
 * @desc    Connects user to database and sets global currentDatabaseType which
 *          is accessed in info.commsData and info.healthData
 */
ipcMain.on(
  'connect',
  async (
    message: Electron.IpcMainEvent,
    username: string,
    index: number,
    URI: string,
    databaseType: string
  ) => {
    // set database type from parameter
    currentDatabaseType = databaseType;

    if (currentDatabaseType === 'MongoDB') {
      connectMongo(index, URI).then(data => {
        if (data) {
          // console.log('Connected to user provided MongoDB database "data.ts"');
          message.sender.send('databaseConnected', true);
        } else {
          // console.log('Failed to connect to database "data.ts"');
          message.sender.send('databaseConnected', false);
        }
      });
    } else if (currentDatabaseType === 'SQL') {
      pool = await connectPostgres(index, URI);
      if (pool) {
        // console.log('Connected to user provided PostgreSQL database');
        message.sender.send('databaseConnected', true);
      } else {
        // console.log('Failed to connect to database');
        message.sender.send('databaseConnected', false);
      }
    }
  }
);

/**
 * @event   serviceRequest/serviceResponse
 * @desc    Query to services table for all microservices of a specific app
 */
ipcMain.on('servicesRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any;
    // console.log('Hi, inside data.ts line 97 - servicesRequest. Fetching services...');

    // Mongo Database
    console.log('data.ts line 100 CurrentDataBase TYPE:', currentDatabaseType);
    if (currentDatabaseType === 'MongoDB') {
      // Get all documents from the services collection
      //>>>>>
      result = await ServicesModel.find();
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      // Get all rows from the services table
      const query = `SELECT * FROM services`;
      result = await pool.query(query);
      result = result.rows;
    }

    // console.log('Sending servicesResponse to frontend with the following result:', result);
    // Async event emitter - send response
    message.sender.send('servicesResponse', JSON.stringify(result));
    // eslint-disable-next-line no-shadow
  } catch ({ message: errMessage }) {
    console.log('Error in "servicesRequest" event', errMessage);
  }
});

/**
 * @event   commsRequest/commsResponse
 * @desc    Query for all communication data
 */
ipcMain.on('commsRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any;
    if (currentDatabaseType === 'MongoDB') {
      result = await CommunicationModel.find().exec();
      // console.log({result})
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
    if (currentDatabaseType === 'MongoDB') {
      result = await mongoFetch(service);
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      result = await postgresFetch(service, pool);
    }
    // Async event emitter - send response'
    message.sender.send('healthResponse', JSON.stringify(result));
  } catch (error) {
    // Option 1: Use type guard for error message
    if (error instanceof Error) {
      console.log('Error in "healthRequest" event: ', error.message);
    } else {
      console.log('Error in "healthRequest" event: ', error);
    }
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
      let num = await DockerModelFunc(service).countDocuments();
      num = Math.max(num, 50);
      result = await DockerModelFunc(service)
        .find()
        .skip(num - 50);
    }

    // SQL Database
    if (currentDatabaseType === 'SQL') {
      const query = `
          SELECT * FROM ${service}
          ORDER BY _id DESC
          LIMIT 50`;
      result = await pool.query(query);
      result = result.rows.reverse();
    }
    message.sender.send('dockerResponse', JSON.stringify(result));
  } catch (error) {
    message.sender.send('dockerResponse', {});
  }
});

// This event grabs the metric data from the metric database.
ipcMain.on('savedMetricsRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any = {};
    if (currentDatabaseType === 'MongoDB') {
      result = await MetricsModel.find().lean();
    }

    if (currentDatabaseType === 'SQL') {
      const query = `SELECT * FROM metrics;`;
      result = await pool.query(query);
      result = result.rows;
    }
    message.sender.send('savedMetricsResponse', result);
  } catch (err) {
    // Use type guard to access err.message
    if (err instanceof Error) {
      console.log('Error in "metricsRequest" event :', err.message);
    } else {
      console.log('Error in "metricsRequest" event :', err);
    }
  }
});

ipcMain.on('updateSavedMetrics', async (message: Electron.IpcMainEvent, args: Object[]) => {
  try {
    if (currentDatabaseType === 'MongoDB' && args.length) {
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
    }
    if (currentDatabaseType === 'SQL' && args.length) {
      args.forEach(async (el: any) => {
        await pool.query(`UPDATE metrics SET selected=${el.selected} WHERE metric='${el.metric}'`);
      });
    }
  } catch (err) {
    console.error(err);
  }
});

/**
 * @event   eventRequest/EventResponse
 * @desc
 */
function extractWord(str: string) {
  const res: any[] = [];
  const arr = str.split('\n');
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
    if (currentDatabaseType === 'MongoDB') {
      result = await mongoFetch('kafkametrics');
    }
    if (currentDatabaseType === 'SQL') {
      result = await postgresFetch('kafkametrics', pool);
    }
    message.sender.send('kafkaResponse', JSON.stringify(result));
  } catch (error) {
    message.sender.send('kafkaResponse', {});
  }
});

ipcMain.on('kubernetesRequest', async message => {
  try {
    let result: any;
    if (currentDatabaseType === 'MongoDB') {
      result = await mongoFetch('kubernetesmetrics');
    }
    if (currentDatabaseType === 'SQL') {
      result = await postgresFetch('kubernetesmetrics', pool);
    }
    message.sender.send('kubernetesResponse', JSON.stringify(result));
  } catch (error) {
    message.sender.send('kubernetesResponse', {});
  }
});

/**
 * @event   ec2MetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for EC2 instances.
 */
ipcMain.on(
  'ec2MetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];
      const [region, typeOfService, instanceId, accessKey, secretAccessKey] = [
        userAwsService[2],
        userAwsService[4],
        userAwsService[6],
        userAwsService[7],
        userAwsService[8],
      ];
      const cloudwatch = new AWS.CloudWatch({
        region: region,
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      });
      const metricsNamesArray = ['CPUUtilization', 'NetworkIn', 'NetworkOut', 'DiskReadBytes'];
      const paramsArray = metricsNamesArray.map(metric => {
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
        const fetched: any = {};
        for (let i = 0; i < paramsArray.length; i++) {
          const data = await cloudwatch.getMetricStatistics(paramsArray[i]).promise();
          const newData = data.Datapoints.map((el, index: number) => {
            let transformedData = {};
            transformedData['time'] = data.Datapoints[index].Timestamp;
            transformedData['metric'] = data.Label;
            transformedData['value'] = data.Datapoints[index].Average;
            transformedData['unit'] = data.Datapoints[index].Unit;
            return transformedData;
          });
          fetched[paramsArray[i].MetricName] = newData;
        }
        return fetched;
      };
      fetchData().then(data => {
        message.sender.send('ec2MetricsResponse', JSON.stringify(data));
      });
    } catch (err) {
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
 * @event   ecsMetricsRequest
 * @desc    Connects user to Cloudwatch using aws-sdk and fetches data for ECS Clusters/Services.
 */
ipcMain.on(
  'ecsMetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
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
      const ecsData: any = {};
      cloudwatch.listMetrics(listMetricsParams, (err, data) => {
        if (err) {
          // console.log('Error', err);
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

// returns response object containing the typeOfService, region, and awsURL for a selected AWS APP
ipcMain.on(
  'awsAppInfoRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    if (username !== 'guest') {
      return User.findOne({ username: username })
        .then(data => {
          const { services } = data;
          const [typeOfService, region, awsUrl] = [services[4], services[2], services[9]];
          const response = { typeOfService, region, awsUrl };
          message.sender.send('awsAppInfoResponse', JSON.stringify(response));
        })
        .catch(error => {
          console.log('Error in awsAppInfoRequest in data.ts');
        });
    } else {
      try {
        const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
        const userAwsService = fileContents[username]?.services[appIndex];
        const [typeOfService, region, awsUrl] = [
          userAwsService[4],
          userAwsService[2],
          userAwsService[9],
        ];
        const response = { typeOfService, region, awsUrl };
        message.sender.send('awsAppInfoResponse', JSON.stringify(response));
      } catch (err) {
        message.sender.send('awsAppInfoResponse', { typeOfService: '', region: '', awsUrl: '' });
      }
    }
  }
);

ipcMain.on(
  'eksMetricsRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
    const userAwsService = fileContents[username]?.services[appIndex];
    const [typeOfService, region, awsUrl] = [
      userAwsService[4],
      userAwsService[2],
      userAwsService[9],
    ];
    const url = `${awsUrl}/api/search?folderIds=0`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJrIjoiamN4UGRKVHg3cUQyZ201N042NW41bHg5bGhJaVFlaFciLCJuIjoidGVzdEtleSIsImlkIjoxfQ==',
      },
    });
    log.info(response);
    const data = await response.json();
    message.sender.send('eksMetricsResponse', JSON.stringify(data));
  }
);

ipcMain.on(
  'awsAppInfoRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    try {
      const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
      const userAwsService = fileContents[username]?.services[appIndex];
      const [typeOfService, region, awsUrl] = [
        userAwsService[4],
        userAwsService[2],
        userAwsService[9],
      ];
      const response = { typeOfService, region, awsUrl };
      message.sender.send('awsAppInfoResponse', JSON.stringify(response));
    } catch (err) {
      message.sender.send('awsAppInfoResponse', { typeOfService: '', region: '' });
    }
  }
);
