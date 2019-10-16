import React, { useContext } from 'react';
// You can change the chart property imported to the one that suits your needs.
import { Doughnut } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const RequestTypesChart = () => {
  // ! Do not change the variables related to context.
  const healthData = useContext(HealthContext).detailsData;

  // Helper function
  const createChart = () => {
    // Object for storing data
    const /*<MY OBJECT>*/ = {
    };

    // Iterate through HealthInfo to creat an object with data needed to create your graph.
    for (let i = 0; i < healthData.length; i += 1) {
 
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

    return <Doughnut data={chartData} />;
  };

  // Return div with helper function invoked
  return <div>{createChart()}</div>;
};

export default RequestTypesChart;