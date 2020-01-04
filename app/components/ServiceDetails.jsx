import React, { useState } from 'react';
import Modal from './Modal.jsx';
import pieChart from '../assets/pieChart.png'
import memoryChart from '../assets/memoryChart.png'
import tempChart from '../assets/tempChart.png'
import speedChart from '../assets/speedChart.png'
import latencyChart from '../assets/latencyChart.png'
import processingChart from '../assets/processingChart.png'

// Renders charts created with health and communication data for a selected database.
const ServiceDetails = (props) => {
  
  // Renders health info detail buttons
    const { service } = props;
  // Hook used to toggle whether or not the Modal component renders
  const [modalDisplay, toggleModalDisplay] = useState(false);
  // Hook used to set the chart that the Modal displays.  The
  // modalDisplay state is drilled into the Modal component.
  const [modalChart, setModalChart] = useState();
  // Hook used to set the Modal Component title. The "alt" attribute
  // is grabbed from the onClick event via event.path[0].alt
  const [chartTitle, setChartTitle] = useState();
  const { currentMicroservice } = props;

  // Dictionary used by the healthInfoButtons loop below
  //    { id: 'request', alt: 'Request Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },

  const buttonProperties = [
    { id: 'request', alt: 'Request Data', src: pieChart },
    { id: 'response', alt: 'Response Data', src: pieChart },
   // { id: 'routes', alt: 'Route Trace', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'speed', alt: 'Speed Data', src: speedChart},
    { id: 'processes', alt: 'Processes Data', src: processingChart },
    { id: 'latency', alt: 'Latency Data', src: latencyChart },
    { id: 'temperature', alt: 'Temperature Data', src: tempChart },
    { id: 'memory', alt: 'Memory Data', src: memoryChart },
  ];

  // Create the Health Info buttons and their associated properties.  Each time a button is clicked,
  // setChartTitle will grab a title to render in the Modal component, setModalChart will grab the
  // correct chart to render, and toggleModalDisplay will actually render the Modal display
  const healthInfoButtons = [];
  for (let i = 0; i < buttonProperties.length; i += 1) {
    healthInfoButtons.push(
    <div>
      <div className="healthChartContainer">
        <input
          onClick={() => {
            setChartTitle(event.path[0].alt);
            setModalChart(event.path[0].id);
            toggleModalDisplay(!modalDisplay);
          }}
          service={service}
          type="image"
          id={buttonProperties[i].id}
          src={buttonProperties[i].src}
          width="60px"
          alt={buttonProperties[i].alt}
        />
        <br/>
        <div style={{color:'white', paddingLeft:'7px'}}>
        {buttonProperties[i].id}
        </div>
      </div>
      </div>,
    );
  }

  return (
    <div id="serviceDetailsContainer">
      {modalDisplay ? (
        <Modal
          chartTitle={chartTitle}
          service={service}
          modalChart={modalChart}
          toggleModalDisplay={toggleModalDisplay}
          onClick={() => {
            toggleModalDisplay(!modalDisplay);
          }}
        />
      ) : null}
      <button className="backButton" type="button" onClick={() => document.location.reload()}>Back</button>
      <h3 id="microserviceHealthTitle">Microservice Health</h3>
      <div id="healthGrid">
        {healthInfoButtons}
       </div>
    </div>
  );
};

export default ServiceDetails;
