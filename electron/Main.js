const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
require('../server/server.js');

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
    console.log(state);
  });

  // Load settings JSON and returns updated state back to the render process.
  ipcMain.on('submit', (message, state) => {
    fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), state);
    const updatedState = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'));
    message.returnValue = updatedState;
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
