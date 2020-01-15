import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const MemoryChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const xAxis = [];
    const free = [];
    const used = [];
    const active = [];
    const total = [];

    for (let i = 0; i < healthData.length; i += 1) {
      xAxis.push(i);
      // If Mongo
      if (healthData[i].currentMicroservice === props.service) {
        free.push(healthData[i].freeMemory);
        active.push(healthData[i].activeMemory);
        used.push(healthData[i].usedMemory);
        total.push(healthData[i].totalMemory);
      }

      // If SQL
      if (healthData[i].currentmicroservice === props.service) {
        free.push(healthData[i].freememory);
        active.push(healthData[i].activememory);
        used.push(healthData[i].usedmemory);
        total.push(healthData[i].totalmemory);
      }
    }

    const chartData = {
      datasets: [
        {
          label: 'Free Memory',
          backgroundColor: 'rgb(2, 210, 249)',
          data: free,
          // showLine: true,
        },
        {
          label: 'Used Memory',
          backgroundColor: 'rgb(239, 91, 145)',
          data: used,
          // showLine: true,
        },
        {
          label: 'Active Memory',
          backgroundColor: 'rgb(182, 219, 26)',
          data: active,
          // showLine: true,
        },
        {
          label: 'Total Memory',
          backgroundColor: 'rgb(252, 170, 52)',
          data: total,
          // showLine: true,
        },
      ],
      labels: xAxis,
    };

    return <Bar data={chartData} />;
  };

  return <div>{createChart()}</div>;
};

export default MemoryChart;
