/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import Modal from './Modal.jsx';

// Renders charts created with health and communication data for a selected database.
const ServiceDetails = (props) => {
  // Renders health info detail buttons
  const { service, setDetails } = props;
  // Hook used to toggle whether or not the Modal component renders
  const [modalDisplay, toggleModalDisplay] = useState(false);
  // Hook used to set the chart that the Modal displays.  The
  // modalDisplay state is drilled into the Modal component.
  const [modalChart, setModalChart] = useState();
  // Hook used to set the Modal Component title. The "alt" attribute
  // is grabbed from the onClick event via event.path[0].alt
  const [chartTitle, setChartTitle] = useState();

  // Dictionary used by the healthInfoButtons loop below

  const buttonProperties = [
    { id: 'Request', alt: 'Request Data', src: 'app/assets/pieChart.png' },
    { id: 'Response', alt: 'Response Data', src: 'app/assets/pieChart.png' },
    { id: 'Speed', alt: 'Speed Data', src: 'app/assets/speedChart.png' },
    { id: 'Processes', alt: 'Processes Data', src: 'app/assets/processingChart.png' },
    { id: 'Latency', alt: 'Latency Data', src: 'app/assets/latencyChart.png' },
    { id: 'Temperature', alt: 'Temperature Data', src: 'app/assets/tempChart.png' },
    { id: 'Memory', alt: 'Memory Data', src: 'app/assets/memoryChart.png' },
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
          <br />
          <div>
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

      <h3 id="microserviceHealthTitle">Microservice Health - {service}</h3>
      <div id="healthGrid">
        {healthInfoButtons}
      </div>
      <button
        className="backButton"
        type="button"
        onClick={() => {
          // document.location.reload()
          setDetails(null);
        }}
      >
      Clear Health Data
      </button>
    </div>
  );
};

export default ServiceDetails;
