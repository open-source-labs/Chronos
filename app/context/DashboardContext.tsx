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
}

export const DashboardContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

const DashboardContextProvider = ({ children }: Props) => {
  const [applications, setApplications] = useState<string[]>([]);

  const getApplications = () => {
    const result = ipcRenderer.sendSync('getApps');
    setApplications(result);
  };

  const addApp = (fields: IFields) => {
    const { database, URI, name } = fields;
    const result = ipcRenderer.sendSync('addApp', JSON.stringify([name, database, URI]));
    setApplications(result)
  };

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
