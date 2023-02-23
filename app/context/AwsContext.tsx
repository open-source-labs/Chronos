import React, { useCallback, useState, useEffect, useContext } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';
const { ipcRenderer } = window.require('electron');
import { ApplicationContext } from './ApplicationContext';

export const AwsContext = React.createContext<any>(null);

interface Props {
  children: any;
}

interface AwsData {
  CPUUtilization: [],
  NetworkIn: [],
  NetworkOut: [],
  DiskReadBytes: []
}

interface AwsAppInfo {
  typeOfService: string,
  region: string
}

const AwsContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [awsData, setAwsData] = useState<AwsData>({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] })
  const [awsEcsData, setAwsEcsData] = useState<any>({});
  const [awsAppInfo, setAwsAppInfo] = useState<AwsAppInfo>({ typeOfService: '', region: '' });
  const [isLoading, setLoadingState] = useState<boolean>(true);
  
  const fetchAwsData = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('ec2MetricsResponse');
    
    ipcRenderer.send('ec2MetricsRequest', username, index);
    ipcRenderer.on('ec2MetricsResponse', (event: Electron.Event, res: any) => {
      const data = JSON.parse(res);
      console.log('ec2 data fetched from AWS context is: ', data);
      
      setAwsData(data);
      setLoadingState(false);
    })
  };

  const fetchAwsEcsData = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('ecsMetricsResponse');
    setLoadingState(true);
    
    ipcRenderer.send('ecsMetricsRequest', username, index);
    ipcRenderer.on('ecsMetricsResponse', (event: Electron.Event, res: any) => {
      const data = JSON.parse(res);
      console.log('ecs data fetched from AWS context is: ', data);

      setAwsEcsData(data);
      setLoadingState(false);
    });
  };

  const fetchAwsAppInfo = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('awsAppInfoResponse');
    setLoadingState(true);

    ipcRenderer.send('awsAppInfoRequest', username, index);
    ipcRenderer.on('awsAppInfoResponse', (event: Electron.Event, res: any) => {
      const appInfo = JSON.parse(res);
      console.log('app info requested from fetchAwsAppInfo: ', appInfo)

      setAwsAppInfo(appInfo);
    });
  };

  return (
    <AwsContext.Provider
      value={{ fetchAwsData, awsData, setAwsData, fetchAwsEcsData, awsEcsData, setAwsEcsData, awsAppInfo, setAwsAppInfo, fetchAwsAppInfo, isLoading}}
    >
      {children}
    </AwsContext.Provider>
  );
});

export default AwsContextProvider;