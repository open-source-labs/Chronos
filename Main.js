const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
// const DatabaseController = require('./model/database-controller');
const CommunicationSchema = require('./model/mongoose-communicatonSchema');

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

// Load settings JSON and returns state back to the render process.
ipcMain.on('state', (message) => {
  const state = JSON.parse(fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
    encoding: 'UTF-8',
  }));
  const { setupRequired } = state;
  message.returnValue = setupRequired;
});

// Load settings JSON and returns updated state back to the render process.
ipcMain.on('submit', (message, state) => {
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), state);
  const updatedState = fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' });
  message.returnValue = JSON.parse(updatedState).setupRequired;
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
  // SQL Query
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
