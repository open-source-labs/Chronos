import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { DetailsContext } from '../context/DetailsContext';

const LatencyChart = ({ service }) => {
  const { detailsData } = useContext(DetailsContext);

  const createChart = () => {
    const xAxis = [];
    const yAxis = [];

    for (let i = 0; i < detailsData.length; i++) {
      const element = detailsData[i];
      if (element.currentmicroservice === service || element.currentMicroservice === service) {
        xAxis.push(i);
        yAxis.push(element.latency);
      }
    }

    return (
      <Plot
        data={[
          {
            name: 'CPU Latency',
            type: 'scatter',
            x: xAxis,
            y: yAxis,
            mode: 'lines',
            rangemode: 'nonnegative',
            marker: { color: '#daaa17' },
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
            rangemode: 'nonnegative',
          },
          yaxis: { rangemode: 'nonnegative' },
        }}
      />
    );
  };

  return <div className="latencyChart">{createChart()}</div>;
};

export default LatencyChart;
