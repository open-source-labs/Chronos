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
      const milliseconds = moment(timestamp).format('SS');

      // If Mongo
      if (currentMicroservice === service && cpuTemperature) {
        xAxis.push(i);
        yAxis.push(cpuTemperature);
      }

      // If SQL
      if (currentmicroservice === service && cputemperature) {
        xAxis.push(i);
        yAxis.push(cputemperature);
      }
    }

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tozeroy',
            mode: 'none',
            fillcolor: 'rgb(250, 26, 88)',
            x: xAxis,
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
            title: 'Time (100ms)',
          },
          yaxis: {
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
