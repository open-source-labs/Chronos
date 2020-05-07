/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import CommunicationsContext from '../context/OverviewContext';

const RouteLocations = (props) => {
  const communicationsData = useContext(CommunicationsContext).overviewData;
  console.log('commData (from overviewContxt):', communicationsData);
  
  // initialize an empty object resObj. This object will store the microservice names as values and its corresponding correlatingId or correlatingid as keys. The microservice names will be stored in array within the order it was to the database.
  const resObj = {};

  if (communicationsData.length > 0 && communicationsData[0]._id) {
    // Sort the communication array from latest to earliest document
    communicationsData.sort((a, b) => {
      // Note that a newer date obj IS GREATER THAN an older date obj.
      // The following lines sort the array from OLDEST to NEWEST.
      if (new Date(a.timeSent) > new Date(b.timeSent)) return 1;
      if (new Date(a.timeSent) < new Date(b.timeSent)) return -1;
      return 0;
    });

    // Iterate over sorted communicationsData array from the end to the beginning
    for (let i = 0; i < communicationsData.length; i += 1) {
      // declare a constant element and initialize it as the object at index i of the communicationsData array
      const element = communicationsData[i];
      // Pushes the microservice name & timeSent into the resObj.
      if (resObj[element.correlatingId]) {
        resObj[element.correlatingId].push({ 
          microservice_name: element.currentMicroservice,
          timeSent: element.timeSent
        });
      } else {
        // The value that corresp. to the correlationId key is an array of obj containing name and time data.
          // Each obj is a data point.
        resObj[element.correlatingId] = [{ 
          microservice_name: element.currentMicroservice,
          timeSent: element.timeSent
        }];
      }
    }
  } else {
    for (let i = communicationsData.length - 1; i >= 0; i--) {
      const element = communicationsData[i];
      if (resObj[element.correlatingId]) {
        resObj[element.correlatingId].push({ 
          microservice_name: element.currentMicroservice,
          timeSent: element.timeSent
        });
      } else {
        // The value that corresp. to the correlationId key is an array of obj containing name and time data.
          // Each obj is a data point.
        resObj[element.correlatingId] = [{ 
          microservice_name: element.currentMicroservice,
          timeSent: element.timeSent
        }];
      }
      // initializing the object with the first microservice
    }
  }

  // use object values to destructure locations
    // Each elem in tracePoints is an array of arrays, which contain objects (each of which is a data point).
  const tracePoints = Object.values(resObj);
  const position = communicationsData[0].correlatingid ? 0 : tracePoints.length - 1;
  console.log('tracePoints arr:', tracePoints);
  console.log('position for tracePoints:', position);

  const resArray = [];

  // iterate over Trace Points, creating a <div> for every data obj.
  for (let i = 0; i < tracePoints[position].length; i += 1) {
    if (i !== tracePoints[position].length - 1) {
      // Calc time difference (when not at the end of array):
        // Convert time str to Date obj w/ new Date(), then get the time difference.
      const timeDiff = new Date(tracePoints[position][i + 1].timeSent) - new Date(tracePoints[position][i].timeSent);
      resArray.push(
        <div className="RouteCircle" key={i}>
          {/* Altering this <p> so it displays only microsvc_name */}
          <p id="routeText">
            Point {i + 1}: {tracePoints[position][i].microservice_name}
          </p>
          {/* Adding another <p> that displays time difference btw curr obj and next obj */}
          <p id="routeTimeDiff">
            {/* Time: {tracePoints[position][i].timeSent} */}
            Time elapsed: {timeDiff} ms
          </p>
        </div>,
      );
    } else {
      // If at the end of array, don't push the timeDiff <p> to resArray (only push a <p> w/ name).
      resArray.push(
        <div className="RouteCircle" key={i}>
          <p id="routeText">
            Point {i + 1}: {tracePoints[position][i].microservice_name}
          </p>
        </div>,
      );
    }
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
