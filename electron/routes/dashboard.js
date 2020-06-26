const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

/**
 * @event   addApp
 * 
 */
// Loads existing settings JSON and update settings to include new services entered by the user on 'submit' request
ipcMain.on('addApp', (message, application) => {
  // Declares a variable state and initialize it to the returned parsed json object from the user/settings.json file
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    })
  );

  const newApp = JSON.parse(application);
  state.services.push(newApp);

  // Rewrites user/settings.json to show state
  fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), JSON.stringify(state));

  message.returnValue = state.services.map(arr => arr[0]);
});

/**
 * @desc renders the current microservices to the dashboard from state
 */
// Load settings.json and returns updated state back to the render process on ipc 'dashboard' request
ipcMain.on('getApps', message => {
  // Declares variable state and initialize it to the returned parse json object from the user/settings.json file
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    })
  );
  // Destructure list of services from state to be rendered on the dashboard
  const { services } = state;
  const dashboardList = services.reduce((acc, curVal) => {
    acc.push(curVal[0]);
    return acc;
  }, []);

  message.returnValue = dashboardList;
});

/**
 * @desc deletes the service at 'index' from services array (settings.json) resets the settings.json to original settings if no services available sends remainding services back to onDelete function within DeleteService in response
 */
ipcMain.on('deleteApp', (message, index) => {
  // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
      encoding: 'UTF-8',
    })
  );

  state.services.splice(index, 1);

  // Rewrite json from settings.json
  fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), JSON.stringify(state), {
    encoding: 'UTF-8',
  });

  message.returnValue = state.services.map(arr => arr[0]);
});

// module.exports = dashboard;
