/* eslint-disable no-console */
/* eslint-disable no-throw-literal */
import React, { useState, createContext, useCallback } from 'react';

const { ipcRenderer } = window.require('electron');

interface IFields {
  database: string;
  URI: string;
  name: string;
  description: string;
}

interface Props {
  children: React.ReactNode;
}

export const DashboardContext = createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Array} applications List of all applications, their description, database type and creation date
 * @method  getLandingPage  Sets landing page to organization's existing landing page
 * @method  updateLandingPage Sets landing page
 * @method  getApplications Sets theme/mode and user's list of apps
 * @method  addApp  Adds new app to user's list. Returns and sets new list of apps
 * @method  deleteApp Synchronous. Deletes app based on index. Returns new list of apps
 * @method  changeMode Changes theme/mode in settings.json and updates.
 */

const DashboardContextProvider = React.memo(({ children }: Props) => {
  const [applications, setApplications] = useState<string[]>([]);
  const [mode, setMode] = useState<string>('');
  // const [landingPage, setLandingPage] = useState<string>('before');
  const [authStatus, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<{}>({});

  // const getLandingPage = useCallback(() => {
  //   const result = ipcRenderer.sendSync('getLP');
  //   setLandingPage(result);
  // }, []);

  // const updateLandingPage = useCallback((newLP: string) => {
  //   const result = ipcRenderer.sendSync('updateLP', newLP);
  //   if (result === newLP) {
  //     setLandingPage(result);
  //     return result;
  //   }
  //   return 'Error in updateLandingPage in DashboardContext.tsx';
  // }, []);

  const getApplications = useCallback(() => {
    const result = ipcRenderer.sendSync('getApps');
    setApplications(result[0]);
    setMode(result[1]);
  }, []);

  const addApp = useCallback((fields: IFields) => {
    const { database, URI, name, description } = fields;
    const result = ipcRenderer.sendSync(
      'addApp',
      JSON.stringify([name, database, URI, description])
    );
    setApplications(result);
  }, []);

  const deleteApp = useCallback((index: number) => {
    const result = ipcRenderer.sendSync('deleteApp', index);
    setApplications(result);
  }, []);

  const changeMode = useCallback((currMode: string) => {
    const result = ipcRenderer.sendSync('changeMode', currMode);
    setMode(result);
  }, []);
  return (
    <DashboardContext.Provider
      value={{
        user,
        setUser,
        // landingPage,
        // getLandingPage,
        // updateLandingPage,
        authStatus,
        setAuth,
        applications,
        getApplications,
        addApp,
        deleteApp,
        mode,
        changeMode,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
});

export default DashboardContextProvider;
