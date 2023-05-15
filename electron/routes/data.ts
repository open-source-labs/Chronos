/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
const log = require('electron-log');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
import fetch, { FetchError } from 'electron-fetch';
import { fetchData } from './dataHelpers';
import connectPostgres from '../databases/postgres';
import connectMongo from '../databases/mongo';
// import mongodb models:
import CommunicationModel from '../models/CommunicationsModel';
import HealthModelFunc from '../models/HealthModel';
import ServicesModel from '../models/ServicesModel';
import DockerModelFunc from '../models/DockerModel';
import KafkaModel from '../models/KafkaModel';
import MetricsModel from '../models/MetricsModel';
const User = require('../models/UserModel');


const mongoFetch = fetchData.mongoFetch;
const postgresFetch = fetchData.postgresFetch;


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
// fix below is a band-aid for now, a better solution would be optimal. Multiple calls to different SQL databases has not been tested.
/**
 * @event   connect - being called by ipcRenderer in ApplicationContext.tsx to establish connection to user provided database
 *          for local instances.
 * @desc    Connects user to database and sets global currentDatabaseType which
 *          is referenced throughout ipcMain.on functions
 * @returns (to ipcMain) true or false
 */

ipcMain.on('connect', async (message: Electron.IpcMainEvent, username: string, index: number, URI: string, databaseType: string) => {
  
  try{
    // set database type from parameter
    currentDatabaseType = databaseType;
    console.log('Database type: ', databaseType);
    if(currentDatabaseType === 'MongoDB'){
      // First check if there is already an established mongoose connection with another databse...
      const isConnected = mongoose.connection.readyState === 1;
      if (isConnected){
        console.log('A connection to a mongoDB has already been established. Closing connection.');
        mongoose.connection.close((error) => {
          if(error) {
            console.log('Error closing mongoDB connection: ', error);
          }
        });
      } 
      console.log('Database connection not found. Establishing connection...');
        // Connect to the proper database
      mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log('Connected to user provided mongo database!');
          message.sender.send('databaseConnected', true);
      })
      .catch(error => {
          message.sender.send('databaseConnected', false);
          console.log('Error connecting to MongoDB inside data.ts connection:', error);
      });  
    } else if (currentDatabaseType === 'SQL'){
      // has not been reconfigured to handle different requests to SQL databses.
       pool = await connectPostgres(index, URI);
        message.sender.send('databaseConnected', 'connected!');
    } 
  } catch(err){
    message.sender.send('databaseConnected', false);
    console.log('Error connecting to databse: ', err);
  }
});

// v10 notes: could improve error handling
/**
 * @event   serviceRequest/serviceResponse - called by ipcRenderer.on in ApplicationContext.tsx to set array of services
 *          being monitored for local instances. 
 * @desc    Query to services table for all microservices of a specific app
 * @returns (to ipcMain) an array of queried results of user services
 */
