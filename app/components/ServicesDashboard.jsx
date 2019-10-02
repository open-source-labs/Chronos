import React, { useState, useContext, useEffect } from 'react';
import ServiceOverview from './ServiceOverview.jsx';
import SignUp from './SignUp.jsx';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext'

let clicked = false;
function toggleClick(){
  clicked = true;
  // return clicked;
}

// console.log(toggleClick())
const ServicesDashboard = () => {
  const renderServiceList = (context) => {
    const buttonStore = [];
    for (let i = 0; i < context.length; i += 1) {
      console.log(context[i], ' is context');
      buttonStore.push(
        <button className='microserviceBtn'
        type="button"
        key={`${i}${context[i]}`}
        onClick={() => setSelection(<ServiceOverview index={i} />)
        }
        // onClick={() => toggleClick()}
        >
          { context[i] }
        </button>,
      );
    }
    // console.log(clicked)
    return buttonStore;
  };

  console.log(clicked, 'clicked should be true here')
  const [listState, setList] = useState(renderServiceList(useContext(DashboardContext)));
  const [serviceSelected, setSelection,] = useState();


  // if (serviceSelected) return serviceSelected;
  return (
    <div className='servicesDashboardContainer'>
      <div className='left'>
        <div className='leftTopContainer'>
          <div className='left-top'>
            <h2>Your Microservices</h2>
            {listState}
            {/* <div className='servicesList'>{listState}</div> */}
          </div>
        </div>
        <div className='left-bottom'>
          <button className='submitBtn'
            type="button"
            onClick={() => setSelection(<SignUp />)}>
            Add Service
          </button>
          {/* <button>Add Microservice</button> */}
        </div>
      </div>
      <div>
        {serviceSelected}
      </div>
    </div>
  );
};

export default ServicesDashboard;
