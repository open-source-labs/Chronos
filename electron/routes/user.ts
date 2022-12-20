/* eslint-disable no-use-before-define */
import { ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';

const bcrypt = require('bcrypt');

const saltRounds = 12;

let settingsLocation;
let usersLocation;
if (process.env.NODE_ENV === 'development') {
  settingsLocation = path.resolve(__dirname, '../../__tests__/test_settings.json');
  usersLocation = path.resolve(__dirname, '../../__tests__/test_users.json');
} else {
  settingsLocation = path.resolve(__dirname, '../../settings.json');
  usersLocation = path.resolve(__dirname, '../../users.json');
}


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
