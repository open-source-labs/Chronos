// node requirements
const {
  dialog, app, BrowserWindow, ipcMain,
} = require('electron');
const fs = require('fs');
const path = require('path');
const connectSQL = require('./model/sql-connect');
const connectMongoose = require('./model/mongoose-connect');
const CommunicationSchema = require('./model/mongoose-communicatonSchema');
const HealthInfoSchema = require('./model/mongoose-healthInfoSchema');

// declare a variable pool for SQL connection
let pool;

// declare win variable ---> Ousman
let win;

// declaring a createWindow function ---> Ousman
function createWindow() {
  // assign win to an instance of a new browser window.
  win = new BrowserWindow({
    // giving our window its width
    width: 900,
    // giving our window its hieght
    height: 800,
    // specify the path of the icon -- Which icon is this?.. note too tsure --> Ousman
    icon: path.join(__dirname, 'app/assets/icons/icon.png'),
    // enable node inegreation --> node intgeration, default is usally false --> Ousman
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Development
  // loads our application window to localHost 8080, application will not render without this loadUrl -->  Ousman
  win.loadURL('http://localhost:8080/');

  // Production
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);

  // assign window to null on close and set splash property in settings.json back to true so splash page renders on restart
  win.on('closed', () => {
    const state = JSON.parse(
      // read json from settings.json
      fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
        encoding: 'UTF-8',
      }),
    );
    // reassign state.splash
    state.splash = true;
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), { encoding: 'UTF-8' }); win = null;
  });
}

// invoke createWindow function on Electron application load --> Ousman
app.on('ready', createWindow);

//  quits the application when all windows are closed --> Ousman
app.on('window-all-closed', () => {
  console.log('window-all-closed message received');
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  // reassign state.splash
  state.splash = true;
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), { encoding: 'UTF-8' });
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
ipcMain.on('toggleSplash', (message) => {
  //console.log('toggleSplash message received');
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  // reassign state.splash to false
  state.splash = false;

  // overwrite settings.json with false splash property
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), { encoding: 'UTF-8' });

  message.returnValue = state.splash;
});

ipcMain.on('checkSplash', (message) => {
  //sconsole.log('checkSplash message received');
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );

  message.returnValue = state.splash;
});

// Load settings JSON and returns current setup status back to the render process.
// ipc 'setup' route -->  Ousman
ipcMain.on('setup', (message) => {
  //console.log('setup message received');
  // assigns state to the returned the object returned from settings.json -->  Ousman
  const state = JSON.parse(
    // read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
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
    }),
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
ipcMain.on('dashboard', (message) => {
  // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
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
    }),
  );

  // Send a response back with the updated services
  const { splash } = state;
// Checks if there is more than one services in the services array
  if (state.services.length > 1) {
       // If true, removes the service at position 'index'
    state.services.splice(index, 1);
  } else {
      // Else reassign state to what the user/setting.json file was originally before any database was save
    state = { setupRequired: true, services: ['hard', 'coded', 'in'], splash };
  }

  // Rewrites json from settings.json
  fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state), { encoding: 'UTF-8' });
  message.sender.send('deleteResponse', state.services);
});


// Queries the database for communications information and returns it back to the render process.
ipcMain.on('overviewRequest', (message, index) => {
  const { services } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' }),
  );

  const databaseType = services[index][1];
  const URI = services[index][2];

  if (databaseType === 'MongoDB') {
    connectMongoose(index, URI);
    CommunicationSchema.find({}, (err, data) => {
      if (err) {
        console.log(`An error occured while querying the database: ${err}`);
        message.sender.send('overviewResponse', JSON.stringify(err));
      }

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
        message.sender.send('overviewResponse', queryResults);
      }
    });
  }
});

// Queries the database for computer health information and returns it back to the render process.
ipcMain.on('detailsRequest', (message, index) => {
  const databaseType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' }),
  ).services[index][1];

  if (databaseType === 'MongoDB') {
    HealthInfoSchema.find({}, (err, data) => {
      if (err) {
        message.sender.send('detailsResponse', JSON.stringify(err));
      }
      const queryResults = JSON.stringify(data);
      // Asynchronous event emitter used to transmit query results back to the render process.
      message.sender.send('detailsResponse', queryResults);
    });
  }

  if (databaseType === 'SQL') {
    const getHealth = 'SELECT * FROM healthInfo';
    pool.query(getHealth, (err, result) => {
      if (err) {
        message.sender.send('detailsResponse', JSON.stringify('Database info could not be retreived.'));
      }
      const queryResults = JSON.stringify(result.rows);
      // Asynchronous event emitter used to transmit query results back to the render process.
      message.sender.send('detailsResponse', queryResults);
    });
  }
});
