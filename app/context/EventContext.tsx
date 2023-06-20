import React, { useState, useCallback } from 'react';
import Electron from 'electron';
import { eventTransformer } from './helpers';

const { ipcRenderer } = window.require('electron');

export const EventContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} eventData
 * @method    fetchEventData
 * @method    setEventData
 */

interface Props {
  children: any;
}

const EventContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [eventData, setEventData] = useState({});

  function tryParseJSON(jsonString: any) {
    try {
      const obj = JSON.parse(jsonString);
      if (obj && typeof obj === 'object') {
        return true;
      }
    } catch (err) {
      console.log({ error: err });
    }
    return false;
  }

  /**
   * @function fetchEventData - takes an argument that is a string representing which metric type to be requested from the backend.
   * Sends a message using 'ipcRenderer.send'.
   * Fetches event data and updates the EventData state after transforming the data.
   */

  const fetchEventData = useCallback((arg: string) => {
    const argDict = {
      kafkametrics: {
        request: 'kafkaRequest',
        response: 'kafkaResponse',
      },
      kubernetesmetrics: {
        request: 'kubernetesRequest',
        response: 'kubernetesResponse',
      },
    };

    ipcRenderer.removeAllListeners(argDict[arg].response);
    ipcRenderer.send(argDict[arg].request);
    ipcRenderer.on(argDict[arg].response, (event: Electron.Event, data: any) => {
      if (tryParseJSON(data)) {
        const result: object[] = JSON.parse(data);
        if (result && result.length > 0) {
          const transformedData: object = eventTransformer(result[0][arg]);
          setEventData(transformedData);
        }
      }
    });
  }, []);

  return (
    <EventContext.Provider
      value={{
        eventData,
        setEventData,
        fetchEventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
});
export default EventContextProvider;
