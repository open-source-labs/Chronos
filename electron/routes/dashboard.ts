// import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
// import moment from 'moment';
// import path from 'path';
// import fs from 'fs';
// const bcrypt = require('bcrypt');
// const saltRounds = 12;
// const User = require('../models/UserModel');
// const mongoose = require('mongoose');

// // GLOBAL VARIABLES
// // currentUser is defaulted to 'guest'
// // When user logs in or signs up with valid credentials, currentUser will be reassigned.
// let currentUser = 'guest';
// const settingsLocation = path.resolve(__dirname, '../../settings.json');

// /**
//  * @event   hashPassword
//  * @desc    hashes password provided when user signs up.
//  * @return  {string} bcrypt hashed password
//  */
// function hashPassword(password: string) {
//   const salt = bcrypt.genSaltSync(saltRounds);
//   return bcrypt.hashSync(password, salt);
// }

// // Function to create new User with client's inputted data and saving into DB
// /**
//  * @event   addUser
//  * @desc    adds a new user to the user database
//  */
// function addUser(username, password, email) {
//   // console.log('Creating new User', username);
//   const newUser = new User({ username: username, password: hashPassword(password), email: email });

//   // Saving new User into DB
//   newUser.save().then(data => {
//     // console.log('data saved', data);
//   });
// }

// /**
//  * @event   clearGuestSettings
//  * @desc
//  */
// function clearGuestSettings() {
//   const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
//   // Guest Settings will be an array of length 1 with one object inside
//   settings.guest.services = [];
//   settings.guest.mode = 'light';
//   fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
// }

// /**
//  * @event   addApp
//  * @desc    If guest user, adds an application to the user's list in the settings.json with the provided fields.
//  *          If user is logged in, makes an update query request to MongoDB to add an application to the services array under corresponding user document.
//  * @return  New array of applications
//  */
// ipcMain.on('addApp', (message: IpcMainEvent, application: any) => {
//   const newApp = JSON.parse(application);
//   // console.log('parsed newApp: ', newApp);
//   // console.log('currentUser', currentUser);
//   const createdOn = moment().format('lll');
//   newApp.push(createdOn);

//   // If currentUser is guest, add services to local instance (settings.json)
//   if (currentUser === 'guest') {
//     // Retrieves file contents from settings.json
//     const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
//     const services = settings[currentUser].services;

//     // Add app to list of applications
//     services.push(newApp);

//     // Update settings.json with new list
//     fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

//     // Sync event - return new applications list
//     message.returnValue = services.map((arr: string[]) => [...arr]);
//   } else {
//     // Updating DB by pushing newApp into services array
//     return User.findOneAndUpdate(
//       { username: currentUser },
//       { $push: { services: newApp } },
//       { new: true }
//     )
//       .then(data => {
//         // console.log('User updated', data);
//         message.returnValue = data.services.map(arr => [...arr]);
//       })
//       .catch(error => {
//         console.log(`addApp failed : ${error}`);
//       });
//   }
// });

// /**
//  * @event   addAwsApp
//  * @desc    If guest user, adds an AWS application to the user's list in the settings.json with the provided fields.
//  *          If user is logged in, makes an update query request to MongoDB to add an AWS application to the services array under corresponding user document.
//  * @return  New list of applications
//  */
// ipcMain.on('addAwsApp', (message: IpcMainEvent, application: any) => {
//   const newAwsApp = JSON.parse(application);
//   // console.log('parsed newApp: ', newAwsApp);
//   // console.log('currentUser', currentUser);
//   const createdOn = moment().format('lll');
//   newAwsApp.push(createdOn);

