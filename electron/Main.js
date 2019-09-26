const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const HealthInfoModel = require('./InfoSchema');
// require('../server/server.js');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadURL('http://localhost:8080/');

  // Load settings JSON and returns state back to the render process.
  ipcMain.on('state', (message) => {
    const state = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    });
    message.returnValue = state;
  });

  // Load settings JSON and returns updated state back to the render process.
  ipcMain.on('submit', (message, state) => {
    fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), state);
    const updatedState = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'));
    message.returnValue = updatedState;
  });

  // Queries the database for information and returns it back to the render process.
  ipcMain.on('queryRequest', (message) => {
    HealthInfoModel.find({}, (err, data) => {
      if (err) console.log(`An error occured while querying the database: ${err}`);
      const queryResults = JSON.stringify(data);
      console.log(queryResults);
      message.sender.send('queryResponse', queryResults);
    });
  });

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

// console.log('HELLLLLLLLO?');
// console.log(db);
// const server = https.createServer();

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
