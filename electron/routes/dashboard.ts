import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
const bcrypt = require('bcrypt');
const saltRounds = 12;
const User = require('../models/UserModel')
const mongoose = require('mongoose');


// GLOBAL VARIABLES
// currentUser is defaulted to 'guest'
// When user logs in or signs up with valid credentials, currentUser will be reassigned. 
let currentUser = 'guest';
const settingsLocation = path.resolve(__dirname, '../../settings.json');

/**
 * @event   hashPassword
 * @desc    hashes password provided when user signs up.
 * @return  {string} bcrypt hashed password
 */
function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

// Function to create new User with client's inputted data and saving into DB 
/**
 * @event   addUser
 * @desc    adds a new user to the user database
 */
function addUser(username, password, email) {
  console.log('Creating new User', username)
  const newUser = new User({ username: username, password: hashPassword(password), email: email})

  // Saving new User into DB
  newUser.save()
    .then((data) => {
    console.log('data saved', data)
  })
}

/**
 * @event   clearGuestSettings
 * @desc    
 */
function clearGuestSettings() {
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // Guest Settings will be an array of length 1 with one object inside
  settings.guest.services = [];
  settings.guest.mode = 'light';
  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
}

/**
 * @event   addApp
 * @desc    If guest user, adds an application to the user's list in the settings.json with the provided fields.  
 *          If user is logged in, makes an update query request to MongoDB to add an application to the services array under corresponding user document. 
 * @return  New array of applications
 */
ipcMain.on('addApp', (message: IpcMainEvent, application: any) => {
  const newApp = JSON.parse(application)
  console.log('parsed newApp: ', newApp);
  console.log('currentUser', currentUser);
  const createdOn = moment().format('lll');
  newApp.push(createdOn);

  //If currentUser is guest, add services to local instance (settings.json)
  if (currentUser === 'guest') {
    // Retrieves file contents from settings.json
    const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
    const services = settings[currentUser].services;

    // Add app to list of applications
    services.push(newApp);

    // Update settings.json with new list
    fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

    // Sync event - return new applications list
    message.returnValue = services.map((arr: string[]) => [...arr]);

  // Else user is logged in, find user information in DB and add newApp to list of applications
  } else {
    //Updating DB by pushing newApp into services array
    return User.findOneAndUpdate({ username: currentUser }, {
      $push: {services: newApp}
    }, { new: true })
    
    .then((data) => {
      console.log('User updated', data);
      message.returnValue = data.services.map((arr)=> [...arr])
    })
      
    .catch((error) => {
      console.log(`addApp failed : ${error}`)
    })
  }
});

/**
 * @event   addAwsApp
 * @param  name, 'AWS', region, description, typeOfService, instanceID, accessKey, secretAccessKey, awsURL
 * @desc    If guest user, adds an AWS application to the user's list in the settings.json with the provided fields
 *          If user is logged in, makes an update query request to MongoDB to add an AWS application to the services array under corresponding user document. 
 * @return  New list of applications
 */
ipcMain.on('addAwsApp', (message: IpcMainEvent, application: any) => {

  const newAwsApp = JSON.parse(application);
  console.log('parsed newApp: ', newAwsApp);
  console.log('currentUser', currentUser);
  const createdOn = moment().format('lll');
  newAwsApp.push(createdOn);

  //If user is logged in, find user information in DB and add newAwsApp to list of applications
  if(currentUser !== 'guest'){
    return User.findOneAndUpdate({ username: currentUser }, {
      $push: {services: newAwsApp}
    }, {new: true})
    .then((data) => {
      console.log('User updated', data);
      // returning each array element name, 'AWS', region, 'AWS/(instance)', Date
      message.returnValue = data.services.map((arr: string[]) => [arr[0], arr[1], arr[2], arr[4], arr[5]])
    })
    .catch((error) => {
      console.log(`addAWSApp failed : ${error}`)
    })
  } else {
    // if user is not logged in, should not have to pull info from settings.json file
  console.log('current user is a guest, data will be saved locally...')
  // Retrieves file contents from settings.json
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  const services = settings[currentUser].services;

  newAwsApp.splice(5, 0, createdOn);

  // Add app to list of applications
  services.push(newAwsApp);

  // Update settings.json with new list
  fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

  // Sync event - return new applications list
  message.returnValue = services.map((arr: string[]) => [arr[0], arr[1], arr[2], arr[4], arr[5]]);
  }
});

