import React, { useState, useContext } from 'react';
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
          className="microserviceBtn"
          type="button"
          key={`${i}${context[i]}`}
          onClick={() => {
            setSelection(<ServiceOverview index={i} />);
          }}
        >
          {context[i]}
        </button>,
      );
    }
    return buttonStore;
  };

  const [listState, setList] = useState(renderServiceList(serviceList));

  return (
    <div className="servicesDashboardContainer">
      <div className="left">
        <div className="leftTopContainer">
          <div className="left-top">
            <h2 className='dashboardHeader'>Your Databases</h2>
            {listState}
          </div>
        </div>
        <div className="left-bottom">
          <button
            className="overviewSubmitBtn"
            type="submit"
            key="BackToStart"
            onClick={() => {
              setup.setupRequired = setup.toggleSetup(false);
              setSelection(<GettingStarted />);
            }}
          >
            Add Database
          </button>
        </div>
      </div>
      <div className='databsaseList'>
        {serviceSelected}
      </div>
    </div>
  );
};

export default ServicesDashboard;
