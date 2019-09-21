const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
// const https = require('https');
const path = require('path');
// const { Pool, Client } = require('pg');
// const mongoose = require('mongoose');
// const HealthInfoA = require('./InfoSchema');
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

  ipcMain.on('all', (message, db) => {
    mongoose.connect(db, { useNewUrlParser: true }, () => {
      console.log('Connected!');
      console.log(db);
      // console.log('what da hell am i ', HealthInfoA.find({}));

      HealthInfoA.find({}, (err, doc) => {
        console.log('error =>', err);
        console.log('data', doc);
      });
      // HealthInfo.find().then((data) => {
      //   console.log('HELLLLLLLLLLLOOOOOOOO!');
      //   console.log('inside query');
      //   message.reply('queryResponse', data);
      // });
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