/**
 * @event   getApps
 * @desc    Retrieves the existing list of applications belonging to the user and current user setting for mode of preference
 * @return  Returns the list of applications
 */
// Returns updated state back to the render process on ipc 'dashboard' request
ipcMain.on('getApps', (message: IpcMainEvent) => {
  // Retrieves file contents from settings.json for current Apps
  const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
  // const services: string[][] = settings[currentUser].services;
  let services: string[][] = settings['guest'].services; // temporarily set to guests at every login attempt

  //If user is guest
  if (currentUser === 'guest') {
    services = settings['guest'].services
    const dashboardList: string[][] = services.map((arr: string[]) => [...arr]);
    message.returnValue = dashboardList;

    //If user is not logged in
  } else {

    //Find and return services listed under logged in user
    return User.findOne({ username: currentUser })
    .then((data) => {
      console.log('User found', data);
      services = data.services; 
      const dashboardList: string[][] = services.map((arr: string[]) => [...arr]);
      message.returnValue = dashboardList;
    })
      
    .catch((error) => {
      console.log(`checkUser failed : ${error}`)
    })
  }

});

/**
 * @event   deleteApp
 * @desc    If guest user, deletes the desired application from settings.json which is located with the provided index
 *          If user is logged in, makes an update query request to mongoDB to delete the desired application in services array
 * @return  Returns the new list of applications
 */
ipcMain.on('deleteApp', (message: IpcMainEvent, index) => {

  //If user is not logged in
  if (currentUser === 'guest') {

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
  }

  //If user is logged in
  else {

    return User.findOne({ username: currentUser })
      
    .then((data) => {
      console.log('User found', data);
      const service = data.services[index]; 
      
        // Delete service from services array in corresponding user's document in mongoDB
        return User.findOneAndUpdate({ username: currentUser }, {
          $pull: {services: service}
        }, { new: true })
          
          .then((data) => {
            console.log('Service deleted', data);
            message.returnValue = data.services.map((arr)=> [...arr])
          })

  .catch((error) => {
    console.log(`addApp failed : ${error}`)
  })
      })
    .catch((error) => {
      console.log(`checkUser failed : ${error}`)
      // return false;
    })

  }
});

// v10 note: have not yet been updated in DB
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


/**
 * @event addUser
 * @desc Checks if username already exists. If not, invokes addUser() to create new User document in mongoDB 
 * @return Returns a boolean to the renderer end to signify if addUser() was invoked based on whether username already exists in DB
 */

ipcMain.handle('addUser', (message: IpcMainEvent, user: { username: string; password: string; email: string }) => {
    const { username, password, email } = user;
    console.log('in ipcMainhandle', user)

    // checks if username exist in DB, if not, addUser is invoked
  return User.findOne({ username: username })
      
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
    })

  }
);

/**
 * @event login
 * @desc Checks if username and password matches what's in DB. If yes, reassign currentUsername and sends mode to renderer end. If not, sends boolean 'false' to renderer end to signify credentials not found or does not match. 
 * @return Returns the mode string, representing user's mode OR boolean 'false', representing credentials not found or does not match.
 */

ipcMain.on('login', (message: IpcMainEvent, user: { username: string; password: string }) => {
  const { username, password } = user;

  //Checks if user exists in DB
  return User.findOne({ username : username })
    .then((data) => {
    console.log(data.username, ' is being logged in...');

    //Checks if user is found and password matches
    if (data !== null && bcrypt.compareSync(password, data.password)) {
      console.log('Login was successful.');
      console.log('returned data: ', data);
      console.log('found data', data.mode);
      currentUser = username

      // returnValue being set to mode, returned as string.
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


/**
 * @event signOut
 * @desc Logs out user and reassigns currentUser to 'guest' 
 * @return Returns boolean true
 */

ipcMain.on('signOut', (message: IpcMainEvent) => {
  currentUser = 'guest';
  message.returnValue = true;
  return;
});

export { clearGuestSettings };
