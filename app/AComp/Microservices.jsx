import React, {useContext} from 'react';
import HealthInformationContext from '../context/DetailsContext';

const { ipcRenderer } = window.require('electron');

const Microservices = (props) => {
  const { overview, details, index } = props;
  // Holds the buttons generated for unique services.
  const componentButtons = [];

  // Tracks which services already have button created.
  const serviceCache = {};
  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const healthdata = useContext(HealthInformationContext);

  for (let i = 0; i < overview.length; i += 1) {
    const element = overview[i];
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
                details(
                  <ServiceDetails
                    service={element.currentmicroservice}
                    details={details}
                  />
                );
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
              key={`serviceItem${index}${i}`}
              onClick={() => {
                ipcRenderer.send('detailsRequest', props.index);

                // IPC listener responsible for retrieving infomation from asynchronous main process message.
                ipcRenderer.on('detailsResponse', (event, data) => {
                  // Adds returned data to context.
                  healthdata.detailData = Object.values(JSON.parse(data));
                  // Updates state. Triggers rerender.
                  details(
                    <ServiceDetails
                      service={element.currentMicroservice}
                      setDetails={details}
                    />
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
  console.log(componentButtons);
  return (
    <div>
    {componentButtons}
    </div>
    );
};

export default Microservices;
