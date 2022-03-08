import { app, BrowserWindow, ipcMain } from 'electron';
import './routes/user';
import './routes/dashboard';
import './routes/data';

const ipc = ipcMain;

// import { test } from './utilites/titleBarLogic';

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
    // icon: path.join(__dirname, 'app/assets/icons/icon.png'),
    // Node integration allows node.js to run
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, './utilities/preload.js').replace(/\\/g, '/'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Development: load the application window to port 8080
  // win.loadURL('http://localhost:8080/');
  win.loadFile(path.resolve('./resources/app/index.html').replace(/\\/g, '/'));
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
