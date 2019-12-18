import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import HealthContext from '../context/DetailsContext';

const SpeedChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const xAxis = [];
    const yAxis = [];

    for (let i = 0; i < healthData.length; i += 1) {
      const element = healthData[i];
      // If using a SQL Database
      if (element.currentmicroservice === props.service && element.cpucurrentspeed) {
        xAxis.push(i);
        yAxis.push(element.cpucurrentspeed);
      }
      
      // If using a Mongo Database
      if (element.currentMicroservice === props.service && element.cpuCurrentSpeed) {
        xAxis.push(i);
        yAxis.push(element.cpuCurrentSpeed);
      }
    }

    const chartData = {
      datasets: [
        {
          label: `CPU Speed of ${props.service}`,
          data: yAxis,
          backgroundColor: [
            'rgb(2, 210, 249)',
          ],
        },
      ],
      options: {
      },
      xAxisID: 'Speed',
      yAxisID: 'Communicaton',
      labels: xAxis,
    };

    return <Line data={chartData} />;
  };

  return <div>{createChart()}</div>;
};

export default SpeedChart;
