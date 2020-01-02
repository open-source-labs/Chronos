import React, { useState, useEffect, useContext } from 'react';
import OverviewContext from '../context/OverviewContext';
import HealthInformationContext from '../context/DetailsContext';
import ServiceDetails from './ServiceDetails.jsx';
import Modal from './Modal.jsx';
import routeChart from '../assets/routeChart.png'

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
      setOverviewState(Object.values(JSON.parse(data)));
      serviceComponents.overviewData = JSON.parse(data);
    });
  }, []);

  //Add routes to the display 
  // Hook used to toggle whether or not the Modal component renders
  const [modalDisplay, toggleModalDisplay] = useState(false);
  // Hook used to set the chart that the Modal displays.  The
  // modalDisplay state is drilled into the Modal component.
  const [modalChart, setModalChart] = useState();
  // Hook used to set the Modal Component title. The "alt" attribute
  // is grabbed from the onClick event via event.path[0].alt
  const [chartTitle, setChartTitle] = useState();

  const routeButtonProperty = { id: 'routes', alt: 'Route Trace', src: routeChart };
  const routes = [];
  routes.push(
    <div>
      <div className="healthChartContainer">
        <input
          onClick={() => {
            setChartTitle(event.path[0].alt);
            setModalChart(event.path[0].id);
            toggleModalDisplay(!modalDisplay);
          }}
          type="image"
          id={routeButtonProperty.id}
          src={routeButtonProperty.src}
          width="60px"
          alt={routeButtonProperty.alt}
        />
        <br/>
        <div style={{color:'white', paddingLeft:'7px'}}>
        {routeButtonProperty.id}
        </div>
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
            className='servicesBtn'
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
                  setDetails(<ServiceDetails service={element.currentmicroservice} />);
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
                className='servicesBtn'
                type="button"
                key={`serviceItem${props.index}${i}`}
                onClick={() => {
                  ipcRenderer.send('detailsRequest', props.index);

                  // IPC listener responsible for retrieving infomation from asynchronous main process message.
                  ipcRenderer.on('detailsResponse', (event, data) => {
                    // Adds returned data to context.
                    healthdata.detailData = Object.values(JSON.parse(data));
                    // Updates state. Triggers rerender.
                    setDetails(<ServiceDetails service={element.currentMicroservice} />);
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
    return componentButtons;
  };

  if (detailsSelected) return detailsSelected;

  return (
    <div className="mainContainer">
      <div>
        <h1 className='overviewTitle'>Microservices Overview</h1>
      </div>
      <div />
      <div className="servicesList">{serviceList()}</div>
      {/* adding the route tracer button */}
      <h3>Trace Last Route</h3>
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
      {routes}
    </div>
  );
};

export default ServiceOverview;
