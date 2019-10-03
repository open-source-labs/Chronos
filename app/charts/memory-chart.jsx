import React, { useContext } from 'react';
// You can change the chart property imported to the one that suits your needs.
import { Bar } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const MemoryChart = () => {
  // ! Do not change the variables related to context.
  const healthData = useContext(HealthContext);
  const health = healthData.detailsData;

  // Helper function
  const createChart = () => {
    // Object for storing data
    const memoryObj = {
      free: 0,
      active: 0,
      used: 0,
      total: 0
    };

    // Iterate through HealthInfo to creat an object with data needed to create your graph.
    for (let i = 0; i < health.length; i += 1) {
      //Mongo
      if (health[i].freeMemory) {
        memoryObj.free += health[i].freeMemory
        memoryObj.active += health[i].activeMemory
        memoryObj.used += health[i].usedMemory
        memoryObj.total += health[i].totalMemory
      } else if (health[i].freememory) {
        memoryObj.free += health[i].freememory;
        memoryObj.active += health[i].activememory;
        memoryObj.used += health[i].usedmemory;
        memoryObj.total += health[i].totalmemory;
      }
    }
    memoryObj.free /= 1000000000
    memoryObj.active /= 1000000000
    memoryObj.used /= 1000000000
    memoryObj.total /= 100000000

    // ! Chart Data 
    // * --- Change the object used in data to the one you created.
    // * --- Labels must be in the same order as the keys in your object. 
    const chartData = {
      datasets: [
        {
          label: 'Breakdown of Memory in Gigabytes',
          data: Object.values(memoryObj),
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
      labels: ['Free Memory', 'Active Memory', 'Used Memory', 'Total Memory'],
    };

    return <Bar data={chartData} />;
  };

  // Return div with helper function invoked
  return <div>{createChart()}</div>;
};

export default MemoryChart;