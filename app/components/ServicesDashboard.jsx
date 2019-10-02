import React, { useState, useContext, useEffect } from 'react';
import ServiceOverview from './ServiceOverview.jsx';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext';
import GettingStarted from './GettingStarted.jsx';

const ServicesDashboard = (props) => {
  const setup = useContext(SetupContext);
  const serviceList = useContext(DashboardContext);
  const [serviceSelected, setSelection] = useState();

  const renderServiceList = (context) => {
    const buttonStore = [];
    for (let i = 0; i < context.length; i += 1) {
      buttonStore.push(
        <button
          type="button"
          key={`${i}${context[i]}`}
          onClick={() => setSelection(<ServiceOverview index={i} />)}
        >
          {context[i]}
        </button>,
      );
    }
    return buttonStore;
  };
  const [listState, setList] = useState(renderServiceList(serviceList));

  if (serviceSelected) return serviceSelected;
  return (
    <div>
      <h3>Your Microservices</h3>
      <div>{listState}</div>
      <button
        type="submit"
        key="BackToStart"
        onClick={() => {
          setup.setupRequired = setup.toggleSetup(false);
          console.log(setup.setupRequired)
          setSelection(<GettingStarted />);
        }}
      >
        Add Service
      </button>
    </div>
  );
};

export default ServicesDashboard;
