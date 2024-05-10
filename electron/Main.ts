import { app, BrowserWindow, ipcMain, session } from 'electron';
import './routes/dashboard';
import { clearGuestSettings } from './routes/dashboard';
import './routes/data';
import './routes/cloudbased';
import path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'

// Declare variable to be used as the application window
let win: Electron.BrowserWindow;

app.commandLine.appendSwitch('remote-debugging-port', '9222');

// Path to reactDevTools
const reactDevToolsPath = path.resolve(__dirname, '../node_modules/react-devtools');

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
    win.loadFile(path.join(app.getAppPath(), 'index.html'));
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

const addDevTools = async () => {
  // await installExtension(REACT_DEVELOPER_TOOLS, { loadExtensionOptions: { allowFileAccess: true }})
  //     .then((name) => console.log(`Added Extension:  ${name}`))
  //     .catch((err) => console.log('An error occurred: ', err));
  // await installExtension(reactDevToolsPath)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));
  
  await installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));

  await session.defaultSession.loadExtension(reactDevToolsPath);
};

app.whenReady().then(async () => {
  await addDevTools();
  
  // await session.defaultSession.loadExtension(reactDevToolsPath);
});
// Invoke the createWindow function when Electron application loads
app.on('ready', createWindow);

// Loads reactDevTools extension
// app.whenReady().then(async () => {
//   console.log(reactDevToolsPath);
//   await session.defaultSession.loadExtension(reactDevToolsPath);
//   console.log({reactDevToolsPath})
// });

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
