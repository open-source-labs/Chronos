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
  awsUrl: string
}

const AwsContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [awsData, setAwsData] = useState<AwsData>({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] })
  const [awsEcsData, setAwsEcsData] = useState<any>({});
  const [awsEksData, setAwsEksData] = useState<any>({});

  const [awsAppInfo, setAwsAppInfo] = useState<AwsAppInfo>({ typeOfService: '', region: '' , awsUrl: ''});
  const [isLoading, setLoadingState] = useState<boolean>(true);
  
  const fetchAwsData = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('ec2MetricsResponse');
    
    ipcRenderer.send('ec2MetricsRequest', username, index);
    ipcRenderer.on('ec2MetricsResponse', (event: Electron.Event, res: any) => {
      const data = JSON.parse(res);
      
      setAwsData(data);
      setLoadingState(false);
    })
  };

  const fetchAwsEcsData = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('ecsMetricsResponse');
    
    ipcRenderer.send('ecsMetricsRequest', username, index);
    ipcRenderer.on('ecsMetricsResponse', (event: Electron.Event, res: any) => {
      const data = JSON.parse(res);

      setAwsEcsData(data);
      setLoadingState(false);
    });
  };
  const fetchAwsEksData = (username: string, index: number) => {
    ipcRenderer.removeAllListeners('eksMetricsResponse');
    
    ipcRenderer.send('eksMetricsRequest', username, index);
    console.log("hi2");
    ipcRenderer.on('eksMetricsResponse', (event: Electron.Event, res: any) => {
      console.log('response: ', res)
      const data = JSON.parse(res);
      console.log('data: ', data)
      setAwsEksData(data);
      setLoadingState(false);
    });
    
  };

  /**
 * @event   fetchAWSAppInfo - invoked in AWSGraphsContainer
 * @desc    
 * @params  username: 
 *          index: 
 */
  
  const fetchAwsAppInfo = (username: string, index: number) => {
    console.log('Hi, AwsContext -> fetchAwsAppInfo was invoked.');
    ipcRenderer.removeAllListeners('awsAppInfoResponse');
    console.log('fetchAAWSAppInfo was invoked for card index: ', index);
    console.log('Sending request to ipcMain.on for channel awsAppInfoRequest...');
    ipcRenderer.send('awsAppInfoRequest', username, index);
    ipcRenderer.on('awsAppInfoResponse', (event: Electron.Event, res: any) => {
      const appInfo = JSON.parse(res);
      console.log('received response: ', appInfo);
      setAwsAppInfo(appInfo);
    });
  };
  return (
    <AwsContext.Provider
      value={{ fetchAwsData, awsData, setAwsData, fetchAwsEcsData,fetchAwsEksData, awsEksData, setAwsEksData, awsEcsData, setAwsEcsData, awsAppInfo, setAwsAppInfo, fetchAwsAppInfo, isLoading, setLoadingState}}
    >
      {children}
    </AwsContext.Provider>
  );
});

export default AwsContextProvider;