/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
import { EventContext } from '../context/EventContext';
import { QueryContext } from '../context/QueryContext';
import Header from '../components/Header';
import RequestTypesChart from '../charts/RequestTypesChart';
import ResponseCodesChart from '../charts/ResponseCodesChart';
import TrafficChart from '../charts/TrafficChart';
import DockerChart from '../charts/DockerChart';
import RouteChart from '../charts/RouteChart';
import LogsTable from '../charts/LogsTable';
import EventContainer from './EventContainer';
import TransferColumns from '../components/TransferColumns';
import HealthContainer from './HealthContainer';
import ModifyMetrics from './ModifyMetricsContainer';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from '../components/Styling';

import '../stylesheets/GraphsContainer.scss';
import { Link } from 'react-router-dom';
import Inspect from './Inspect';

interface Params {
  app: any;
  service: string;
}

const GraphsContainer: React.FC = React.memo(props => {
  const navigate = useNavigate();
  const { app, service } = useParams<keyof Params>() as Params;
  const [live, setLive] = useState<boolean>(false);
  const { intervalID, setIntervalID } = useContext(ApplicationContext);
  const { servicesData, getSavedMetrics } = useContext(ApplicationContext);
  const { fetchHealthData, setHealthData, services } = useContext(HealthContext);
  const { setDockerData, dockerData } = useContext(DockerContext);
  const { fetchEventData, setEventData } = useContext(EventContext);
  // const { fetchKafkaEventData, setKafkaEventData } = useContext(EventContext);
  // const { fetchKubernetesEventData, setKubernetesEventData } = useContext(EventContext);
  const { fetchCommsData, commsData } = useContext(CommsContext);
  const { selectedMetrics } = useContext(QueryContext);
  const [chart, setChart] = useState<string>('all');
  const [prevRoute, setPrevRoute] = useState<string>('');
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

  const routing = (route: string) => {
    if (location.href.includes('communications')) {
      if (prevRoute === '') navigate(`${servicesData[0].microservice}`);
      else navigate(prevRoute);
    }
    setChart(route);
  };

  const stringToColour = (string: string, recurses = 0) => {
    if (recurses > 20) return string;
    function hashString(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.substring(-2);
      }
      return colour;
    }
    function contrastYiq(color: string) {
      const num = parseInt(color.slice(1), 16);
      const r = (num >>> 16) & 0xff;
      const g = (num >>> 8) & 0xff;
      const b = num & 0xff;
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq <= 50 ? stringToColour(color, recurses + 1) : color;
    }
    for (let salt = 0; salt < 5; salt++) string = hashString(string);
    return contrastYiq(string);
  };

  const getHealthAndEventComponents = () => {
    const buttonList: JSX.Element[] = [];
    if (selectedMetrics) {
      selectedMetrics.forEach((element, id) => {
        const categoryName = Object.keys(element)[0];
        const prefix = categoryName === 'Event' ? 'event_' : 'health_';
        buttonList.push(
          <button
            id={`${prefix}${categoryName}-button`}
            className={chart === `${prefix}${categoryName}` ? 'selected' : undefined}
            onClick={() => routing(`${prefix}${categoryName}`)}
            key={`1-${id}`}
          >
            {categoryName}
          </button>
        );
      });
    }

    return buttonList;
  };

  const HealthAndEventButtons: JSX.Element[] = getHealthAndEventComponents();

  return (
    <>
      <nav id="navigationBar">
        <button
          className={chart === 'all' ? 'selected' : undefined}
          id="all-button"
          onClick={() => routing('all')}
          key="0"
        >
          Metrics Query
        </button>
        {HealthAndEventButtons}
        {dockerData.containername && (
          <button
            id="docker-button"
            className={chart === 'docker' ? 'selected' : undefined}
            onClick={() => routing('docker')}
            key="2"
          >
            Docker
          </button>
        )}
        {commsData.length > 0 && (
          <button
            id="communication-button"
            className={chart === 'communications' ? 'selected' : undefined}
            onClick={() => {
              if (!location.href.includes('communications')) setPrevRoute(services.join(' '));
              setChart('communications');
            }}
            key="3"
          >
            Communication
          </button>
        )}
        <button
          id="modify-metrics-button"
          className={chart === 'modifyMetrics' ? 'selected' : undefined}
          onClick={() => {
            routing('modifyMetrics');
          }}
          key="4"
        >
          Modify Metrics
        </button>
        {/* <Link className="sidebar-link" to="/Inspect" id="Inspect" >
          <SettingsIcon
              style={{
                WebkitBoxSizing: 'content-box',
                boxShadow: 'none',
                width: '35px',
                height: '35px',
              }}
            />
          &emsp;Inspect
        </Link> */}
        <button onClick={() => { setInspect(!inspect) }}>Inspect</button>
      </nav>
      <Header app={app} service={service} live={live} setLive={setLive} />
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
            {chart.startsWith('health_') && (
              <HealthContainer
                colourGenerator={stringToColour}
                sizing="solo"
                category={chart.substring(7)}
                currentService={service}
              />
            )}
            {chart.startsWith('event_') && (
              <>
                <EventContainer colourGenerator={stringToColour} sizing="solo" />
              </>

            )}
            {chart === 'docker' && <DockerChart />}
            {chart === 'modifyMetrics' && <ModifyMetrics />}
          </div>
        )}
      </div>
    </>
  );
});

export default GraphsContainer;
