import React, { useState, useEffect, useRef, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import RequestTypesChart from '../charts/request-type-chart';
import ResponseCodesChart from '../charts/response-code-chart';
import MicroServiceTraffic from '../charts/microservice-traffic';
import SpeedChart from '../charts/speed-chart';
import ProcessesChart from '../charts/processes-chart';
import TemperatureChart from '../charts/temperature-chart';
import LatencyChart from '../charts/latency-chart';
import MemoryChart from '../charts/memory-chart';
import RouteTrace from '../charts/route-trace';
import DockerStatsChart from '../charts/docker-stats-chart';
import '../stylesheets/GraphsContainer.css';

interface IParams{
  service: string
  
}

interface IMatch {
  match:{
    path: string;
  url: string;
  isExact: boolean;
  params: IParams;
  }
  
}

interface IService{
  service:{
   service: string 
  }
  
}

interface ITemperatureChart extends React.Props<any>{

}

interface Props extends React.Props<any>{
  service: any
}

const GraphsContainer = ({ match }: IMatch) => {
  console.log('match test-------->', match.params)
    // for (let  keys in match){
    //   console.log('test--------->key',keys)
    //   console.log('test--------->objkey ',match[keys])
    // }
  //   const initialData = {
  //   nodes: [{ id: 'reverse-proxy' }, { id: 'books' }, { id: 'customers' }, { id: 'orders' }],
  //   links: [
  //     { source: 'reverse-proxy', target: 'books' },
  //     { source: 'reverse-proxy', target: 'customers' },
  //     { source: 'reverse-proxy', target: 'orders' },
  //     { source: 'books', target: 'orders' },
  //     { source: 'customers', target: 'books' },
  //     { source: 'orders', target: 'customers' },
  //   ],
  // };

  const [data, setData] = useState(null);
  const width = 400;
  const height = 400;
  const [active, setActive] = useState(null);
  const canvas = useRef(null);

  // function fetchData() {
  //   Promise.resolve().then(() => setData(Object.values(initialData)));
  // }

  // useEffect(() => {
  //   if (data && data.length) {
  //     const d3Props = {
  //       data,
  //       width,
  //       height,
  //       onClick: setActive,
  //     };
  //     new RouteTrace(canvas.current, d3Props);
  //   }
  // }, [data]);

  // useEffect(fetchData, []);

  // Get current service name from params
  const { service } = match.params;
 

  const { fetchHealthData, setHealthData } = useContext(HealthContext);
  const { fetchCommsData, setCommsData } = useContext(CommsContext);

  // On Mount: fetch communication data and health data
  useEffect(() => {
    fetchCommsData();
    fetchHealthData(service);
    console.log('maybe other service --------->',service)
    // On unmount: clear data
    return () => {
      setHealthData({});
      setCommsData([]);
    };
  }, [service]);
  
  return (
    <div id="serviceDetailsContainer">
      <h3 id="microserviceHealthTitle">Microservice: {service}</h3>
      <div className="graphsGrid">
        <div className="routes">
          <div ref={canvas} />
        </div>
        <SpeedChart />
        <TemperatureChart />
        <RequestTypesChart  />
        <ResponseCodesChart />
        <ProcessesChart service={service} />
        <LatencyChart  />
        <MicroServiceTraffic service={service} />
        <MemoryChart />
        <DockerStatsChart service={service} />
      </div>
    </div>
  );
};

export default GraphsContainer;
