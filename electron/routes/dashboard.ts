import { ipcMain, IpcMainEvent } from 'electron';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
const bcrypt = require('bcrypt');
const saltRounds = 12;

class Settings {
  user: User | null;
  services: string[];
  mode: string;

  constructor(user: User) {
    this.user = user;
    this.services = [];
    this.mode = 'light';
  }
}

class User {
  username: string;
  password: string;
  email: string;

  constructor(username: string, password: string, email: string) {
    username: username;
    password: password;
    email: email;
  }
}
// DEFAULT VALUES
let currentUser = 'guest';
let settingsRoot;
let userRoot;
if (process.env.NODE_ENV === 'development') {
  settingsRoot= path.resolve(__dirname, '../../__tests__/');
  userRoot = path.resolve(__dirname, '../../__tests__/');
} else {
  settingsRoot = path.resolve(__dirname, '../../');
  userRoot = path.resolve(__dirname, '../../');
}

let settingsLocation;
let usersLocation;
function getLocations(username) {
  if (username === 'guest') {
    settingsLocation = path.resolve(settingsRoot, 'temp_settings.json');
    usersLocation = path.resolve(settingsRoot, 'test_users.json');
  } else {
    settingsLocation = path.resolve(settingsRoot, 'settings.json');
    usersLocation = path.resolve(settingsRoot, 'users.json');
  }
}

/**
 * @event   addApp
 * @desc    Adds an application to the user's list in the settings.json with the provided fields
 * @return  New list of applications
 */
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
  fs.writeFileSync(settingsLocation, JSON.stringify(state, null, '\t'));

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
  // ["chronosDB",
  // "MongoDB",
  // "mongodb+srv://jj289:Codesmith123@clusterchronos.vwtqgxp.mongodb.net/chronosDB?retryWrites=true&w=majority",
  // "",
  // "Dec 13, 2022 10:16 AM"]
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
  fs.writeFileSync(settingsLocation, JSON.stringify(state, null, '\t'), {
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
  fs.writeFileSync(settingsLocation, JSON.stringify(state, null, '\t'));

  // Sync event - return new mode
  message.returnValue = state.mode;
});


ipcMain.on(
  'addUser',
  (message: IpcMainEvent, user: { email: string; username: string; password: string }) => {
    const { email, username, password } = user;
    if (!fs.existsSync(usersLocation)) {
      const firstUser: {
        [key: string]: {
          email: string;
          username: string;
          password: string;
          admin: boolean;
          awaitingApproval: boolean;
        };
      } = {};
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      firstUser[email] = {
        email,
        username,
        password: hash,
        admin: true,
        awaitingApproval: false,
      };
      fs.writeFileSync(usersLocation, JSON.stringify(firstUser, null, '\t'));
      message.returnValue = firstUser;
    } else message.returnValue = ensureEmailIsUnique();

    function ensureEmailIsUnique() {
      const users = JSON.parse(fs.readFileSync(usersLocation).toString('utf8'));
      if (email in users) return false;
      users[email] = { email, username, password, admin: false, awaitingApproval: true };
      fs.writeFileSync(usersLocation, JSON.stringify(users, null, '\t'));
      return true;
    }
  }
);


ipcMain.on('verifyUser', (message: IpcMainEvent, user: { email: string; password: string }) => {
  const { email, password } = user;
  const users = JSON.parse(fs.readFileSync(usersLocation).toString('utf8'));
  const currUser: {
    email: string;
    username: string;
    password: string;
    admin: boolean;
    awaitingApproval: boolean;
  } = users[email];
  const checkPassword = bcrypt.compareSync(password, users[email]?.password);
  if (email in users && checkPassword)
    message.returnValue = currUser.awaitingApproval ? 'awaitingApproval' : currUser;
  else message.returnValue = false;
});
