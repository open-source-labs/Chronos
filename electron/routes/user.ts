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
