import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const MemoryChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    let free = [];
    let used= [];
    let active = [];
    let total = [];

    for (let i = 0; i < healthData.length; i += 1) {
      // If Mongo
      if (healthData[i].currentMicroservice === props.service && healthData[i].freeMemory) {
        memoryObj.free += healthData[i].freeMemory;
        memoryObj.active += healthData[i].activeMemory;
        memoryObj.used += healthData[i].usedMemory;
        memoryObj.total += healthData[i].totalMemory;
      } else if (healthData[i].currentmicroservice === props.service && healthData[i].freememory) {
        memoryObj.free += healthData[i].freememory;
        memoryObj.active += healthData[i].activememory;
        memoryObj.used += healthData[i].usedmemory;
        memoryObj.total += healthData[i].totalmemory;
      }
    }

    

    const memoryObj = {
      freeMem: free,
      usedMem: used,
      activeMem: active,
      totalMem: total
    }

    const chartData = {
      datasets: [
        {
          label: "Free Memory",
          data: Object.values(memoryObj.freeMem),
          backgroundColor: [
            "rgb(2, 210, 249)"
          ]
        },
        {
          label: "Used Memory",
          data: Object.values(memoryObj.usedMem),
          backgroundColor: [
            "rgb(198, 42, 177)",
          ]
        },
        {
          label: "Active Memory",
          data: Object.values(memoryObj.activeMem),
          backgroundColor: [
            "rgb(252, 170, 52)"
          ]
        },
        {
          label: "Total Memory",
          data: Object.values(memoryObj.activeMem),
          backgroundColor: [
            "rgb(239, 91, 145)"
          ]
        },
      ],
      labels: ["Free Memory", "Active Memory", "Used Memory", "Total Memory"]
    };

    return <Line data={chartData} />;
  };

  // Return div with helper function invoked
  return <div>{createChart()}</div>;
};

export default MemoryChart;
