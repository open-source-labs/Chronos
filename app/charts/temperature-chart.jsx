import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import moment from 'moment';
import { HealthContext } from '../context/HealthContext';
/**
 * @desc Renders Readout of CPU Temperature
 * @param object props - passed from GraphsContainer
 * @return Plot Component - Component for CPU Graph
 */

const TemperatureChart = ({ service }) => {
  const { healthData } = useContext(HealthContext);

  const createChart = () => {
    // y should be temp
    const yAxis = [];
    // x should be # of services
    const xAxis = [];

    for (let i = 0; i < healthData.length; i += 1) {
      const {
        timestamp,
        currentMicroservice,
        currentmicroservice,
        cpuTemperature,
        cputemperature,
      } = healthData[i];
      const milliseconds = moment(timestamp).format('h:mm a');

      // If Mongo
      if (currentMicroservice === service && cpuTemperature) {
        xAxis.push(milliseconds);
        yAxis.push(cpuTemperature);
      }

      // If SQL
      if (currentmicroservice === service && cputemperature) {
        xAxis.push(milliseconds);
        yAxis.push(cputemperature);
      }
    }
    const secondsArr = xAxis.map(dates => dates);

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tozeroy',
            mode: 'none',
            fillcolor: 'rgb(250, 26, 88)',
            x: secondsArr,
            y: yAxis,
            name: 'CPU Temperature',
            showlegend: true,
          },
        ]}
        config={{ responsive: true }}
        layout={{
          title: 'CPU Temperature',
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15,
            family: 'Nunito, san serif',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
          xaxis: {
            // title: 'Time (100ms)',
            tickmode: 'linear',
            tick0: secondsArr[0],
            tickformat: '%d %B (%a)<br>%Y',
            nticks: 5,
            range: [1, 10],
            // dtick: 30 * 24 * 60 * 60 * 1000 // milliseconds
          },
          yaxis: {
            tickformat: '(\xB0C)',
            title: `Temperature (\xB0C)`,
            rangemode: 'nonnegative',
          },
        }}
      />
    );
  };

  return <div>{createChart()}</div>;
};

export default TemperatureChart;
