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

require('dotenv').config();
// Initiate pool variable for SQL setup
let pool: any;

// Stores database type: 1) MongoDB or 2) SQL
let currentDatabaseType: string;

/**
 * @event   connect
 * @desc    Connects user to database and sets global currentDatabaseType which
 *          is accessed in info.commsData and info.healthData
 */
let settingsLocation;
if (process.env.NODE_ENV === 'development')
  settingsLocation = path.resolve(__dirname, '../../__tests__/test_settings.json');
else settingsLocation = path.resolve(__dirname, '../../settings.json');
ipcMain.on('connect', async (message: Electron.IpcMainEvent, index: number) => {
  try {
    // Extract databaseType and URI from settings.json at particular index
    // get index from application context
    const fileContents = fs.readFileSync(settingsLocation, 'utf8');

    const userDatabase = JSON.parse(fileContents).services[index];
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
    let result: any;

    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      // Get all documents from the services collection
      result = await MetricsModel.find().exec();
    }

    // SQL Database
    // if (currentDatabaseType === 'SQL') {
    //   // Get all rows from the services table
    //   const query = `SELECT * FROM services`;
    //   result = await pool.query(query);
    //   result = result.rows;
    // }

    // Async event emitter - send response
    message.sender.send('savedMetricsResponse', result);
    // eslint-disable-next-line no-shadow
  } catch ({ message }) {
    console.log('Error in "metricsRequest" event :', message);
  }
});



/**
 * @event   eventRequest/EventResponse
 * @desc    
 */


// start fetch
function extractWord(str: string) {
  const res :any[] = [];
  const arr = str.split('\n'); // `/\n/`
  for (const element of arr) {
    if (element && element.length !== 0 && element[0] !== '#' && element.substring(0, 3) !== 'jmx' && element.substring(0, 4) !== '\'jmx') {
      const metric = element.split(' ')[0];
      const metricValue = Number(element.split(' ')[1]);
      const time = Date.now();
      const temp = {'metric': metric, 'category': 'Event', 'value': metricValue, 'time': time };
      res.push(temp);
    }
  }
  return res;
}

ipcMain.on('kafkaRequest', async (message) => {
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
ipcMain.on('kubernetesRequest', async (message) => {
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



// end fetch
