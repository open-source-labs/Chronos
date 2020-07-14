import { ipcMain, IpcMainEvent } from 'electron';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
/**
 * @event   addApp
 * @desc    Adds an application to the user's list in the settings.json with the provided fields
 * @return  New list of applications
 */
// Loads existing settings JSON and update settings to include new services entered by the user on 'submit' request
ipcMain.on('addApp', (message: IpcMainEvent, application: any) => {
  // Retrives file contents from settings.json
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../user/settings.json')).toString('utf8')
  );

  // Add new applicaiton to list
  const newApp = JSON.parse(application);

  // Add a creation date to the application
  const createdOn = moment().format('lll')
  newApp.push(createdOn)

  // Add app to list of applications
  state.services.push(newApp);

  // Update settings.json with new list
  fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), JSON.stringify(state));

  // Sync event - return new applications list
  message.returnValue = state.services.map((arr: string[]) => arr[0]);
});

/**
 * @event   getApps
 * @desc    Retrieves the existing list of applications belonging to the user
 * @return  Returns the list of applications
 */
// Load settings.json and returns updated state back to the render process on ipc 'dashboard' request
ipcMain.on('getApps', message => {
  // Retrives file contents from settings.json
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../user/settings.json')).toString('utf8')
  );

  // Destructure list of services from state to be rendered on the dashboard
  const dashboardList = state.services.map((arr: string[]) => arr[0]);

  // Sync event - return new applications list
  message.returnValue = dashboardList;
});

/**
 * @event   deleteApp
 * @desc    Deletes the desired application from settings.json which is located with the provided index
 * @return  Returns the new list of applications
 */
ipcMain.on('deleteApp', (message: IpcMainEvent, index) => {
  // Retrives file contents from settings.json
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../user/settings.json')).toString('utf8')
  );

  // Remove application from settings.json
  state.services.splice(index, 1);

  // Update settings.json with new list
  fs.writeFileSync(path.resolve(__dirname, '../user/settings.json'), JSON.stringify(state), {
    encoding: 'utf8',
  });

  // Sync event - return new applications list
  message.returnValue = state.services.map((arr: string[]) => arr[0]);
});

// module.exports = dashboard;
