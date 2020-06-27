import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';

/**
 * @desc Latency Chart
 * @param object props- passed from GraphsContainer
 * @return component - component for latency graph
 */

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
            dtick: 5,
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

  return <div className="latencyChart">{createChart()}</div>;
};

export default LatencyChart;
