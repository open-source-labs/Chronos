import React from 'react';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import ProcessesChart from '../charts/processes-chart.jsx';
import TemperatureChart from '../charts/temperature-chart.jsx';
import LatencyChart from '../charts/latency-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';

const Modal = (props) => {
  const { modalChart } = props;
  const { service } = props;
  const { toggleModalDisplay } = props;
  const { chartTitle } = props;
  const dict = {
    request: <RequestTypesChart service={service} />,
    response: <ResponseCodesChart service={service} />,
    speed: <SpeedChart service={service} />,
    processes: <ProcessesChart service={service} />,
    latency: <LatencyChart service={service} />,
    temperature: <TemperatureChart service={service} />,
    memory: <MemoryChart service={service} />,
  };

  return (
    <div id="modalWindow" onClick={() => toggleModalDisplay(!toggleModalDisplay)}>
      <div id="modalContent" onClick={(event) => event.stopPropagation()}>
        <h3 id="chartTitle">{chartTitle}</h3>
        {dict[modalChart]}
      </div>
    </div>
  );
};

export default Modal;
