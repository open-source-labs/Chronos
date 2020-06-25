const { app, BrowserWindow } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const path = require('path');
const dashboardRouter = require('./routes/dashboard.js');
const infoRouter = require('./routes/info.js');

// Install React Dev Tools
app.whenReady().then(() => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
});

// Declare variable to be used as the application window
let win;

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

/**
 * @desc adds the new microservice to the service list and updates state accordingly
 */
dashboardRouter.submit();

/**
 * @desc renders the current microservices to the dashboard from state
 */
dashboardRouter.dashboard();

/**
 * @desc deletes the service at 'index' from services array (settings.json)
 * resets the settings.json to original settings if no services available
 * sends remainding services back to onDelete function within DeleteService in response
 */
dashboardRouter.deleteService();

/**
 * @desc Connect user to selected database
 */
infoRouter.connect();

/**
 * @desc fetches communications data from the database to be rendered via charts
 */
infoRouter.commsData();

/**
 * @desc fetches microservice health data from the database to be rendered via charts
 */
infoRouter.healthData();

/**
 * @desc  Fetches each of the microservices of the specified application
 */
infoRouter.getServices();
