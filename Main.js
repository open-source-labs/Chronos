const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const CommunicationSchema = require('./model/mongoose-communicatonSchema');
// const HealthInfoSchema = require('./model/mongoose-healthInfoShema');
const pool = require('./model/sql-connect');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Development
  win.loadURL('http://localhost:8080/');

  // Production
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);

  win.on('closed', () => {
    win = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Load settings JSON and returns current setup status back to the render process.
ipcMain.on('setup', (message) => {
  const state = JSON.parse(fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
    encoding: 'UTF-8',
  }));
  const { setupRequired } = state;
  message.returnValue = setupRequired;
});

// Loads existing settings JSON and update settings to include new services entered by the user.
ipcMain.on('submit', (message, newService) => {
  const state = JSON.parse(fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
    encoding: 'UTF-8',
  }));
  // if statement is used to remove hard coded data.
  if (state.michelleWasHere) {
    state.setupRequired = false;
    state.michelleWasHere = false;
    state.services = [JSON.parse(newService)];
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
  } else {
    state.setupRequired = false;
    state.services.push(JSON.parse(newService));
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
  }
});

// Load settings JSON and returns updated state back to the render process.
ipcMain.on('dashboard', (message) => {
  const state = JSON.parse(fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
    encoding: 'UTF-8',
  }));
  const { services } = state;
  const dashboardList = services.reduce((acc, curVal) => {
    acc.push(curVal[0]);
    return acc;
  }, []);
  message.returnValue = dashboardList;
});

// Queries the database for information and returns it back to the render process.
ipcMain.on('overviewRequest', (message) => {
  const databaseType = JSON.parse(fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' })).services[0][1];
  if (databaseType === 'MongoDB') {
    CommunicationSchema.find({})
      .select({ _id: 0, currentMicroservice: 1, targetedEndpoint: 1 })
      .exec((err, data) => {
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
    const getCommunications = 'SELECT currentMicroservice, targetedEndpoint FROM communications';
    pool.query(getCommunications, (err, result) => {
      if (err) {
        console.log(err);
        message.sender.send(JSON.stringify('Database info could not be retreived.'));
      }
      const queryResults = JSON.stringify(result.rows);
      console.log(result);
      // Asynchronous event emitter used to transmit query results back to the render process.
      message.sender.send('overviewResponse', queryResults);
    });
  }
});

// SQL
// const pool = new Pool({
//   connectionString: db,
// });

// message.sender.send('queryResponse',
//   pool.query('SELECT * FROM message').then((err, data) => {
//     if (err) console.log(err);
//     const stuff = data.json();
//     return stuff;
//   }),
// );
