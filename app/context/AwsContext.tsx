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
  const [awsData, setAwsData] = useState<any>(null)
  
  const fetchAwsData = (username) => {
    ipcRenderer.send('awsMetricsRequest', username);
    ipcRenderer.on('awsMetricsResponse', (event: Electron.Event, res: any) => {
      console.log('data fetched from awsContext', res);
      setAwsData(res);
      // return res;
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