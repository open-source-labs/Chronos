/* eslint-disable no-console */
/* eslint-disable no-throw-literal */
import React, { useState, createContext, useCallback } from 'react';
const { ipcRenderer } = window.require('electron');

interface IFields {
  typeOfService: string;
  database: string;
  URI: string;
  name: string;
  description: string;
}

interface AwsFields {
  typeOfService: string;
  instance: string;
  region: string;
  accessKey: string;
  secretAccessKey: string;
  name: string;
  description?: string
}
// interface Props {
//   children: React.ReactNode;
// }

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

const DashboardContextProvider = React.memo((props: any) => {
  const children = props.children;

  // Initial user will always be the guest
  const [user, setUser] = useState('guest');
  const [applications, setApplications] = useState<string[]>([]);
  const [mode, setMode] = useState<string>('light');

  const getApplications = useCallback(() => {
    const result = ipcRenderer.sendSync('getApps');
    setApplications(result);
  }, []);

  const addApp = useCallback((fields: IFields) => {
    const { typeOfService, database, URI, name, description } = fields;
    console.log('what is the service that was passed into add app: ', typeOfService)
    const result = ipcRenderer.sendSync(
      'addApp',
      JSON.stringify([name, database, URI, description, typeOfService])
    );
    setApplications(result);
    console.log('the current application that was added is : ', result)
  }, []);

  const addAwsApp = useCallback((awsFields: AwsFields) => {
    const { typeOfService, instance, region, accessKey, secretAccessKey, name, description } = awsFields;
    const result = ipcRenderer.sendSync(
      'addAwsApp', //"addApp"
      JSON.stringify([name, typeOfService, region, description, typeOfService, instance, accessKey, secretAccessKey])
    );
    setApplications(result);
    console.log('the current application that was added is : ', result)
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
        applications,
        setApplications,
        getApplications,
        addApp,
        addAwsApp,
        deleteApp,
        mode,
        setMode,
        changeMode,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
});

export default DashboardContextProvider;
