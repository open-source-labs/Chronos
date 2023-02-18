import React, { useCallback, useState, useEffect, useContext } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';
const { ipcRenderer } = window.require('electron');
import { useQuery } from 'react-query';

export const AwsContext = React.createContext<any>(null);

interface Props {
  children: any;
}

const AwsContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [awsData, setAwsData] = useState<any>({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] })
  
  const fetchAwsData = (username) => {
    ipcRenderer.send('awsMetricsRequest', username);
    ipcRenderer.on('awsMetricsResponse', (event: Electron.Event, res: any) => {
      const data = JSON.parse(res);
      console.log('data fetched from AWS context is: ', data);

      setAwsData(data);
    })
  };

  return (
    <AwsContext.Provider
      value={{ fetchAwsData, awsData, setAwsData }}
    >
      {children}
    </AwsContext.Provider>
  );
});

export default AwsContextProvider;