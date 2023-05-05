import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('../models/UserModel')
const mongoose = require('mongoose');
// const db = require('../databases/mongo')

const MONGO_URI = 'mongodb+srv://wiris316:testtesttest123@cluster0.0gybpkf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedtopology: true,
})

// GLOBAL VARIABLES
let currentUser = 'guest';
const settingsLocation = path.resolve(__dirname, '../../settings.json');



// class User {
//   username: string;
//   password: string;
//   email: string;
//   services: string[][];
//   mode: string;

//   constructor(username: string, password: string, email: string) {
//     this.username = username;
//     this.password = this.hashPassword(password);
//     this.email = email;
//     this.services = [];
//     this.mode = 'light';
//   }

function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

// function checkUser(username): any {
//   const userExist = User.findOne({ username })
//     .then((data) => {
//       console.log('User found', data);
//       return true;
//     })
//     .catch((error) => {
//       console.log(`checkUser failed : ${error}`)
//       // return false;
//     })
//   // console.log('heeeeere', userExist)
// }

function addUser(username, password, email) {
  console.log('inside addUser', username)
  const newUser = new User({ username: username, password: hashPassword(password), email: email})
  console.log('after calling new User')

  newUser.save()
    .then((data) => {
    console.log('data hurr', data)
  })
}

function clearGuestSettings() {
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // Guest Settings will be an array of length 1 with one object inside
  settings.guest.services = [];
  settings.guest.mode = 'light';
  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
}

/**
 * @event   addApp
 * @desc    Adds an application to the user's list in the settings.json with the provided fields
 * @return  New list of applications
 */
ipcMain.on('addApp', (message: IpcMainEvent, application: any) => {
  // Retrieves file contents from settings.json
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  const services = settings[currentUser].services;

  // Add new applicaiton to list
  const newApp = JSON.parse(application);

  // Add a creation date to the application
  const createdOn = moment().format('lll');
  newApp.push(createdOn);

  // Add app to list of applications
  services.push(newApp);

  // Update settings.json with new list
  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

  // Sync event - return new applications list

  message.returnValue = services.map((arr: string[]) => [arr[0], arr[1], arr[3], arr[4], arr[5]]);
});

/**
 * @event   addAwsApp
 * @desc    Adds an AWS application to the user's list in the settings.json with the provided fields
 * @return  New list of applications
 */
ipcMain.on('addAwsApp', (message: IpcMainEvent, application: any) => {
  // Retrieves file contents from settings.json
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  const services = settings[currentUser].services;

  // order of variables from addAwsApp
  // name, instance, region, description, typeOfService, accessKey, secretAccessKey

  // Add new applicaiton to list
  const newAwsApp = JSON.parse(application);

  // Add a creation date to the application on the 5th index
  const createdOn = moment().format('lll');
  newAwsApp.splice(5, 0, createdOn);

  // Add app to list of applications
  services.push(newAwsApp);

  // Update settings.json with new list

  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

  // Sync event - return new applications list
  message.returnValue = services.map((arr: string[]) => [arr[0], arr[1], arr[3], arr[4], arr[5]]);
});

/**
 * @event   getApps
 * @desc    Retrieves the existing list of applications belonging to the user and current user setting for mode of preference
 * @return  Returns the list of applications
 */
// Load settings.json and returns updated state back to the render process on ipc 'dashboard' request
ipcMain.on('getApps', (message: IpcMainEvent) => {
  // Retrieves file contents from settings.json for current Apps
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // const services: string[][] = settings[currentUser].services;
  const services: string[][] = settings['guest'].services; // temporarily set to guests at every login attempt

  // Return an array of arrays that is a subset of the full services array
  const dashboardList: string[][] = services.map((arr: string[]) => [
    arr[0],
    arr[1],
    arr[3],
    arr[4],
    arr[5],
  ]);
  message.returnValue = dashboardList;
});

/**
 * @event   deleteApp
 * @desc    Deletes the desired application from settings.json which is located with the provided index
 * @return  Returns the new list of applications
 */
ipcMain.on('deleteApp', (message: IpcMainEvent, index) => {
  // Retrives file contents from settings.json
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  const userServices = settings[currentUser].services;

  // Remove application from settings.json
  userServices.splice(index, 1);

  // Update settings.json with new list
  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'), {
    encoding: 'utf8',
  });

  // Sync event - return new applications list
  message.returnValue = userServices.map((arr: string[]) => [arr[0], arr[1], arr[3], arr[4]]);
});

/**
 * @event changeMode
 * @desc Changes user's mode/theme preference fron settings.json
 * @return Returns the newly update setting preference of the app to the renderer end
 */
// Loads existing setting JSON and update settings to include updated mode version
ipcMain.on('changeMode', (message: IpcMainEvent, currMode: string) => {
  // Retrives file contents from settings.json
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  const userSettings = settings[currentUser];
  userSettings.mode = currMode;

  // Update settings.json with new mode
  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

  // Sync event - return new mode
  message.returnValue = currMode;
});

ipcMain.handle(
  'addUser',
  (message: IpcMainEvent, user: { username: string; password: string; email: string }) => {
    const { username, password, email } = user;
    console.log('in ipcMainhandle', user)

    // Verify that username and email have not been taken
    // const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
    // if (settings[username]) {
    //   message.returnValue = false;
    //   return message.returnValue;
    // }
    

    // checks if username exist in DB, if not, addUser is invoked
    return User.findOne({ username:username })
    .then((data) => {
      console.log('User found', data);
      if (data) {
        message.returnValue = false;
        return message.returnValue;
      } else {
        addUser(username, password, email)
        message.returnValue = true; 
        return message.returnValue;
      }
    })
    .catch((error) => {
      console.log(`checkUser failed : ${error}`)
      // return false;
    })

    // if (checkUser(username) === true) {
    //   console.log('checkUser invoked', checkUser(username))
    //   message.returnValue = false; 
    //   return message.returnValue;
    // }
    
    // Add the new user to the local storage
    // else {
    //   const newUser = new User(username, password, email);
    //   settings[username] = newUser;
    //   fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
    //   currentUser = username;
    //   message.returnValue = true;
    //   return message.returnValue;
    // }
    // if (!checkUser(username)) {
      // addUser(username, password, email)
      // message.returnValue = true; 
      // return message.returnValue;
    // }
    // return false;
  }
);

ipcMain.on('login', (message: IpcMainEvent, user: { username: string; password: string }) => {
  const { username, password } = user;

  // Load in the stored users
  // const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // if (username in settings && bcrypt.compareSync(password, settings[username].password)) {
  //   currentUser = username;
  //   message.returnValue = settings[username].mode;
  //   return;
  // } else {
  //   message.returnValue = false;
  //   return;
  // }
  console.log('in login')

  return User.findOne({ username : username })
    .then((data) => {
    console.log('data', data)
    if (data !== null && bcrypt.compareSync(password, data.password)) {
      console.log('User found');
      // console.log('found data', data.mode)
      currentUser = username
      message.returnValue = data.mode
      return message.returnValue;
    } else {
      message.returnValue = false; 
      return message.returnValue;
    }
  })
  .catch((error) => {
    console.log(`checkUser failed : ${error}`)
    // return false;
  })









});

ipcMain.on('signOut', (message: IpcMainEvent) => {
  currentUser = 'guest';
  message.returnValue = true;
  return;
});

export { clearGuestSettings };
