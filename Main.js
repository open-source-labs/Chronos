const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const dashboardRouter = require('./routes/dashboard.js');
const dataRouter = require('./routes/data.js');

// Declare a variable to be used as the application window
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
      nodeIntegration: true
    }
  });

  // Development: load the application window to port 8080
  win.loadURL('http://localhost:8080/');

  // Production
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);

  /*
  @Michael
  The below code block is used to 'splash' on app start
  If we move this to local state on first render, we can likely remove this
  */

  // Assign window to null on close and set splash property in settings.json back to true so splash page renders on restart
  win.on('closed', () => {
    // read json from settings.json
    const state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
        encoding: 'UTF-8'
      })
    );
    // reassign state.splash
    state.splash = true;
    fs.writeFileSync(
      path.resolve(__dirname, './user/settings.json'),
      JSON.stringify(state),
      { encoding: 'UTF-8' }
    );
    win = null;
  });
};

// Invoke the createWindow function when Electron application loads
app.on('ready', createWindow);

// Quits application when all windows are closed
app.on('window-all-closed', () => {
  // console.log('window-all-closed message received');
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8'
    })
  );

  /*
  @Michael
  Resassigning state here on window close so the app wil re-render the splash at the start
  If splash logic is moved to local state, we can probably remove this
  */

  // reassign state.splash
  state.splash = true;
  fs.writeFileSync(
    path.resolve(__dirname, './user/settings.json'),
    JSON.stringify(state),
    { encoding: 'UTF-8' }
  );
  // process platform is a property that return a string identifying the OS platform on which NodeJs process is running --> Ousman
  if (process.platform !== 'darwin') {
    // quits application
    app.quit();
  }
});

// event 'activate' emmitted upon application starting
app.on('activate', () => {
  // if there is no window present invoke the create window function --> Ousman
  if (win === null) {
    createWindow();
  }
});

// Fired by the useEffect hook inside of the Splash.jsx component, this message route will toggle
// splash property inside of settings.json to false once the Splash page renders itself just once
ipcMain.on('toggleSplash', message => {
  // console.log('toggleSplash message received');
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8'
    })
  );
  // reassign state.splash to false
  state.splash = false;

  // overwrite settings.json with false splash property
  fs.writeFileSync(
    path.resolve(__dirname, './user/settings.json'),
    JSON.stringify(state),
    { encoding: 'UTF-8' }
  );

  message.returnValue = state.splash;
});

ipcMain.on('checkSplash', message => {
  // sconsole.log('checkSplash message received');
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8'
    })
  );

  message.returnValue = state.splash;
});

/**
 * @desc reads the object from settings.json to see if the user needs to go through setup
 */
dashboardRouter.setup();

dashboardRouter.submit();

dashboardRouter.dashboard();

dashboardRouter.deleteService();

dataRouter.overviewRequest();

dataRouter.detailsRequest();