//   // If user is logged in, find user information in DB and add newAwsApp to list of applications
//   if (currentUser !== 'guest') {
//     return User.findOneAndUpdate(
//       { username: currentUser },
//       { $push: { services: newAwsApp } },
//       { new: true }
//     )
//       .then(data => {
//         // console.log('User updated', data);
//         // returning each array element name, 'AWS', region, 'AWS/(instance)', Date
//         message.returnValue = data.services.map((arr: string[]) => [
//           arr[0],
//           arr[1],
//           arr[2],
//           arr[4],
//           arr[5],
//         ]);
//       })
//       .catch(error => {
//         console.log(`addAWSApp failed : ${error}`);
//       });
//   } else {
//     // If user is not logged in, should not have to pull info from settings.json file
//     // console.log('current user is a guest, data will be saved locally...');
//     // Retrieves file contents from settings.json
//     const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
//     const services = settings[currentUser].services;

//     newAwsApp.splice(5, 0, createdOn);

//     // Add app to list of applications
//     services.push(newAwsApp);

//     // Update settings.json with new list
//     fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

//     // Sync event - return new applications list
//     message.returnValue = services.map((arr: string[]) => [arr[0], arr[1], arr[2], arr[4], arr[5]]);
//   }
// });

// /**
//  * @event   getApps
//  * @desc    Retrieves the existing list of applications belonging to the user and current user setting for mode of preference
//  * @return  Returns the list of applications
//  */
// ipcMain.on('getApps', (message: IpcMainEvent) => {
//   // Retrieves file contents from settings.json for current Apps
//   const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
//   let services: string[][] = settings['guest'].services; // temporarily set to guests at every login attempt

//   // If user is guest
//   if (currentUser === 'guest') {
//     services = settings['guest'].services;
//     const dashboardList: string[][] = services.map((arr: string[]) => [...arr]);
//     message.returnValue = dashboardList;
//   } else {
//     // Find and return services listed under logged in user
//     return User.findOne({ username: currentUser })
//       .then(data => {
//         services = data.services;
//         const dashboardList: string[][] = services.map((arr: string[]) => [...arr]);
//         message.returnValue = dashboardList;
//       })
//       .catch(error => {
//         // console.log(`checkUser failed : ${error}`);
//       });
//   }
// });

// /**
//  * @event   deleteApp
//  * @desc    If guest user, deletes the desired application from settings.json which is located with the provided index.
//  *          If user is logged in, makes an update query request to mongoDB to delete the desired application in services array.
//  * @return  Returns the new list of applications.
//  */
// ipcMain.on('deleteApp', (message: IpcMainEvent, index: number, action: string) => {
//   // If user is not logged in
//   if (currentUser === 'guest') {
//     const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
//     let guestServices = settings[currentUser].services;

//     // Remove application from settings.json
//     if (action === 'all') guestServices.splice(0);
//     else guestServices.splice(index, 1);

//     // Update settings.json with new list
//     fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'), {
//       encoding: 'utf8',
//     });

//     // Sync event - return new applications list
//     message.returnValue = guestServices.map((arr: string[]) => [...arr]);
//   } else {
//     return User.findOne({ username: currentUser })
//       .then(data => {
//         const service = data.services[index];

//         // Delete service from services array in corresponding user's document in MongoDB
//         return User.findOneAndUpdate(
//           { username: currentUser },
//           { $pull: { services: service } },
//           { new: true }
//         )
//           .then(data => {
//             message.returnValue = data.services.map(arr => [...arr]);
//           })
//           .catch(error => {
//             console.log(`addApp failed : ${error}`);
//           });
//       })
//       .catch(error => {
//         console.log(`checkUser failed : ${error}`);
//       });
//   }
// });

// // v10 note: have not yet been updated in DB
// /**
//  * @event changeMode
//  * @desc Changes user's mode/theme preference from settings.json.
//  * @return Returns the newly updated setting preference of the app to the renderer end.
//  */
// ipcMain.on('changeMode', async (message: IpcMainEvent, currMode: string) => {
//   if (currentUser === 'guest') {
//     const settings = JSON.parse(fs.readFileSync(settingsLocation).toString('utf8'));
//     const userSettings = settings[currentUser];
//     userSettings.mode = currMode;
//     fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
//   } else {
//     try {
//       await User.findOneAndUpdate({ userName: currentUser }, { $set: { mode: currMode } });
//     } catch (err) {
//       console.log('Error in changeMode ', err);
//     }
//   }
//   message.returnValue = currMode;
// });