ipcMain.on('servicesRequest', async (message: Electron.IpcMainEvent) => {
  try {
    let result: any;
    console.log('Hi, inside data.ts - servicesRequest function. Fetching services...');

    // Mongo Database
    console.log('CurrentDataBase TYPE:', currentDatabaseType);
    if (currentDatabaseType === 'MongoDB' ) {
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

// v10 notes: SQL instances not tested.
/**
 * @event   commsRequest/commsResponse - called by CommsContext.tsx
 * @desc    Queries communication data for local instances
 * @returns queried result 
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
 * @returns 'healthResponse' and queried results
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
 * @event   dockerRequest/dockerResponse
 * @desc    Query for health data for a particular microservice (last 50 data points)
 * @returns 'dockerResponse' and queried results
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

/**
 * @event   savedMetricsRequest/savedMetricsResponse
 * @desc    Query for metrics saved by user 
 * @returns 'savedMetricsRequest' and queried results
 */
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

/**
 * @event   updateSavedMetrics
 * @desc    updates saved metrics in user databased
 * @returns 'dockerResponse' and queried results
 */
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


// // start fetch
// function extractWord(str: string) {
//   const res: any[] = [];
//   const arr = str.split('\n'); // `/\n/`
//   for (const element of arr) {
//     if (
//       element &&
//       element.length !== 0 &&
//       element[0] !== '#' &&
//       element.substring(0, 3) !== 'jmx' &&
//       element.substring(0, 4) !== "'jmx"
//     ) {
//       const metric = element.split(' ')[0];
//       const metricValue = Number(element.split(' ')[1]);
//       const time = Date.now();
//       const temp = { metric: metric, category: 'Event', value: metricValue, time: time };
//       res.push(temp);
//     }
//   }
//   return res;
// }

/**
 * @event   kafkaRequest/kafkaResponse
 * @desc    makes call using mongoFetch or postgresFetch which returns kafka queried results
 * @returns 'kafkaResponse' and queried results
 */
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

/**
 * @event   kubernetesRequest/kafkaResponse
 * @desc    makes call using mongoFetch or postgresFetch
 * @returns 'kubernetesResponse' and queried results
 */
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
 * @event   awsAppInfoRequest - invoked in fetchAwsAppInfo in ipcRenderer
 * @desc    Connects to user or guest database and returns a reponse object with the typeOfService,
 *          region, and awsURL of the services at provided appIndex.
 * @params  username: 
 *          index: 
 * @returns 'awsAppInfoResponse' to ipcRenderer and a response object containing the typeOfService, region, and awsURL for a selected AWS App
 */
ipcMain.on(
  'awsAppInfoRequest',
  async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
    console.log('Hi, inside data.ts - awsAppInfoRequest');
    if(username !== 'guest'){
      console.log('inside awsAppInfoRequest, not a guest');
      return User.findOne({username: username})
      .then((data) => {
        console.log('DB returned user data: ', data);
        const { services } = data;
        const [typeOfService, region, awsUrl] = [services[4], services[2], services[9]];
        const response = {
          typeOfService, region, awsUrl
        }
        message.sender.send('awsAppInfoResponse', JSON.stringify(response));
      })
      .catch((error) => {
        console.log('Error in awsAppInfoRequest in data.ts');
      })
    }
    else {
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
      message.sender.send('awsAppInfoResponse', { typeOfService: '', region: '' , awsUrl: ''});
    }
    }
    
  }
);

// v10 notes: function that was left over in data.ts. Have not found any instance where it is
// invoked but did not want to delete unless it is needed by another team. 
// // start fetch
// function extractWord(str: string) {
//   const res: any[] = [];
//   const arr = str.split('\n'); // `/\n/`
//   for (const element of arr) {
//     if (
//       element &&
//       element.length !== 0 &&
//       element[0] !== '#' &&
//       element.substring(0, 3) !== 'jmx' &&
//       element.substring(0, 4) !== "'jmx"
//     ) {
//       const metric = element.split(' ')[0];
//       const metricValue = Number(element.split(' ')[1]);
//       const time = Date.now();
//       const temp = { metric: metric, category: 'Event', value: metricValue, time: time };
//       res.push(temp);
//     }
//   }
//   return res;
// }

//   /**
//  * @event   awsAppInfoRequest - invoked in fetchAwsAppInfo in ipcRenderer
//  * @desc    Connects to user or guest database and returns a reponse object with the typeOfService,
//  *          region, and awsURL of the services at provided appIndex.
//  * @params  username: 
//  *          index: 
//  */
// ipcMain.on(
//   'awsAppInfoRequest',
//   async (message: Electron.IpcMainEvent, username: string, appIndex: number) => {
//     try {
//       const fileContents = JSON.parse(fs.readFileSync(settingsLocation, 'utf8'));
//       const userAwsService = fileContents[username]?.services[appIndex];

//       const [typeOfService, region, awsUrl] = [userAwsService[4], userAwsService[2], userAwsService[9]];
//       const response = {
//         typeOfService: typeOfService,
//         region: region,
//         awsUrl: awsUrl
//       };

//       message.sender.send('awsAppInfoResponse', JSON.stringify(response));
//     } catch (err) {
//       console.log('Error in awsAppInfoRequest', message);
//       message.sender.send('awsAppInfoResponse', { typeOfService: '', region: '' });
//     }
//   }
// );