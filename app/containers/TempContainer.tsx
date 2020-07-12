import React, { useEffect, useState, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
import { ApplicationContext } from '../context/ApplicationContext';
import { Switch, Route } from 'react-router-dom';
import ApplicationTitle from '../components/ApplicationTitle';
import CommsContainer from './CommsContainer';
import HealthContainer from './HealthContainer';

export interface Params {
  app: string;
  service: string;
}

export interface TempContainerProps {
  match: {
    path: string;
    url: string;
    isExact: boolean;
    params: Params;
  };
}

const TempContainer: React.SFC<TempContainerProps> = ({
  match: {
    params: { app, service },
  },
}) => {
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const { fetchHealthData, setHealthData } = useContext(HealthContext);
  const { fetchCommsData, setCommsData } = useContext(CommsContext);
  const { fetchDockerData, setDockerData } = useContext(DockerContext);
  const { servicesData } = useContext(ApplicationContext);

  useEffect(() => {
    if (live) {
      setIntervalID(
        setInterval(function () {
          fetchCommsData();
          fetchHealthData(service);
          fetchDockerData(service);
        }, 3000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchCommsData();
      fetchHealthData(service);
      fetchDockerData(service);
    }
    // On unmount: clear data
    return () => {
      if (intervalID) clearInterval(intervalID);
      setHealthData({});
      setCommsData([]);
      setDockerData({});
    };
  }, [service, live]);

  return (
    <>
      <ApplicationTitle app={app} service={service} />
      {service === 'communications' ? <CommsContainer /> : <HealthContainer />}
    </>
  );
};

export default TempContainer;