// /**
//  * @event addUser
//  * @desc Checks if username already exists. If not, invokes addUser() to create new User document in MongoDB.
//  * @return Returns a boolean to the renderer to signify if addUser() was invoked.
//  */
// ipcMain.handle(
//   'addUser',
//   async (event: IpcMainInvokeEvent, user: { username: string; password: string; email: string }) => {
//     const { username, password, email } = user;
//     try {
//       const data = await User.findOne({ username: username });
//       if (data) {
//         return false;
//       } else {
//         await addUser(username, password, email);
//         return true;
//       }
//     } catch (error) {
//       console.log(`checkUser failed : ${error}`);
//       throw error;
//     }
//   }
// );

// /**
//  * @event login
//  * @desc Checks if username and password match what's in DB.
//  *       If yes, reassigns currentUser and returns user's mode.
//  *       Otherwise returns false.
//  */
// ipcMain.on('login', (message: IpcMainEvent, user: { username: string; password: string }) => {
//   const { username, password } = user;
//   return User.findOne({ username: username })
//     .then(data => {
//       if (data !== null && bcrypt.compareSync(password, data.password)) {
//         currentUser = username;
//         message.returnValue = data.mode;
//         return message.returnValue;
//       } else {
//         message.returnValue = false;
//         return message.returnValue;
//       }
//     })
//     .catch(error => {
//       console.log(`checkUser failed : ${error}`);
//     });
// });

// /**
//  * @event signOut
//  * @desc Logs out user and reassigns currentUser to 'guest'.
//  * @return Returns boolean true.
//  */
// ipcMain.on('signOut', (message: IpcMainEvent) => {
//   currentUser = 'guest';
//   message.returnValue = true;
//   return;
// });

// export { clearGuestSettings };
import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';  // ✅ Fix bcrypt import for ES Modules
import mongoose from 'mongoose';
import { UserModel } from '../models/UserModel.js'; // ✅ Named import for ES modules


// 🔹 Constants
const saltRounds = 12;
let currentUser: string = 'guest';
const settingsLocation: string = path.resolve(__dirname, '../../settings.json');

// ✅ Interfaces for TypeScript
interface UserCredentials {
  username: string;
  password: string;
  email?: string;
}

interface AwsApp {
  name: string;
  region: string;
  instance: string;
}

// 🔹 **Hash User Password**
function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

// 🔹 **Create a New User**
async function addUser(username: string, password: string, email: string): Promise<void> {
  const newUser = new UserModel({ username, password: hashPassword(password), email });

  try {
    await newUser.save();
    console.log(`✅ User '${username}' successfully added.`);
  } catch (error) {
    console.error(`❌ Error creating user:`, error);
  }
}

// 🔹 **Clear Guest Settings**
function clearGuestSettings(): void {
  try {
    const settingsData = fs.readFileSync(settingsLocation, 'utf8');
    if (!settingsData) {
      console.warn("⚠️ Settings file is empty!");
      return;
    }
    const settings = JSON.parse(settingsData);

    settings.guest.services = [];
    settings.guest.mode = 'light';

    fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
  } catch (error) {
    console.error(`❌ Error clearing guest settings:`, error);
  }
}

// 🔹 **Helper: Read JSON Safely**
function safeReadJSON(filePath: string): any {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    return rawData ? JSON.parse(rawData) : {};
  } catch (error) {
    console.error(`❌ Failed to read JSON file (${filePath}):`, error);
    return {};
  }
}

/**
 * 📌 **Add an Application (Electron IPC Event)**
 */
