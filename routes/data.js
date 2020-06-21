const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const connectSQL = require('../model/sql-connect');
const connectMongoose = require('../model/mongoose-connect');
const CommunicationSchema = require('../model/mongoose-communicatonSchema');
const HealthInfoSchema = require('../model/mongoose-healthInfoSchema');

let pool;
const data = {};

data.overviewRequest = () => {
  // Queries the database for communications information and returns it back to the render process.
  ipcMain.on('overviewRequest', (message, index) => {
    console.log('hello from overview request');
    const { services } = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
      })
    );

    const databaseType = services[index][1];
    const URI = services[index][2];

    if (databaseType === 'MongoDB') {
      connectMongoose(index, URI);
      CommunicationSchema.find({}, (err, data) => {
        if (err) {
          console.log(`An error occured while querying the database: ${err}`);
          message.sender.send('overviewResponse', JSON.stringify(err));
        }

        const queryResults = JSON.stringify(data);
        // Asynchronous event emitter used to transmit query results back to the render process.
        message.sender.send('overviewResponse', queryResults);
      });
    }

    if (databaseType === 'SQL') {
      pool = connectSQL(index, URI);
      const getCommunications = 'SELECT * FROM communications';
      pool.query(getCommunications, (err, result) => {
        if (err) {
          // error object to log to Electron GUI ---> Ousman
          const errorAlert = {
            type: 'error',
            title: 'Error in Main process',
            message:
              'Database information could not be retreived. Check that table exists.'
          };

          // after requiring dialog in the topmost section of main. We invoke the method showMessagebox passing the error object we created --> Ousman
          dialog.showMessageBox(errorAlert);

          message.sender.send(
            JSON.stringify('Database info could not be retreived.')
          );
        } else {
          console.log('Connected to SQL Database');
          const queryResults = JSON.stringify(result.rows);
          // Asynchronous event emitter used to transmit query results back to the render process.
          console.log('ipcMain about to send overviewResponse message');
          message.sender.send('overviewResponse', queryResults);
        }
      });
    }
  });
};

data.detailsRequest = () => {
  ipcMain.on('detailsRequest', (message, index) => {
    console.log('detailsRequest message received');
    const databaseType = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
      })
    ).services[index][1];

    if (databaseType === 'MongoDB') {
      HealthInfoSchema.find({}, (err, data) => {
        if (err) {
          message.sender.send('detailsResponse', JSON.stringify(err));
        }
        const queryResults = JSON.stringify(data);
        // Asynchronous event emitter used to transmit query results back to the render process.
        message.sender.send('detailsResponse', queryResults);
        console.log('Message Sent');
      });
    }

    if (databaseType === 'SQL') {
      const getHealth = 'SELECT * FROM healthInfo';
      pool.query(getHealth, (err, result) => {
        if (err) {
          message.sender.send(
            'detailsResponse',
            JSON.stringify('Database info could not be retreived.')
          );
        }
        const queryResults = JSON.stringify(result.rows);
        // Asynchronous event emitter used to transmit query results back to the render process.
        // console.log('healthInfo data about to comeback');
        message.sender.send('detailsResponse', queryResults);
      });
    }
  });
};

module.exports = data;
