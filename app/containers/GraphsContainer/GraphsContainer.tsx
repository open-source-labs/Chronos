/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApplicationContext } from '../../context/ApplicationContext';
import { HealthContext } from '../../context/HealthContext';
import { CommsContext } from '../../context/CommsContext';
import { DockerContext } from '../../context/DockerContext';
import { EventContext } from '../../context/EventContext';
import Header from '../../components/Header';
import RequestTypesChart from '../../charts/RequestTypesChart';
import ResponseCodesChart from '../../charts/ResponseCodesChart';
import TrafficChart from '../../charts/TrafficChart';
import RouteChart from '../../charts/RouteChart';
import LogsTable from '../../charts/LogsTable';
import EventContainer from '../EventContainer';
import TransferColumns from '../../components/TransferColumns';
import HealthContainer from '../HealthContainer';
import ModifyMetrics from '../ModifyMetricsContainer';
import * as DashboardContext from '../../context/DashboardContext';
import lightAndDark from '../../components/Styling';
import DockerHealthContainer from '../DockerHealthContainer';

import GraphNavBar from '../../components/GraphNavBar/GraphNavBar';

import '../../stylesheets/GraphsContainer.scss';
import Inspect from '../Inspect';

interface Params {
  app: any;
  service: string;
}

const GraphsContainer: React.FC = React.memo(() => {

  const { app, service } = useParams<keyof Params>() as Params;
  const [ live, setLive ] = useState<boolean>(false);
  const { intervalID, setIntervalID } = useContext(ApplicationContext);
  const { getSavedMetrics } = useContext(ApplicationContext);
  const { fetchHealthData, setHealthData } = useContext(HealthContext);
  const { setDockerData, dockerData } = useContext(DockerContext);
  const { fetchEventData, setEventData } = useContext(EventContext);
  // const { fetchKafkaEventData, setKafkaEventData } = useContext(EventContext);
  // const { fetchKubernetesEventData, setKubernetesEventData } = useContext(EventContext);
  const { fetchCommsData } = useContext(CommsContext);
  const [chart, setChart] = useState<string>('all');
  const { mode } = useContext(DashboardContext.DashboardContext);
  let [inspect, setInspect] = useState<boolean>(false);

  useEffect(() => {
    const serviceArray = service.split(' ');
    // You would think you should add "kubernetesmetrics" into the below for consistency's sake but it makes it  not work correctly, so it has been omitted
    const healthServiceArray = serviceArray.filter(
      (value: string) => value !== 'kafkametrics' && value !== 'kubernetesmetrics'
    );
    if (live) {
      setIntervalID(
        setInterval(() => {
          //HERE fetching health data when on Live
          fetchCommsData(app, live);
          fetchHealthData(healthServiceArray);
          if (service.includes('kafkametrics')) {
            fetchEventData('kafkametrics');
          }
          // JJ-ADDITION
          if (service.includes('kubernetesmetrics')) {
            fetchEventData('kubernetesmetrics');
          }
        }, 10000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchCommsData(app, live);
      fetchHealthData(healthServiceArray);
      if (service.includes('kafkametrics')) {
        fetchEventData('kafkametrics');
      }
      // JJ-ADDITION
      if (service.includes('kubernetesmetrics')) {
        fetchEventData('kubernetesmetrics');
      }
      getSavedMetrics();
    }

    return () => {
      if (intervalID) clearInterval(intervalID);
      setHealthData({});
      setDockerData({});
      setEventData({ eventDataList: [], eventTimeList: [] });
    };
  }, [service, live]);

  //random variable to hold the light or dark mode of the display?..ok....sure
  const currentMode = mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  return (
    <>

      <GraphNavBar
        chart={chart}
        setChart={setChart}
        dockerData={dockerData}
        inspect={inspect}
        setInspect={setInspect}
      />
      <Header
        app={app} 
        service={service} 
        live={live} 
        setLive={setLive} 
      />

      {inspect && <Inspect />}
      
      <div className="graphs-container">
        {chart === 'communications' ? (
          <div className="graphs">
            <RequestTypesChart />
            <ResponseCodesChart />
            <TrafficChart />
            <RouteChart />
            <LogsTable />
          </div>
        ) : (
          <div className="graphs">
            {chart === 'all' && (
              <div className="transferColumns">
                <h2 style={currentMode}>Search Your Metrics to Display</h2>
                <TransferColumns />
              </div>
            )}
            {
            chart.startsWith('health_') ?
              <HealthContainer
                sizing="solo"
                category={chart.substring(7)}
              />
              :
            chart.startsWith('event_') ?
              <EventContainer 
                sizing="solo" 
              />
              :
            chart.startsWith('docker_') ?
              
              <DockerHealthContainer 
                sizing="solo"
                category={chart.substring(7)} 
              />
              :
              <></>
              }
            {
            chart === 'modifyMetrics' && 
              <ModifyMetrics />
            }
          </div>
        )}
      </div>
    </>
  );
});

export default GraphsContainer;
