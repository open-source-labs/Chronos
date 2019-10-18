import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const TemperatureTypesChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  console.log(healthData)
  const createChart = () => {
    const yAxis = [];
    const xAxis = [];
    console.log(props.service)
    // Iterate through HealthInfo to creat an object with data needed to create your graph.
    for (let i = 0; i < healthData.length; i += 1) {
        let element = healthData[i]
        console.log(element.currentmicroservice)
        console.log(element.cputemperature)
        if ((element.currentMicroservice === props.service) && element.cpuTemperature){
          yAxis.push(i)
          xAxis.push(element.cpuTemperature)
        }
        if ((element.currentmicroservice === props.service) && element.cputemperature) {
          yAxis.push(i)
          xAxis.push(element.cputemperature)
        }
    }

    // ! Chart Data 
    // * --- Change the object used in data to the one you created.
    // * --- Labels must be in the same order as the keys in your object. 
    const chartData = {
      datasets: [
        {
          label: 'Temperature Data',
          data: xAxis,
          backgroundColor: [
            'rgb(2, 210, 249)',
          ],
        },
      ],
      labels: yAxis
    };

    return <Line data={chartData} />;
  };

  // Return div with helper function invoked
  return <div>{createChart()}</div>;
};

export default TemperatureTypesChart;