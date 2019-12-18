const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const connectSQL = require('./model/sql-connect');
const connectMongoose = require('./model/mongoose-connect');
const CommunicationSchema = require('./model/mongoose-communicatonSchema');
const HealthInfoSchema = require('./model/mongoose-healthInfoSchema');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 800,
    icon: path.join(__dirname, 'app/assets/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Development
  win.loadURL('http://localhost:8080/');

  // Production
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);

  win.on('closed', () => {
    win = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// Load settings JSON and returns current setup status back to the render process.
ipcMain.on('setup', (message) => {
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  const { setupRequired } = state;
  message.returnValue = setupRequired;
});

// Loads existing settings JSON and update settings to include new services entered by the user.
ipcMain.on('submit', (message, newService) => {
  // set the variable 'state' to the contents of /user/settings.json
  // contents => "setupRequired" (boolean) ,"michelleWasHere" (boolean),"services" (Array)
  // setupRequired- toggle the page for adding database
  // michelleWasHere - I believe initiate the service array
  // services - name of DB  stores dbType, and uri 
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  // if statement is used to replace hard coded data. Hard coded data and the michelleWasHere key is needed to avoid a load error caused by Electron querying the database before a user has added or selected a database.
  if (state.michelleWasHere) {
    state.setupRequired = false;
    state.michelleWasHere = false;
    state.services = [JSON.parse(newService)];
    //is updating the /user/settings.json file with the first new service
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
  } else {
    //what is the new service?
    state.setupRequired = false;
    state.services.push(JSON.parse(newService));
    //is updating the /user/settings.json file with the new service
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
  }
});

// Load settings JSON and returns updated state back to the render process.
ipcMain.on('dashboard', (message) => {
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  //getting the array of databases [name, dbType, uri]
  const { services } = state;
  //creates an array of the database names
  const dashboardList = services.reduce((acc, curVal) => {
    acc.push(curVal[0]);
    return acc;
  }, []);
  //returns the array of the database names
  message.returnValue = dashboardList;
});

// Queries the database for communications information and returns it back to the render process.
ipcMain.on('overviewRequest', (message, index) => {
  // Gets the database type from /user/settings.json services: [[name, dbType, uri],...]
  const databaseType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' }),
  ).services[index][1];

  if (databaseType === 'MongoDB') {
    connectMongoose(index);
    CommunicationSchema.find({}, (err, data) => {
      if (err) {
        console.log(`An error occured while querying the database: ${err}`);
        return message.sender.send('overviewResponse', JSON.stringify(err));
      }
      //queryResults is an array of objects with the following keys {"_id","currentMicroservice","targetedEndpoint","reqType","timeSent","resStatus","resMessage","__v"}
      const queryResults = JSON.stringify(data);

      // Asynchronous event emitter used to transmit query results back to the render process.
      return message.sender.send('overviewResponse', queryResults);
    });
  }

  if (databaseType === 'SQL') {
    // What is index? index - is passed on from ServiceDashboard as a prop when the button was  created. When the button is pressed, the serviceSelected is set to <ServiceOverview index ={i}>. The ServiceOverview makes the ipcRenderer.send('overviewRequest', props.index). The index indicates which service is being called
    const pool = connectSQL(index);
    const getCommunications = 'SELECT * FROM communications';
    pool.query(getCommunications, (err, result) => {
      if (err) {
        console.log(err);
       return message.sender.send(JSON.stringify('Database info could not be retrieved.'));
      }
      //queryResults is an array of objects with the following keys {"id","currentmicroservice","targetedendpoint","reqtype","resstatus","resmessage","timesent"}
      const queryResults = JSON.stringify(result.rows);
      // Asynchronous event emitter used to transmit query results back to the render process.
      return message.sender.send('overviewResponse', queryResults);
    });
  }
});

// Queries the database for computer health information and returns it back to the render process.
ipcMain.on('detailsRequest', (message, index) => {
  const databaseType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' }),
  ).services[index][1];

  if (databaseType === 'MongoDB') {
    connectMongoose(index);
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
    //what is index?
    const pool = connectSQL(index);
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
