import React, { useState, useEffect, useContext } from 'react';
import OverviewContext from '../context/OverviewContext';
import ServiceDetails from './ServiceDetails.jsx';

const { ipcRenderer } = window.require('electron');

const ServiceOverview = (props) => {
  const [overviewState, setOverviewState] = useState([]);
  const [detailsSelected, setDetails] = useState();
  const serviceComponents = useContext(OverviewContext);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest', props.index);

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      setOverviewState(Object.values(JSON.parse(data)));
      serviceComponents.overviewData = Object.values(JSON.parse(data));
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
              type="button"
              key={`serviceItem${props.index}${i}`}
              onClick={() => setDetails(<ServiceDetails index={props.index} />)}
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
                type="button"
                key={`serviceItem${props.index}${i}`}
                onClick={() => setDetails(<ServiceDetails index={props.index} />)}
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
        <h1>Microservices Overview</h1>
      </div>
      <div />
      <div className="servicesList">{renderState()}</div>
    </div>
  );
};

export default ServiceOverview;
