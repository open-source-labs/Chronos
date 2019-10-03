import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const MemoryChart = () => {
  const healthData = useContext(HealthContext);
  // const health = healthData.detailData;

  const createChart = () => {
    const memoryObj = {
      free: 0,
      active: 0,
      used: 0,
      total: 0,
    };

    for (let i = 0; i < healthData.length; i += 1) {
      console.log(healthData);
      // If Mongo
      if (healthData[i].freeMemory) {
        memoryObj.free += healthData[i].freeMemory;
        memoryObj.active += healthData[i].activeMemory;
        memoryObj.used += healthData[i].usedMemory;
        memoryObj.total += healthData[i].totalMemory;
      } else if (healthData[i].freememory) {
        memoryObj.free += healthData[i].freememory;
        memoryObj.active += healthData[i].activememory;
        memoryObj.used += healthData[i].usedmemory;
        memoryObj.total += healthData[i].totalmemory;
      }
    }

    memoryObj.free /= 1000000000 * healthData.length;
    memoryObj.active /= 1000000000 * healthData.length;
    memoryObj.used /= 1000000000 * healthData.length;
    memoryObj.total /= 1000000000 * healthData.length;

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
