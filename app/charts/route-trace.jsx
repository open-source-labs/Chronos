import React, { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import CommunicationsContext from '../context/OverviewContext';

const RouteLocations = (props) => {
  const communicationsData = useContext(CommunicationsContext).overviewData;

  console.log('THIS IS ROUTE TRACE: ', communicationsData);
    
  const resObj = {};
  for (let i = 0; i < communicationsData.length; i+=1) {
      const element = communicationsData[i];
      if (resObj[element.correlatingid]) resObj[element.correlatingid].push(element.currentmicroservice);
      else {resObj[element.correlatingid] = [element.currentmicroservice]};
  };

  //use object values to destructure locations
  const tracePoints = Object.values(resObj);
  console.log('THIS IS TRACEPOINTES: ', tracePoints[0]);

  const resArray = [];
  for (let i = 0; i < tracePoints[0].length; i+=1) {
    resArray.push(
        <div className="RouteCircle" key={i}>
        <p id="routeText">Point {i+1}: {tracePoints[0][i]}</p>
        </div>
    )
  };


//   console.log('ARRAY OF LOCATIONS: ', resObj);
  return (
      <div>
    {resArray}
      </div>
  )
};

export default RouteLocations;
