import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

const ipc = ipcMain;

import { test } from './utilites/titleBarLogic';

import './routes/dashboard';
import './routes/data';

// Declare variable to be used as the application window
let win: Electron.BrowserWindow;

/**
 * @desc createWindow sets up the environment of the window (dimensions, port, initial settings)
 */
const createWindow = () => {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    // icon: path.join(__dirname, 'app/assets/icons/icon.png'),
    // Node integration allows node.js to run
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Development: load the application window to port 8080
  win.loadURL('http://localhost:8080/');
  // win.loadFile('./dist/index.html');
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);

  // win.webContents.on('did-finish-load', () => {
  //   console.log('content loaded');
  //   win.webContents.executeJavaScript(`console.log(${remote})`);
  // });

  ipc.on('max', () => {
    if (!win.isMaximized()) win.maximize();
    else win.unmaximize();
  });
  ipc.on('min', () => {
    win.minimize();
  });
  ipc.on('close', () => {
    win.close();
  });

  // Production
};

// Invoke the createWindow function when Electron application loads
app.on('ready', createWindow);

// Quits application when all windows are closed
app.on('window-all-closed', () => {
  app.quit();
});

// Event 'activate' emmitted upon application starting
app.on('activate', () => {
  // If there is no window present invoke the create window function
  if (win === null) {
    createWindow();
  }
});
