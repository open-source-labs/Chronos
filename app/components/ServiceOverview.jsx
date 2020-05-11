import React, { useState, useEffect, useContext } from 'react';
import routeChart from '../assets/routeChart.png';
import OverviewContext from '../context/OverviewContext';
import HealthInformationContext from '../context/DetailsContext';
import ServiceDetails from './ServiceDetails.jsx';
import Modal from './Modal.jsx';


const { ipcRenderer } = window.require('electron');

const ServiceOverview = (props) => {
  // Overview state used to create service buttons
  const [overviewState, setOverviewState] = useState([]);

  // Details state used to cause rerender on user selection.
  const [detailsSelected, setDetails] = useState();

  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const serviceComponents = useContext(OverviewContext);
  const healthdata = useContext(HealthInformationContext);

  // Only happens when the component mounts.
  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest', props.index);
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // Adds to state and context.
      // console.log(JSON.parse(data));
      setOverviewState(Object.values(JSON.parse(data)));
      serviceComponents.overviewData = JSON.parse(data);
    });
  }, []);

  // console.log('overviewstate: ', overviewState);
  // Add routes to the display
  // Hook used to toggle whether or not the Modal component renders
  const [modalDisplay, toggleModalDisplay] = useState(false);
  // Hook used to set the chart that the Modal displays.  The
  // modalDisplay state is drilled into the Modal component.
  const [modalChart, setModalChart] = useState();
  // Hook used to set the Modal Component title. The "alt" attribute
  // is grabbed from the onClick event via event.path[0].alt
  const [chartTitle, setChartTitle] = useState();

  // route button AND traffic button property
  const routeButtonProperty = {
    traffic: { id: 'Traffic', alt: 'Microservice Traffic', src: 'app/assets/chartModal.png' },
    routes: { id: 'routesImage', alt: 'Route Trace', src: routeChart },
  };

  // declare routes array to display routes when modal is toggled
  const routes = [];
  // declare traffic array to display traffic when modal is toggled
  const traffic = [];

  // push traffic component logic traffic
  traffic.push(

    <div className="healthChartContainer">
      <input
        onClick={() => {
          setChartTitle(event.path[0].alt);
          setModalChart(event.path[0].id);
          toggleModalDisplay(!modalDisplay);
        }}
        type="image"
        id={routeButtonProperty.traffic.id}
        src={routeButtonProperty.traffic.src}
        width="60px"
        alt={routeButtonProperty.traffic.alt}
      />
      <br />
      <div style={{ color: 'white', paddingLeft: '7px' }}>
        {routeButtonProperty.traffic.id}
      </div>
    </div>,

  );

  // push routes component logic traffic
  routes.push(

    <div className="healthChartContainer">
      <input
        onClick={() => {
          setChartTitle(event.path[0].alt);
          setModalChart(event.path[0].id);
          toggleModalDisplay(!modalDisplay);
        }}
        type="image"
        id={routeButtonProperty.routes.id}
        src="app/assets/routeChart.png"
        width="60px"
        alt={routeButtonProperty.routes.alt}
      />
      <br />
      <div style={{ color: 'white', paddingLeft: '7px' }}>
          Routes
      </div>
    </div>,

  );

  // Filters data received from IPC to the communications database to create a list of the services tracked in the provided database,
  const serviceList = () => {
    // Holds the buttons generated for unique services.
    const componentButtons = [];

    // Tracks which services already have button created.
    const serviceCache = {};

    for (let i = 0; i < overviewState.length; i += 1) {
      const element = overviewState[i];
      // If SQL
      if (element.currentmicroservice) {
        if (!(element.currentmicroservice in serviceCache)) {
          const button = (
            <button
              className="servicesBtn"
              currentMicroservice={element.currentmicroservice}
              type="button"
              key={`serviceItem${props.index}${i}`}
              onClick={() => {
                // IPC communication used to initiate query for information on microservice health information.
                ipcRenderer.send('detailsRequest', props.index);

                // IPC listener responsible for retrieving infomation from asynchronous main process message.
                ipcRenderer.on('detailsResponse', (event, data) => {
                  // Adds returned data to context
                  healthdata.detailData = Object.values(JSON.parse(data));
                  // Updates state. Triggers rerender.
                  setDetails(<ServiceDetails service={element.currentmicroservice} setDetails={setDetails} />);
                  console.log('details selected is: ', detailsSelected);
                });
              }}
            >
              {element.currentmicroservice}
            </button>
          );
          componentButtons.push(button);
          serviceCache[element.currentmicroservice] = true;
        }
      } else if (element.currentMicroservice) {
        // If Mongo
        if (element.currentMicroservice) {
          if (!(element.currentMicroservice in serviceCache)) {
            const button = (
              <button
                className="servicesBtn"
                type="button"
                key={`serviceItem${props.index}${i}`}
                onClick={() => {
                  ipcRenderer.send('detailsRequest', props.index);

                  // IPC listener responsible for retrieving infomation from asynchronous main process message.
                  ipcRenderer.on('detailsResponse', (event, data) => {
                    // Adds returned data to context.
                    healthdata.detailData = Object.values(JSON.parse(data));
                    // Updates state. Triggers rerender.
                    setDetails(<ServiceDetails service={element.currentMicroservice} setDetails={setDetails} />);
                  });
                }}
              >
                {element.currentMicroservice}
              </button>
            );
            componentButtons.push(button);
            serviceCache[element.currentMicroservice] = true;
          }
        }
      }
    }
    // If there's no data, return 'No data present', else return microservices button
    if (componentButtons.length === 0) {
      return (
        <p>No data present</p>
      );
    }
    return componentButtons;
  };

  const tooltipWriteup = `Communications data - Routes and Traffic - is not specific to a single microservice,
   but combines data from all microservices within a single application network.`;

  const tooltipWriteup2 = 'View and toggle between health data for individual services within your microservice network.';

  return (
    <div className="mainContainer">
      <h1 className="overviewTitle">Microservices Overview</h1>
      <h2>
        Communications Data
        <sup className="tooltip">
          &#9432;
          <div className="tooltiptext">{tooltipWriteup}</div>
        </sup>
      </h2>
      {modalDisplay ? (
        <Modal
          chartTitle={chartTitle}
          modalChart={modalChart}
          service=""
          toggleModalDisplay={toggleModalDisplay}
          onClick={() => {
            toggleModalDisplay(!modalDisplay);
          }}
        />
      ) : null}
      <div id="routeAndTrafficDisplay">
        {routes}
        {traffic}
      </div>
      <div className="servicesList">
        {serviceList()}
        <sup className="tooltip">
          &#9432;
          <div className="tooltiptext">{tooltipWriteup2}</div>
        </sup>
      </div>
      <br />
      {detailsSelected || null}
    </div>
  );
};

export default ServiceOverview;
