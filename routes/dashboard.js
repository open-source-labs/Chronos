const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const dashboard = {};

/**
 * @desc adds the new microservice to the service list and updates state accordingly
 */
dashboard.submit = () => {
  // Loads existing settings JSON and update settings to include new services entered by the user on 'submit' request
  ipcMain.on('submit', (message, newService) => {
    // Declares a variable state and initialize it to the returned parsed json object from the user/settings.json file
    const state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
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
    fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), JSON.stringify(state));
  });
};

/**
 * @desc renders the current microservices to the dashboard from state
 */
dashboard.dashboard = () => {
  // Load settings.json and returns updated state back to the render process on ipc 'dashboard' request
  ipcMain.on('dashboard', message => {
    // Declares variable state and initialize it to the returned parse json object from the user/settings.json file
    const state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
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
};

/**
 * @desc deletes the service at 'index' from services array (settings.json) resets the settings.json to original settings if no services available sends remainding services back to onDelete function within DeleteService in response
 */
dashboard.deleteService = () => {
  ipcMain.on('deleteService', (message, index) => {
    // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
    let state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
      })
    );
    // If there is more than one services in the services array, remove the service at 'index'
    if (state.services.length > 1) {
      state.services.splice(index, 1);
    } else {
      // Else reassign state to what the user/setting.json file was originally before any database was save
      state = {
        setupRequired: true,
        services: ['hard', 'coded', 'in']
      };
    }

    // Rewrite json from settings.json
    fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), JSON.stringify(state), {
      encoding: 'UTF-8'
    });
    message.sender.send('deleteResponse', state.services);
  });
};

module.exports = dashboard;
