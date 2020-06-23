const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const connectSQL = require('../model/sql-connect');
const connectMongoose = require('../model/mongoose-connect');
const CommunicationSchema = require('../model/mongoose-communicatonSchema');
const HealthSchema = require('../model/mongoose-healthInfoSchema');

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
info.connect = () => {
  ipcMain.on('connect', (message, index) => {
    // Extract databaseType and URI from settings.json at particular index
    const fileContents = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    });

    const userDatabase = JSON.parse(fileContents).services[index];
    const [databaseType, URI] = [userDatabase[1], userDatabase[2]];

    // Connect to the proper database
    if (databaseType === 'MongoDB') connectMongoose(index, URI);
    if (databaseType === 'SQL') pool = connectSQL(index, URI);

    // Currently set to a global variable
    currentDatabaseType = databaseType;
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
        // const num = await CommunicationSchema.countDocuments();
        result = await CommunicationSchema.find().exec();
      }

      // SQL Database
      if (currentDatabaseType === 'SQL') {
        // Get all rows
        const getCommunications = 'SELECT * FROM communications';
        result = pool.query(getCommunications);
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
 * @desc    Query for health data (last 50 data points)
 */
info.healthData = () => {
  console.log('ipc call to health');

  ipcMain.on('healthRequest', async (message, index) => {
    try {
      let result;

      // Mongo Database
      if (currentDatabaseType === 'MongoDB') {
        // Get number of documents
        let num = await HealthSchema.countDocuments();

        // Get last 50 documents. If less than 50 documents, get all
        num = Math.max(num, 50);
        result = await HealthSchema.find().skip(num - 50);
      }

      // SQL Database
      if (currentDatabaseType === 'SQL') {
        // Get last 50 documents. If less than 50 get all
        const query = `
          SELECT * FROM healthInfo
          ORDER BY id DESC
          LIMIT 50`;

        // Execute query
        result = await pool.query(query);
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

/**
 * Gets application data, including all its microservices
 */
info.appData = () => {
  ipcMain.on('appData', (message, index) => {});
};

module.exports = info;
