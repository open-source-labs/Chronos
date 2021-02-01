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
 * @property  {Array} applications List of all applications, their description and creation date
 * @method    getApplications
 * @method    addApp
 * @method    deleteApp
 * @method    changeMode
 */
const DashboardContextProvider = React.memo(({ children }: Props) => {
  const [applications, setApplications] = useState<string[]>([]);
  const [mode, setMode] = useState<string>('');
  /**
   * Sends a request for all existing applications belonging to a user
   * and sets the applications state to the list of app names
   * Also sends a request for the previously saved theme/mode 
   * and sets the mode state to the retrieved settings
   */
  const getApplications = useCallback(() => {
    const result = ipcRenderer.sendSync('getApps');
    setApplications(result[0]);
    setMode(result[1]);
  }, []);

  /**
   * Sends a synchronous request to add a new application to the user's
   * list of applications with the provided fields. Returns the new list
   * of applications
   */
  const addApp = useCallback((fields: IFields) => {
    const { database, URI, name, description } = fields;
    const result = ipcRenderer.sendSync(
      'addApp',
      JSON.stringify([name, database, URI, description])
    );
    setApplications(result);
  }, []);

  /**
   * Sends a synchronous request to delete an application using a provided
   * index. The index is used to locate the desired application info in the
   * settings.json file in the backend. Returns the new list of applications
   */
  const deleteApp = useCallback((index: number) => {
    const result = ipcRenderer.sendSync('deleteApp', index);
    setApplications(result);
  }, []);
  
  /**
   * Sends a synchronous request to change the current mode/theme using a provided
   * string. The string is use to locate the desired mode info in settings.json in
   * the backend. Updates mode/theme.
   */

  const changeMode = useCallback((currMode: string) => {
  const result = ipcRenderer.sendSync(
      'changeMode',
      currMode
    );
    setMode(result);
  }, [])
  return (
    <DashboardContext.Provider value={{ applications, getApplications, addApp, deleteApp, mode, changeMode}}>
      {children}
    </DashboardContext.Provider>
  );
});

export default DashboardContextProvider;
