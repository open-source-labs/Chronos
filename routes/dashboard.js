const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const dashboard = {};

/**
 * @desc reads the object from settings.json to see if the user needs to go through setup
 */

dashboard.setup = () => {
  // Load settings JSON and returns current setup status back to the render process.
  ipcMain.on('setup', message => {
    // console.log('setup message received');
    // assigns state to the returned the object returned from settings.json -->  Ousman
    const state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
      })
    );
    const { setupRequired } = state;
    // assigning message object a property of return value and assigning it the setupRequired from state destructuring --> Ousman
    message.returnValue = setupRequired;
  });
};

dashboard.submit = () => {
  // Loads existing settings JSON and update settings to include new services entered by the user.
  // on ipc 'submit' request --> Ousman
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
    fs.writeFileSync(
      path.resolve(__dirname, '../user/settings.json'),
      JSON.stringify(state)
    );
  });
};

dashboard.dashboard = () => {
  // Load settings JSON and returns updated state back to the render process.
  // on ipc 'dashboard' request --> Ousman
  ipcMain.on('dashboard', message => {
    // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
    const state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
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
};

dashboard.deleteService = () => {
  // Deletes the service at position 'index' from the services array within the user/setting.json file,
  // resets the user/setting.json file to what it was originally if all of the services are deleted,
  // and sends the remaining services back to onDelete function within DeleteService as a response
  ipcMain.on('deleteService', (message, index) => {
    // Declares a variable state and initialize it to the returned parse json object from the user/settings.json file
    let state = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../user/settings.json'), {
        encoding: 'UTF-8'
      })
    );

    // Send a response back with the updated services
    const { splash } = state;
    // Checks if there is more than one services in the services array
    if (state.services.length > 1) {
      // If true, removes the service at position 'index'
      state.services.splice(index, 1);
    } else {
      // Else reassign state to what the user/setting.json file was originally before any database was save
      state = {
        setupRequired: true,
        services: ['hard', 'coded', 'in'],
        splash
      };
    }

    // Rewrites json from settings.json
    fs.writeFileSync(
      path.resolve(__dirname, '../user/settings.json'),
      JSON.stringify(state),
      { encoding: 'UTF-8' }
    );
    message.sender.send('deleteResponse', state.services);
  });
};

module.exports = dashboard;
