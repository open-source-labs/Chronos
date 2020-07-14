import React, { useState, createContext } from 'react';

const { ipcRenderer } = window.require('electron');

type IDashboard = {
  applications: string[];
  getApplications: () => void;
  addApp: (fields: IFields) => void;
  deleteApp: (index: number) => void;
};

interface IFields {
  database: string;
  URI: string;
  name: string;
  description: string;
}

export const DashboardContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

const DashboardContextProvider = ({ children }: Props) => {
  const [applications, setApplications] = useState<string[]>([]);

  /**
   * Sends a request for all existing applications belonging to a user
   * and sets the applications state to the list of app names
   */
  const getApplications = () => {
    const result = ipcRenderer.sendSync('getApps');
    setApplications(result);
  };

  /**
   * Sends a synchronous request to add a new application to the user's
   * list of applications with the provided fields. Returns the new list
   * of applications
   */
  const addApp = (fields: IFields) => {
    const { database, URI, name, description } = fields;
    const result = ipcRenderer.sendSync(
      'addApp',
      JSON.stringify([name, database, URI, description])
    );
    setApplications(result);
  };

  /**
   * Sends a synchronous request to delete an application using a provided
   * index. The index is used to locate the desired application info in the
   * settings.json file in the backend. Returns the new list of applications
   */
  const deleteApp = (index: number) => {
    const result = ipcRenderer.sendSync('deleteApp', index);
    setApplications(result);
  };

  return (
    <DashboardContext.Provider value={{ applications, getApplications, addApp, deleteApp }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
