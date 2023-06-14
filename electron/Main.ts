import { app, BrowserWindow, ipcMain } from 'electron';
import './routes/dashboard';
import { clearGuestSettings } from './routes/dashboard';
import './routes/data';
import './routes/cloudbased';
import { join } from 'path';

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
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    // Development: load the application window to the port in the webpack config
    win.loadURL('http://localhost:8080/');

    // Uncomment below to use Dev Tools on Electron
    win.webContents.openDevTools();
  } else {
    // Production
    // win.loadFile(path.resolve(__dirname, '../index.html'));
    //* Wasn't going to the correct file in the line above.
    const indexPath = join(app.getAppPath(), 'index.html');
    console.log('indexPath: ', indexPath); //* I can't get this to console log. I would love to see what this path is to better understand the build!
    win.loadFile(indexPath);
  }

  ipcMain.on('max', () => {
    if (!win.isMaximized()) win.maximize();
    else win.unmaximize();
  });

  ipcMain.on('min', () => {
    win.minimize();
  });

  ipcMain.on('close', () => {
    win.close();
  });

  win.on('close', () => {
    clearGuestSettings();
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
