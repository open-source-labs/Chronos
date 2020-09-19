import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';

const LatencyChart = () => {
  const { healthData } = useContext(HealthContext);

  const createChart = () => {
    const yAxis: Array<number> = healthData.latency;

    return (
      <Plot
        data={[
          {
            name: 'CPU Latency',
            type: 'scattergl',
            y: yAxis,
            mode: 'lines',
            marker: { color: '#daaa17' },
          },
        ]}
        layout={{
          title: 'Latency',
          height: 300,
          width: 300,
          font: {
            color: 'black',
            size: 11.5,
            family: 'Open Sans',
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
            title: 'Time Elapsed (min)',
            tickmode: 'linear',
            tick0: 0,
            dtick: 10,
            rangemode: 'nonnegative',
            mirror: false,
            ticks: 'outside',
            showline: true,
          },
          yaxis: {
            rangemode: 'nonnegative',
            title: 'Milliseconds (ms)',
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
};

export default LatencyChart;
