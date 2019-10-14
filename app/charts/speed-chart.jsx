import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
// import HealthContext from '../context/DetailsContext';

const SpeedChart = (props) => {
  // const healthData = useContext(HealthContext);
  const { details, service } = props;
  // const health = props.details;
  console.log('SPEED HAS CONTEXT?!?! => ', props);
  // Helper function
  const createChart = () => {
    const speedData = [];

    // Iterate through HealthInfo to creat an object with data needed to create your graph.
    for (let i = 0; i < details.length; i += 1) {
      const element = details[i];
      console.log('EEEEEEELLLLLLEEEEEMMMMEEEENNNT => ', element)
      // if Mongo
      // if SQL
      if ((element.currentmicroservice === props.service || element.currentMicroservice === props.service) && element.cpucurrentspeed) {
        const graphDataPoint = {};
        graphDataPoint.x = i;
        if (element.cpucurrentspeed === null) graphDataPoint.y = 0;
        else graphDataPoint.y = element.cpucurrentspeed || 0;
      }
    }

    // ! Chart Data 
    // * --- Change the object used in data to the one you created.
    // * --- Labels must be in the same order as the keys in your object. 
    const chartData = {
      datasets: [
        {
          label: 'Breakdown of Requests by Type',
          data: Object.values(requestObj),
          backgroundColor: [
            'rgb(2, 210, 249)',
            'rgb(198, 42, 177)',
            'rgb(252, 170, 52)',
            'rgb(239, 91, 145)',
            'rgb(182, 219, 26)',
            'rgb(254, 255, 0)',
          ],
        },
      ],
      labels: ['DELETE', 'GET', 'PATCH', 'POST', 'PUSH', 'PUT'],
    };

    return <Line data={chartData} />;
  };

  // Return div with helper function invoked
  return <div>{createChart()}</div>;
};

export default SpeedChart;
