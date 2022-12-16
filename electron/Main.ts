import { app, BrowserWindow, ipcMain } from 'electron';
// import './routes/user';
// import './routes/dashboard';
// import './routes/data';
import path from 'path';

const ipc = ipcMain;


// Declare variable to be used as the application window
let win: Electron.BrowserWindow;

/**
 * @desc createWindow sets up the environment of the window (dimensions, port, initial settings)
 */
const createWindow = () => {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    backgroundColor: '#000314',
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      // preload: path.join(__dirname, './utilities/preload.js').replace(/\\/g, '/'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    // Development: load the application window to the port in the webpack config
    win.loadURL('http://localhost:8080/');
  } else {
    // Production
    win.loadFile(path.resolve('./resources/app/index.html').replace(/\\/g, '/'));
  }
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
