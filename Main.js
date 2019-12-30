//node requirements
const { dialog, app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const connectSQL = require('./model/sql-connect');
const connectMongoose = require('./model/mongoose-connect');
const CommunicationSchema = require('./model/mongoose-communicatonSchema');
const HealthInfoSchema = require('./model/mongoose-healthInfoSchema');

//declare win variable ---> Ousman
let win;

//declaring a createWindow function ---> Ousman  
function createWindow() {
  //assign win to an instance of a new browser window. 
  win = new BrowserWindow({
    //giving our window its width
    width: 900,
    //giving our window its hieght
    height: 800,
    //specify the path of the icon -- Which icon is this?.. note too tsure --> Ousman
    icon: path.join(__dirname, 'app/assets/icons/icon.png'),
    //enable node inegreation --> node intgeration, default is usally false --> Ousman 
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Development
  //loads our application window to localHost 8080, application will not render without this loadUrl -->  Ousman
  win.loadURL('http://localhost:8080/');

  // Production
  // win.loadURL(`file://${path.join(__dirname, './dist/index.html')}`);
  
  //assign window to null on close 
  win.on('closed', () => {
    win = null;
  });
}

//invoke createWindow function on Electron application load --> Ousman
app.on('ready', createWindow);

//  quits the application when all windows are closed --> Ousman
app.on('window-all-closed', () => {
  //process platform is a property that return a string identifying the OS platform on which NodeJs process is running --> Ousman
  if (process.platform !== 'darwin') {
    //quits application 
    app.quit();
  }
});

//event 'activate' emmitted upon application starting
app.on('activate', () => {
  //if there is no window present invoke the create window function --> Ousman
  if (win === null) {
    createWindow();
  }
});

// Load settings JSON and returns current setup status back to the render process.
//ipc 'setup' route -->  Ousman
ipcMain.on('setup', (message) => {
//assigns state to the returned the object returned from settings.json -->  Ousman
  const state = JSON.parse(
    //read json from settings.json
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  //destructure setupRequired from state constant ---> Ousman
  const { setupRequired } = state; 
  //assigning message object a property of return value and assigning it the setupRequired from state destructuring --> Ousman 
  message.returnValue = setupRequired;
});

// Loads existing settings JSON and update settings to include new services entered by the user.
//on ipc 'submit' request --> Ousman
ipcMain.on('submit', (message, newService) => {
  //assigning state to the parsed return of setting
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  //  if statement is used to replace hard coded data. Hard coded data and the michelleWasHere key is needed to avoid a load error caused by Electron querying the database before a user has added or selected a database.

  //*** What is happening here --> Ousman */
  if (state.michelleWasHere) {
    state.setupRequired = false;
    state.michelleWasHere = false;
    state.services = [JSON.parse(newService)];
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
  } else {
    state.setupRequired = false;
    state.services.push(JSON.parse(newService));
    fs.writeFileSync(path.resolve(__dirname, './user/settings.json'), JSON.stringify(state));
  }
});

// Load settings JSON and returns updated state back to the render process.
//on ipc 'dashboard' request --> Ousman
ipcMain.on('dashboard', (message) => {
  //assign state to the parsed return of setting --> Ousman 
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), {
      encoding: 'UTF-8',
    }),
  );
  //destructure services from state... what is services? --> Ousman 
  const { services } = state;
  const dashboardList = services.reduce((acc, curVal) => {
    acc.push(curVal[0]);
    return acc;
  }, []);
  message.returnValue = dashboardList;
});

// Queries the database for communications information and returns it back to the render process.
ipcMain.on('overviewRequest', (message, index) => {
  const databaseType = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './user/settings.json'), { encoding: 'UTF-8' }),
  ).services[index][1];

  if (databaseType === 'MongoDB') {
    connectMongoose(index);
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
    const pool = connectSQL(index);
    const getCommunications = 'SELECT * FROM communications';
    pool.query(getCommunications, (err, result) => {
      if (err) {

        //error object to log to Electron GUI ---> Ousman 
          const errorAlert = {
               type: "error",
               title: "Error in Main process",
               message: "Database information could not be retreived. Check that table exists."
           };
           
           //after requiring dialog in the topmost section of main. We invoke the method showMessagebox passing the error object we created --> Ousman
            dialog.showMessageBox(errorAlert);
           

            message.sender.send(JSON.stringify('Database info could not be retreived.'));

      } else {
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
