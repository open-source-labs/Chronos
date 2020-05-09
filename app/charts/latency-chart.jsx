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
          type: 'scatter',
          x: xAxis,
          y: yAxis,
          mode: 'lines',
          rangemode: 'nonnegative',
          name: `${props.service} CPU Latency`,
          marker: {
              color: '#155263',
          }
        }]}
        layout = {{
          width: 500,
          height: 500,
          paper_bgcolor: '#fffbe0',
          plot_bgcolor: '#fffbe0',
          showlegend: true,
          legend: {
              orientation: 'h',
              xanchor: 'center',
              x: .5
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 2000
          }
        }}
      />
    )
  };

  return <div>{createChart()}</div>;
};

export default LatencyChart;
