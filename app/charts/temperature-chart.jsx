import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import HealthContext from '../context/DetailsContext';

const TemperatureChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const yAxis = [];
    const xAxis = [];

    for (let i = 0; i < healthData.length; i += 1) {
      const element = healthData[i];
      // If Mongo
      if ((element.currentMicroservice === props.service) && element.cpuTemperature) {
        yAxis.push(i);
        xAxis.push(element.cpuTemperature);
      }

      // If SQL
      if ((element.currentmicroservice === props.service) && element.cputemperature) {
        yAxis.push(i);
        xAxis.push(element.cputemperature);
      }
    }

    return (
      <Plot
        data = {[{
          type: 'scatter',
          fill: 'tozeroy',
          fillcolor: 'rgba(240, 138, 93, .5)',
          line: {shape: 'spline', smoothing: 1.3},
          mode: 'none',
          x: yAxis,
          y: xAxis,
          rangemode: 'nonnegative',
          name: 'CPU Temperature',
          showlegend: true
        }]}
        layout = {
          {
            width: 500,
            height: 500,
            paper_bgcolor: '#fffbe0',
            plot_bgcolor: '#fffbe0',
            legend: {
              orientation: 'h',
              xanchor: 'center',
              x: .5
            }
          }
        }
      />
    )
  };

  return <div>{createChart()}</div>;
};

export default TemperatureChart;