ipcMain.on('addApp', async (event: IpcMainEvent, application: string) => {
  try {
    const newApp = JSON.parse(application);
    newApp.push(moment().format('lll')); // Append createdOn timestamp

    if (currentUser === 'guest') {
      // Guest User: Store in Local Settings
      const settings = safeReadJSON(settingsLocation);
      settings.guest.services.push(newApp);
      fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

      event.returnValue = settings.guest.services;
    } else {
      // Logged-in User: Store in MongoDB
      const updatedUser = await UserModel.findOneAndUpdate(
        { username: currentUser },
        { $push: { services: newApp } },
        { new: true }
      );

      event.returnValue = updatedUser?.services || [];
    }
  } catch (error) {
    console.error(`❌ Error in addApp:`, error);
    event.returnValue = [];
  }
});

/**
 * 📌 **Add AWS Application (Electron IPC Event)**
 */
ipcMain.on('addAwsApp', async (event: IpcMainEvent, application: string) => {
  try {
    const newAwsApp: AwsApp = JSON.parse(application);
    newAwsApp.instance += ` - Created on: ${moment().format('lll')}`;

    if (currentUser === 'guest') {
      const settings = safeReadJSON(settingsLocation);
      settings.guest.services.push(newAwsApp);
      fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));

      event.returnValue = settings.guest.services;
    } else {
      const updatedUser = await UserModel.findOneAndUpdate(
        { username: currentUser },
        { $push: { services: newAwsApp } },
        { new: true }
      );

      event.returnValue = updatedUser?.services || [];
    }
  } catch (error) {
    console.error(`❌ Error in addAwsApp:`, error);
    event.returnValue = [];
  }
});

/**
 * 📌 **Retrieve User Applications**
 */
ipcMain.on('getApps', async (event: IpcMainEvent) => {
  try {
    if (currentUser === 'guest') {
      const settings = safeReadJSON(settingsLocation);
      event.returnValue = settings.guest.services;
    } else {
      const user = await UserModel.findOne({ username: currentUser });
      event.returnValue = user?.services || [];
    }
  } catch (error) {
    console.error(`❌ Error in getApps:`, error);
    event.returnValue = [];
  }
});

/**
 * 📌 **Delete Application**
 */
ipcMain.on('deleteApp', async (event: IpcMainEvent, index: number, action: string) => {
  try {
    if (currentUser === 'guest') {
      const settings = safeReadJSON(settingsLocation);
      if (action === 'all') settings.guest.services = [];
      else settings.guest.services.splice(index, 1);
      fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
      event.returnValue = settings.guest.services;
    } else {
      const user = await UserModel.findOne({ username: currentUser });
      if (user) {
        user.services.splice(index, 1);
        await user.save();
        event.returnValue = user.services;
      } else {
        event.returnValue = [];
      }
    }
  } catch (error) {
    console.error(`❌ Error in deleteApp:`, error);
    event.returnValue = [];
  }
});

/**
 * 📌 **Change Mode (Dark/Light)**
 */
ipcMain.on('changeMode', async (event: IpcMainEvent, currMode: string) => {
  try {
    if (currentUser === 'guest') {
      const settings = safeReadJSON(settingsLocation);
      settings.guest.mode = currMode;
      fs.writeFileSync(settingsLocation, JSON.stringify(settings, null, '\t'));
    } else {
      await UserModel.findOneAndUpdate({ username: currentUser }, { $set: { mode: currMode } });
    }
    event.returnValue = currMode;
  } catch (error) {
    console.error(`❌ Error in changeMode:`, error);
    event.returnValue = 'light';
  }
});

/**
 * 📌 **User Login**
 */
ipcMain.on('login', async (event: IpcMainEvent, user: UserCredentials) => {
  try {
    const foundUser = await UserModel.findOne({ username: user.username });
    if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
      currentUser = user.username;
      event.returnValue = foundUser.mode;
    } else {
      event.returnValue = false;
    }
  } catch (error) {
    console.error(`❌ Error in login:`, error);
    event.returnValue = false;
  }
});

/**
 * 📌 **User Sign-Out**
 */
ipcMain.on('signOut', (event: IpcMainEvent) => {
  currentUser = 'guest';
  event.returnValue = true;
});

export { clearGuestSettings };
