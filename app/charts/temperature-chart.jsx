import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const TemperatureChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const yAxis = [];
    const xAxis = [];
    for (let i = 0; i < healthData.length; i += 1) {
      let element = healthData[i];
      if ((element.currentMicroservice === props.service) && element.cpuTemperature) {
        yAxis.push(i);
        xAxis.push(element.cpuTemperature);
      }
      if ((element.currentmicroservice === props.service) && element.cputemperature) {
        yAxis.push(i);
        xAxis.push(element.cputemperature);
      }
    }

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
      labels: yAxis,
    };
    return <Line data={chartData} />;
  };

  return <div>{createChart()}</div>;
};

export default TemperatureChart;
