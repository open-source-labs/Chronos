import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { DetailsContext } from '../context/DetailsContext';

const TemperatureChart = props => {
  const { detailsData } = useContext(DetailsContext);

  const createChart = () => {
    const yAxis = [];
    const xAxis = [];

    for (let i = 0; i < detailsData.length; i += 1) {
      const element = detailsData[i];
      // If Mongo
      if (element.currentMicroservice === props.service && element.cpuTemperature) {
        yAxis.push(i);
        xAxis.push(element.cpuTemperature);
      }

      // If SQL
      if (element.currentmicroservice === props.service && element.cputemperature) {
        yAxis.push(i);
        xAxis.push(element.cputemperature);
      }
    }

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgb(250, 26, 88)',
            mode: 'none',
            x: yAxis,
            y: xAxis,
            name: 'CPU Temperature',
            showlegend: true,
          },
        ]}
        layout={{
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
          },
          yaxis: { rangemode: 'nonnegative' },
        }}
      />
    );
  };

  return <div>{createChart()}</div>;
};

export default TemperatureChart;
