import React, { useState, useEffect, useContext } from 'react';
import OverviewContext from '../context/OverviewContext';
import HealthInformationContext from '../context/DetailsContext';
import ServiceDetails from './ServiceDetails.jsx';

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
      console.log('THIS IS ARRAY IN OVERVIEWRESPONSE: ', Object.values(JSON.parse(data)));
      setOverviewState(Object.values(JSON.parse(data)));
      // dialog.showMessageBox({shit:'Broke'});
      serviceComponents.overviewData = JSON.parse(data);
    });
  }, []);

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
    </div>
  );
};

export default ServiceOverview;
