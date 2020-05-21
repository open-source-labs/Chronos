import React, { useContext } from 'react';
import HealthContext from '../context/DetailsContext';
import Plot from 'react-plotly.js';

const LatencyChart = (props) =>  {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const xAxis = [];
    const yAxis = [];

    for (let i = 0; i < healthData.length; i++) {
      const element = healthData[i];
      if (element.currentmicroservice === props.service || element.currentMicroservice === props.service) {
        xAxis.push(i);
        yAxis.push(element.latency);
      }
    }

    return (
      <Plot
        data = {[{
          name: 'CPU Latency',
          type: 'scatter',
          x: xAxis,
          y: yAxis,
          mode: 'lines',
          rangemode: 'nonnegative',
          // name: `${props.service} CPU Latency`,
          name: 'CPU Latency',
          marker: {
              color: '#daaa17',
          },
        }]}
        layout = {{
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15,
            family: 'Nunito, san serif'
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          showlegend: true,
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 200,
            rangemode: 'nonnegative'
          },
          yaxis: {rangemode: 'nonnegative'}
        }}
      />
    )
  };

  return <div className="latencyChart">{createChart()}</div>;
};

export default LatencyChart;
