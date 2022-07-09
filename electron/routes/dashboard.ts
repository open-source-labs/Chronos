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
let settingsLocation: string;

if (process.env.NODE_ENV === 'development')
  settingsLocation = path.resolve(__dirname, '../../__tests__/test_settings.json');
else settingsLocation = path.resolve(__dirname, '../../settings.json');

ipcMain.on('addApp', (message: IpcMainEvent, application: any) => {
  // Retrieves file contents from settings.json
  const state = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));

  // Add new applicaiton to list
  const newApp = JSON.parse(application);

  // Add a creation date to the application
  const createdOn = moment().format('lll');
  newApp.push(createdOn);

  // Add app to list of applications
  state.services.push(newApp);

  // Update settings.json with new list
  fs.writeFileSync(settingsLocation, JSON.stringify(state));

  // Sync event - return new applications list
  message.returnValue = state.services.map((arr: string[]) => [arr[0], arr[1], arr[3], arr[4]]);
});

/**
 * @event   getApps
 * @desc    Retrieves the existing list of applications belonging to the user and current user setting for mode of preference
 * @return  Returns the list of applications
 */
// Load settings.json and returns updated state back to the render process on ipc 'dashboard' request

ipcMain.on('getApps', message => {
  // Retrieves file contents from settings.json for current Apps
  const state = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // Retrieves files contents from setting.json for current Mode
  const temp = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // Destructure list of services from state to be rendered on the dashboard
  const dashboardList = state.services.map((arr: string[]) => [arr[0], arr[1], arr[3], arr[4]]); // .map((arr: string[]) => [...arr]);

  // Sync event - return new applications list w/ user settings: Mode
  message.returnValue = [dashboardList, temp.mode];
});

/**
 * @event   deleteApp
 * @desc    Deletes the desired application from settings.json which is located with the provided index
 * @return  Returns the new list of applications
 */
ipcMain.on('deleteApp', (message: IpcMainEvent, index) => {
  // Retrives file contents from settings.json
  const state = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));

  // Remove application from settings.json
  state.services.splice(index, 1);

  // Update settings.json with new list
  fs.writeFileSync(settingsLocation, JSON.stringify(state), {
    encoding: 'utf8',
  });

  // Sync event - return new applications list
  message.returnValue = state.services.map((arr: string[]) => [arr[0], arr[1], arr[3], arr[4]]);
});

/**
 * @event changeMode
 * @desc Changes user's mode/theme preference fron settings.json
 * @return Returns the newly update setting preference of the app to the renderer end
 */
// Loads existing setting JSON and update settings to include updated mode version
ipcMain.on('changeMode', (message: IpcMainEvent, currMode: string) => {
  // Retrives file contents from settings.json
  const state = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));

  // Add new mode
  const newMode = currMode;

  // mode to settings
  state.mode = newMode;

  // Update settings.json with new mode
  fs.writeFileSync(settingsLocation, JSON.stringify(state));

  // Sync event - return new mode
  message.returnValue = state.mode;
});

// module.exports = dashboard;
