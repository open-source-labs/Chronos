// node requirements
const { app, BrowserWindow, ipcMain } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const fs = require('fs');
const path = require('path');
const dashboardRouter = require('./routes/dashboard.js');
const dataRouter = require('./routes/data.js');

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
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), {
      encoding: 'UTF-8',
    });
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
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), {
    encoding: 'UTF-8',
  });
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
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), {
    encoding: 'UTF-8',
  });

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

<<<<<<< HEAD
/**
 * @desc reads the object from settings.json to see if the user needs to go through setup
 */
dashboardRouter.setup();
=======
// Load settings JSON and returns current setup status back to the render process.
// ipc 'setup' route -->  Ousman
ipcMain.on('setup', message => {
  // console.log('setup message received');
  // assigns state to the returned the object returned from settings.json -->  Ousman
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    })
  );
  // destructure setupRequired from state constant ---> Ousman
  const { setupRequired } = state;
  // assigning message object a property of return value and assigning it the setupRequired from state destructuring --> Ousman
  message.returnValue = setupRequired;
});

// Loads existing settings JSON and update settings to include new services entered by the user.
// on ipc 'submit' request --> Ousman
ipcMain.on('submit', (message, newService) => {
  // Declares a variable state and initialize it to the returned parsed json object from the user/settings.json file
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    })
  );

  // Checks if setup is required by checking if the value for the state key 'setupRequired' is true
  if (state.setupRequired) {
    // If setup is required, the value for key 'setupRequired' is reassign to false and the value for key 'services' is reassign to an array with newService as its only element
    state.setupRequired = false;
    state.services = [JSON.parse(newService)];
  } else {
    // Else the newService is pushed into the services array
    state.services.push(JSON.parse(newService));
  }

  // Rewrites user/settings.json to show state
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
});

// Load settings JSON and returns updated state back to the render process.
// on ipc 'dashboard' request --> Ousman
ipcMain.on('dashboard', message => {
  // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    })
  );
  // destructure services from state... what is services? --> Ousman
  const { services } = state;
  const dashboardList = services.reduce((acc, curVal) => {
    acc.push(curVal[0]);
    return acc;
  }, []);
  message.returnValue = dashboardList;
});

// Deletes the service at position 'index' from the services array within the user/setting.json file,
// resets the user/setting.json file to what it was originally if all of the services are deleted,
// and sends the remaining services back to onDelete function within DeleteService as a response
ipcMain.on('deleteService', (message, index) => {
  // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
  let state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    })
  );
>>>>>>> master

dashboardRouter.submit();

<<<<<<< HEAD
dashboardRouter.dashboard();
=======
  // Rewrites json from settings.json
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), {
    encoding: 'UTF-8',
  });
  message.sender.send('deleteResponse', state.services);
});

// Queries the database for communications information and returns it back to the render process.
ipcMain.on('overviewRequest', (message, index) => {
  console.log('hello from overview request');
  const { services } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    })
  );
>>>>>>> master

dashboardRouter.deleteService();

dataRouter.overviewRequest();

<<<<<<< HEAD
dataRouter.detailsRequest();
=======
      const queryResults = JSON.stringify(data);
      // Asynchronous event emitter used to transmit query results back to the render process.
      message.sender.send('overviewResponse', queryResults);
    });
  }

  if (databaseType === 'SQL') {
    pool = connectSQL(index, URI);
    const getCommunications = 'SELECT * FROM communications';
    pool.query(getCommunications, (err, result) => {
      if (err) {
        // error object to log to Electron GUI ---> Ousman
        const errorAlert = {
          type: 'error',
          title: 'Error in Main process',
          message: 'Database information could not be retreived. Check that table exists.',
        };

        // after requiring dialog in the topmost section of main. We invoke the method showMessagebox passing the error object we created --> Ousman
        dialog.showMessageBox(errorAlert);

        message.sender.send(JSON.stringify('Database info could not be retreived.'));
      } else {
        console.log('Connected to SQL Database');
        const queryResults = JSON.stringify(result.rows);
        // Asynchronous event emitter used to transmit query results back to the render process.
        console.log('ipcMain about to send overviewResponse message');
        message.sender.send('overviewResponse', queryResults);
      }
    });
  }
});

// Queries the database for computer health information and returns it back to the render process.
ipcMain.on('detailsRequest', (message, index) => {
  console.log('detailsRequest message received');
  const databaseType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    })
  ).services[index][1];

  if (databaseType === 'MongoDB') {
    HealthInfoSchema.find({}, (err, data) => {
      if (err) {
        message.sender.send('detailsResponse', JSON.stringify(err));
      }
      const queryResults = JSON.stringify(data);
      // Asynchronous event emitter used to transmit query results back to the render process.
      message.sender.send('detailsResponse', queryResults);
      console.log('Message Sent');
    });
  }

  if (databaseType === 'SQL') {
    const getHealth = 'SELECT * FROM healthInfo';
    pool.query(getHealth, (err, result) => {
      if (err) {
        message.sender.send(
          'detailsResponse',
          JSON.stringify('Database info could not be retreived.')
        );
      }
      const queryResults = JSON.stringify(result.rows);
      // Asynchronous event emitter used to transmit query results back to the render process.
      // console.log('healthInfo data about to comeback');
      message.sender.send('detailsResponse', queryResults);
    });
  }
});
>>>>>>> master
