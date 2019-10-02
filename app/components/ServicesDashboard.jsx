import React, { useState, useContext, useEffect } from 'react';
import ServiceOverview from './ServiceOverview.jsx';
import SignUp from './SignUp.jsx';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext'

const ServicesDashboard = () => {
  const renderServiceList = (context) => {
    const buttonStore = [];
    for (let i = 0; i < context.length; i += 1) {
      console.log(context[i]);
      buttonStore.push(
        <button
          type="button"
          key={`${i}${context[i]}`}
          onClick={() => setSelection(<ServiceOverview index={i} />)}
        >
          { context[i] }
        </button>,
      );
    }
    return buttonStore;
  };
  const [listState, setList] = useState(renderServiceList(useContext(DashboardContext)));
  const [serviceSelected, setSelection] = useState();

  if (serviceSelected) return serviceSelected;
  return (
    <div>
      <h3>Your Microservices</h3>
      <div>{listState}</div>
      <button
        type="button"
        onClick={() => setSelection(<SignUp />)}
      >
        Add Service
      </button>
    </div>
  );
};

export default ServicesDashboard;
