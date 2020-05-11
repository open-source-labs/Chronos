/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import CommunicationsContext from '../context/OverviewContext';
import '../stylesheets/routes.css';

const RouteLocations = (props) => {
  const communicationsData = useContext(CommunicationsContext).overviewData;

  // initialize an empty object resObj. This object will store the microservice names as values and its corresponding correlatingId or correlatingid as keys. The microservice names will be stored in array within the order it was to the database.
  const resObj = {};

  if (communicationsData.length > 0 && communicationsData[0]._id) {
    // Sort the communication array from latest to earliest document
    communicationsData.sort((a, b) => {
      if (new Date(a.timeSent) > new Date(b.timeSent)) return 1;
      if (new Date(a.timeSent) < new Date(b.timeSent)) return -1;
      return 0;
    });

    // Iterate over sorted communicationsData array from the end to the beginning
    for (let i = 0; i < communicationsData.length; i += 1) {
      // declare a constant element and initialize it as the object at index i of the communicationsData array
      const element = communicationsData[i];
      // Pushes the microservice name into the object
      if (resObj[element.correlatingId]) {
        resObj[element.correlatingId].push(element.currentMicroservice);
      } else resObj[element.correlatingId] = [element.currentMicroservice];
    }
  } else {
    for (let i = communicationsData.length - 1; i >= 0; i--) {
      const element = communicationsData[i];
      if (resObj[element.correlatingid]) resObj[element.correlatingid].push(element.currentmicroservice);
      else resObj[element.correlatingid] = [element.currentmicroservice];
      // initializing the object with the first microservice
    }
  }

  // use object values to destructure locations
  const tracePoints = Object.values(resObj);
  const position = communicationsData[0].correlatingid ? 0 : tracePoints.length - 1;

  const resArray = [];

  // iterate over Trace Points
  for (let i = 0; i < tracePoints[position].length; i += 1) {
    // push into resulting array current tracepoint as div
    resArray.push(
      <div className="RouteCircle" key={i}>
        <p id="routeText">Point {i + 1}: {tracePoints[position][i]}</p>
      </div>,
    );
  }

  console.log('resArray: ', resArray);


  // return div with Trace Points data
  return (
    <div>
      {resArray}
    </div>
  );
};

export default RouteLocations;
