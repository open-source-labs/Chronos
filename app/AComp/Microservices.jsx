import React, { useContext, useState, useEffect } from 'react';
import OverviewContext from '../context/OverviewContext';
import HealthInformationContext from '../context/DetailsContext';
import ServiceDetails from '../components/ServiceDetails.jsx';


const { ipcRenderer } = window.require('electron');

const Microservices = (props) => {
  const { index, setDetails, setSelection } = props;
  // Overview state used to create service buttons
  const [overviewState, setOverviewState] = useState([]);
  // const [detailsSelected, setDetails] = useState();
  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const serviceComponents = useContext(OverviewContext);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest', index);
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // Adds to state and context.
      // console.log(JSON.parse(data));
      setOverviewState(Object.values(JSON.parse(data)));
      serviceComponents.overviewData = JSON.parse(data);
    });
  }, []);

  // Holds the buttons generated for unique services.
  const componentButtons = [];

  // Tracks which services already have button created.
  const serviceCache = {};
  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const healthdata = useContext(HealthInformationContext);

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
            key={`serviceItem${index}${i}`}
            onClick={() => {
              // IPC communication used to initiate query for information on microservice health information.
              ipcRenderer.send('detailsRequest', index);

              // IPC listener responsible for retrieving infomation from asynchronous main process message.
              ipcRenderer.on('detailsResponse', (event, data) => {
                // Adds returned data to context
                healthdata.detailData = Object.values(JSON.parse(data));
                // Updates state. Triggers rerender.
                setDetails(
                      <ServiceDetails service={element.currentmicroservice} />
                );
                
              });
              // setSelection(<Monitoring detailsSelected={detailsSelected} />);
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
              key={`serviceItem${index}${i}`}
              onClick={() => {
                ipcRenderer.send('detailsRequest', index);
                
                // IPC listener responsible for retrieving infomation from asynchronous main process message.
                ipcRenderer.on('detailsResponse', (event, data) => {
                  // Adds returned data to context.
                  healthdata.detailData = Object.values(JSON.parse(data));
                  // Updates state. Triggers rerender.
                  setDetails(
                    <ServiceDetails service={element.currentMicroservice} />
                    
                    );
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
    return <p>No data present</p>;
  }
  return componentButtons;
};

export default Microservices;
