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
  win.loadURL('http://localhost:8081/');
  ipcMain.on('state', (message) => {
    const state = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    });
    // rendererWindow.webContents.send(state);
    message.returnValue = state;
    console.log(state);
  });
  ipcMain.on('submit', (message, state) => {
    console.log(state, ' is the message');
    fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), state);
    const updatedState = fs.readFileSync(path.resolve(__dirname, '../user/settings.json'));
    message.returnValue = updatedState;
    console.log('state from main.js');
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
