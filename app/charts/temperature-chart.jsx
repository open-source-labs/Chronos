import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import moment from 'moment';
/**
 * @desc Renders Readout of CPU Temperature
 * @param object props - passed from GraphsContainer
 * @return Plot Component - Component for CPU Graph
 */

const TemperatureChart = props => {
  const { healthData } = useContext(HealthContext);

  const createChart = () => {
    // y should be temp
    const yAxis = [];
    // x should be # of services
    const xAxis = [];

    for (let i = 0; i < healthData.length; i += 1) {
      const element = healthData[i];
      const milliseconds = moment(element.timestamp).format('SS');

      // If Mongo
      if (element.currentMicroservice === props.service && element.cpuTemperature) {
        let seconds = (milliseconds /= 1000);
        xAxis.push(seconds);
        yAxis.push(element.cpuTemperature);
      }

      // If SQL
      if (element.currentmicroservice === props.service && element.cputemperature) {
        let seconds = (milliseconds /= 1000);
        xAxis.push(seconds);
        yAxis.push(element.cputemperature);
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
            x: ['0:00', '0:30', '01:00', '01:30', '02:00', '02:30'],
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
