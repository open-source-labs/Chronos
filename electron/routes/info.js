const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const connectSQL = require('../models/relational/postgres');
const connectMongoose = require('../models/nonrelational/connect');
const CommunicationSchema = require('../models/nonrelational/communicatonSchema');
const HealthSchema = require('../models/nonrelational/healthSchema');
const ServicesSchema = require('../models/nonrelational/servicesSchema');

// Controller
const info = {};

// Initiate pool variable for SQL setup
let pool;

// Stores database type: 1) MongoDB or 2) SQL
let currentDatabaseType;

/**
 * @event   connect
 * @desc    Connects user to database and sets global currentDatabaseType which
 *          is accessed in info.commsData and info.healthData
 */

// GET SERIVCES!

info.connect = () => {
  ipcMain.on('connect', (message, index) => {
    // Extract databaseType and URI from settings.json at particular index
    // get index from application context
    const fileContents = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    });

    const userDatabase = JSON.parse(fileContents).services[index];
    // We get index from sidebar container: which is the mapplication (DEMO)
    const [databaseType, URI] = [userDatabase[1], userDatabase[2]];

    // Connect to the proper database
    if (databaseType === 'MongoDB') connectMongoose(index, URI);
    if (databaseType === 'SQL') pool = connectSQL(index, URI);

    // Currently set to a global variable
    currentDatabaseType = databaseType;
  });
};

/**
 * @event   serviceRequest/serviceResponse
 * @desc    Query to services table for all entries
 */
info.getServices = () => {
  ipcMain.on('servicesRequest', async message => {
    let result;

    // Mongo Database
    if (currentDatabaseType === 'MongoDB') {
      // Get all documents from the services collection
      result = await ServicesSchema.find();
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
  });
};

/**
 * @event   commsRequest/commsResponse
 * @desc    Query for comms data
 */

info.commsData = () => {
  console.log('ipc call to comms');

  ipcMain.on('commsRequest', async (message, index) => {
    try {
      let result;

      // Mongo Database
      if (currentDatabaseType === 'MongoDB') {
        // Get all documents
        result = await CommunicationSchema.find().exec();
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
      console.log('Error in info.commsData', error.message);
      message.sender.send('commsResponse', {});
    }
  });
};

/**
 * @event   healthRequest/healthResponse
 * @desc    Query for health data for a particular microservice (last 50 data points)
 */
info.healthData = () => {
  console.log('ipc call to health');

  ipcMain.on('healthRequest', async (message, service) => {
    try {
      let result;

      // Mongo Database
      if (currentDatabaseType === 'MongoDB') {
        // Get document count
        let num = await HealthSchema.countDocuments();

        // Get last 50 documents. If less than 50 documents, get all
        num = Math.max(num, 50);
        result = await HealthSchema(service)
          .find()
          .skip(num - 50);
      }

      // SQL Database
      if (currentDatabaseType === 'SQL') {
        // Get last 50 documents. If less than 50 get all
        const query = `
          SELECT * FROM $1
          ORDER BY id DESC
          LIMIT 50`;

        // Execute query
        result = await pool.query(query, [service]);
        result = result.rows.reverse();
      }

      // Async event emitter - send response
      message.sender.send('healthResponse', JSON.stringify(result));
    } catch (error) {
      // Catch errors
      console.log('Error in info.healthData', error.message);
      message.sender.send('healthResponse', {});
    }
  });
};

module.exports = info;
