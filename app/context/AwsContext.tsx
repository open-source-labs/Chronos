import React, { useCallback, useState, useEffect, useContext } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';
const { ipcRenderer } = window.require('electron');
import { useQuery } from 'react-query';
import { ApplicationContext } from './ApplicationContext';

export const AwsContext = React.createContext<any>(null);

interface Props {
  children: any;
}

const AwsContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [awsData, setAwsData] = useState<any>({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] })
  const [awsAppInfo, setAwsAppInfo] = useState<any>({ typeOfService: '', region: '' });
  
  const fetchAwsData = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('awsMetricsResponse');
    
    ipcRenderer.send('awsMetricsRequest', username, index);
    ipcRenderer.on('awsMetricsResponse', (event: Electron.Event, res: any) => {
      const data = JSON.parse(res);
      console.log('data fetched from AWS context is: ', data);

      setAwsData(data);
    })
  };

  const fetchAwsAppInfo = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('awsAppInfoResponse');

    ipcRenderer.send('awsAppInfoRequest', username, index);
    ipcRenderer.on('awsAppInfoResponse', (event: Electron.Event, res: any) => {
      const appInfo = JSON.parse(res);
      console.log('app info requested from fetchAwsAppInfo: ', appInfo)

      setAwsAppInfo(appInfo);
    })
  }

  return (
    <AwsContext.Provider
      value={{ fetchAwsData, awsData, awsAppInfo, fetchAwsAppInfo}}
    >
      {children}
    </AwsContext.Provider>
  );
});

export default AwsContextProvider;