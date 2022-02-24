import { ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
/**
 * @event   addApp
 * @desc    Adds an application to the user's list in the settings.json with the provided fields
 * @return  New list of applications
 */

// Loads existing settings JSON and update settings to include new services entered by the user on 'submit' request
ipcMain.on('getLP', (message: IpcMainEvent) => {
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../settings.json')).toString('utf8')
  );
  message.returnValue = state.landingPage;
});

ipcMain.on('updateLP', (message: IpcMainEvent, newLP: string) => {
  const state = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../settings.json')).toString('utf8')
  );
  state.landingPage = newLP;
  fs.writeFileSync(path.resolve(__dirname, '../../settings.json'), JSON.stringify(state));
  message.returnValue = state.landingPage;
});

ipcMain.on(
  'addUser',
  (message: IpcMainEvent, user: { email: string; username: string; password: string }) => {
    const { email, username, password } = user;
    if (!fs.existsSync(path.resolve(__dirname, '../../users.json'))) {
      const firstUser: {
        [key: string]: {
          email: string;
          username: string;
          password: string;
          admin: boolean;
          awaitingApproval: boolean;
        };
      } = {};
      firstUser[email] = { email, username, password, admin: true, awaitingApproval: false };
      fs.writeFileSync(path.resolve(__dirname, '../../users.json'), JSON.stringify(firstUser));
      message.returnValue = firstUser;
    } else {
      // eslint-disable-next-line no-use-before-define
      message.returnValue = ensureEmailIsUnique();
    }

    function ensureEmailIsUnique() {
      const users = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '../../users.json')).toString('utf8')
      );
      if (email in users) return false;
      users[email] = { email, username, password, admin: false, awaitingApproval: true };
      fs.writeFileSync(path.resolve(__dirname, '../../users.json'), JSON.stringify(users));
      return true;
    }
  }
);

ipcMain.on('verifyUser', (message: IpcMainEvent, user: { email: string; password: string }) => {
  const { email, password } = user;
  const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../users.json')).toString('utf8')
  );
  const currUser: {
    email: string;
    username: string;
    password: string;
    admin: boolean;
    awaitingApproval: boolean;
  } = users[email];
  if (email in users && currUser.password === password)
    message.returnValue = currUser.awaitingApproval ? 'awaitingApproval' : currUser;
  else message.returnValue = false;
});

ipcMain.on('getUsersAwaitingApproval', (message: IpcMainEvent) => {
  const usersObj = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../users.json')).toString('utf8')
  );
  const returnObj: { [key: string]: any } = {};
  for (const user in usersObj) {
    if (usersObj[user].awaitingApproval) {
      const { email, username} = usersObj[user];
      returnObj[email] = { email, username };
    }
  }
  message.returnValue = returnObj;
});

ipcMain.on('approveAccount', (message: IpcMainEvent, userEmail: string) => {
  const users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../users.json')).toString('utf8')
  );
  if (userEmail in users) {
    users[userEmail].awaitingApproval = false;
    fs.writeFileSync(path.resolve(__dirname, '../../users.json'), JSON.stringify(users));
    message.returnValue = true;
  } else message.returnValue = false;
});
