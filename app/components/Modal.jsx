import React from 'react';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import ProcessesChart from '../charts/processes-chart.jsx';
import TemperatureChart from '../charts/temperature-chart.jsx';
import LatencyChart from '../charts/latency-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';
import RouteTrace from '../charts/route-trace.jsx';

const Modal = (props) => {
  // Destructuring props to make linter happy
  const {
    modalChart, service, toggleModalDisplay, chartTitle,
  } = props;
  //  Dictionary used to render proper data chart within Modal component upon rendering
  const dict = {
    request: <RequestTypesChart service={service} />,
    routesImage: <RouteTrace service={service} />,
    response: <ResponseCodesChart service={service} />,
    speed: <SpeedChart service={service} />,
    processes: <ProcessesChart service={service} />,
    latency: <LatencyChart service={service} />,
    temperature: <TemperatureChart service={service} />,
    memory: <MemoryChart service={service} />,
  };

  // event.stopPropogation allows the user to interact with the chart as opposed to a click on the
  // chart bubbling out and closing the Modal.

  console.log('Modal Props: ', props);
  console.log('Modal props.modalChart: ', modalChart);
  return (
    <div id="modalWindow" onClick={() => toggleModalDisplay(!toggleModalDisplay)}>
      <div id="modalContent" onClick={(event) => event.stopPropagation()}>
        <h3 id="chartTitle">{`${service} - ${chartTitle}`}</h3>
        <button id="modalCloseButton" onClick={() => toggleModalDisplay(!toggleModalDisplay)}>&times;</button>
        {dict[modalChart]}
      </div>
    </div>
  );
};

export default Modal;
