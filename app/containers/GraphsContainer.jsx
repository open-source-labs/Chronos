import React, { useState, useEffect, useRef } from 'react';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import ProcessesChart from '../charts/processes-chart.jsx';
import TemperatureChart from '../charts/temperature-chart.jsx';
import LatencyChart from '../charts/latency-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';
import RouteTrace from '../charts/route-trace.jsx';
import MicroServiceTraffic from '../charts/microservice-traffic.jsx';
import '../stylesheets/graphs.css';


let vis;

const GraphsContainer = (props) => {
  const { service } = props;
  const initialData = {
    nodes: [
      { id: 'reverse-proxy' },
      { id: 'books' },
      { id: 'customers' },
      { id: 'orders' },
    ],
    links: [
      { source: 'reverse-proxy', target: 'books' },
      { source: 'reverse-proxy', target: 'customers' },
      { source: 'reverse-proxy', target: 'orders' },
      { source: 'books', target: 'orders' },
      { source: 'customers', target: 'books' },
      { source: 'orders', target: 'customers' },
    ],
  };


  const [data, setData] = useState(null);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [active, setActive] = useState(null);
  const canvas = useRef(null);


  useEffect(fetchData, []);
  useEffect(initVis, [ data ]);

  function fetchData() {
    Promise.resolve().then(() => setData(initialData.nodes));
  }


  function initVis() {
    if(data && data.length) {
      const d3Props = {
        data,
        width,
        height,
        onDatapointClick: setActive,
      };
      vis = new RouteTrace(canvas.current, d3Props);
    }
  }

  return (
    <div className="graphsGrid">
      <div ref={canvas}/>
      <SpeedChart service={service} />
      <TemperatureChart service={service} />
      <RequestTypesChart service={service} />
      <ResponseCodesChart service={service} />
      <ProcessesChart service={service} />
      <LatencyChart service={service} />
      <MicroServiceTraffic service={service} />
      <MemoryChart service={service} />
    </div>
  );
};

export default GraphsContainer;
