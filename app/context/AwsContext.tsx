import React, { useCallback, useState, useEffect } from 'react';
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
  
  const fetchAwsData = useCallback(() => {
    console.log('i am here in fetchawsdata!!!')
    ipcRenderer.send('awsMetricsRequest');
    
    console.log('i am between the send and on!!!!!!!')
    ipcRenderer.on('awsMetricsResponse', (event: Electron.Event, data: any) => {
      console.log('data fetched from awsContext', data);
      setAwsData(data);
    })
    
    console.log('i am after the ipcrender!!!!')
  },[]);
  
  const { isLoading, data, error, isFetching } = useQuery('awsMetricsResponse', fetchAwsData);
  
  // useEffect(() => {
  //   console.log(data, isLoading, error, isFetching);
  // });

  return (
    <AwsContext.Provider
      value={{ awsData, fetchAwsData }}
    >
      {children}
    </AwsContext.Provider>
  );
});

export default AwsContextProvider;