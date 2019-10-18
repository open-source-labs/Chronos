import React, { useState, useEffect, useContext } from 'react';
import OverviewContext from '../context/OverviewContext';
import HealthInformationContext from '../context/DetailsContext';
import ServiceDetails from './ServiceDetails.jsx';

const { ipcRenderer } = window.require('electron');

const ServiceOverview = (props) => {
  const [overviewState, setOverviewState] = useState([]);
  const [detailsSelected, setDetails] = useState();
  const serviceComponents = useContext(OverviewContext);
  const healthdata = useContext(HealthInformationContext);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest', props.index);

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      setOverviewState(Object.values(JSON.parse(data)));
      serviceComponents.overviewData = JSON.parse(data);
    });
  }, []);

  const renderState = () => {
    const componentButtons = [];
    const serviceCache = {};
    for (let i = 0; i < overviewState.length; i += 1) {
      const element = overviewState[i];
      // SQL
      if (element.currentmicroservice) {
        if (!(element.currentmicroservice in serviceCache)) {
          const button = (
            <button
            className='servicesBtn'
              type="button"
              key={`serviceItem${props.index}${i}`}
              onClick={() => {
                ipcRenderer.send('detailsRequest', props.index);

                // IPC listener responsible for retrieving infomation from asynchronous main process message.
                ipcRenderer.on('detailsResponse', (event, data) => {
                  // setHealthData(Object.values(JSON.parse(data)));
                  healthdata.detailData = Object.values(JSON.parse(data));
                  setDetails(<ServiceDetails service={element.currentmicroservice} />);
                });
              }}
            >
              {element.currentmicroservice}
            </button>
          );
          componentButtons.push(button);
          serviceCache[element.currentmicroservice] = 1;
        } else {
          serviceCache[element.currentmicroservice] += 1;
        }
      } else if (element.currentMicroservice) {
        // Mongo
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
                    healthdata.detailData = Object.values(JSON.parse(data));
                    setDetails(<ServiceDetails service={element.currentMicroservice} />);
                  });
                }}
              >
                {element.currentMicroservice}
              </button>
            );
            componentButtons.push(button);
            serviceCache[element.currentMicroservice] = 1;
          } else {
            serviceCache[element.currentMicroservice] += 1;
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
      <div className="servicesList">{renderState()}</div>
    </div>
  );
};

export default ServiceOverview;
