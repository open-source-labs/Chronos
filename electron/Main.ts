import { app, BrowserWindow } from 'electron';
// import { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
// const { default: installExtension } = require('electron-devtools-installer');
import path from 'path';
import './routes/dashboard';
import './routes/data';
// require('./routes/dashboard');
// require('./routes/data');

// Install React Dev Tools
// app.whenReady().then(() => {
//   installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name: string) => console.log(`Added Extension:  ${name}`))
//     .catch((err: Error) => console.log('An error occurred: ', err));
// });

// Declare variable to be used as the application window
let win: Electron.BrowserWindow;

/**
 * @desc createWindow sets up the environment of the window (dimensions, port, initial settings)
 */
const createWindow = () => {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, 'app/assets/icons/icon.png'),
    // Node integration allows node.js to run
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Development: load the application window to port 8080
  win.loadURL('http://localhost:8080/');

  // Production
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);
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
