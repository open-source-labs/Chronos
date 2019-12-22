/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import Modal from './Modal.jsx';

// Renders health info detail buttons
const ServiceDetails = (props) => {
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
  const buttonProperties = [
    { id: 'request', alt: 'Request Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'response', alt: 'Response Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'speed', alt: 'Speed Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'processes', alt: 'Processes Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'latency', alt: 'Latency Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'temperature', alt: 'Temperature Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
    { id: 'memory', alt: 'Memory Data', src: 'https://st2.depositphotos.com/3894705/9581/i/950/depositphotos_95816620-stock-photo-round-button-shows-speedometer.jpg' },
  ];

  // Create the Health Info buttons and their associated properties.  Each time a button is clicked,
  // setChartTitle will grab a title to render in the Modal component, setModalChart will grab the
  // correct chart to render, and toggleModalDisplay will actually render the Modal display
  const healthInfoButtons = [];
  for (let i = 0; i < buttonProperties.length; i += 1) {
    healthInfoButtons.push(
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
          width="50px"
          alt={buttonProperties[i].alt}
        />
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
