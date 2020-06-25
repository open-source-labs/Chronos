import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';

/**
 * @desc Latency Chart
 * @param object props- passed from GraphsContainer
 * @return component - component for latency graph
 */

const LatencyChart = ({ service }) => {
  const { healthData } = useContext(HealthContext);

  const createChart = () => {
    // const xAxis = [];
    const yAxis = healthData.latency;

    // for (let i = 0; i < healthData.length; i += 2) {
    //   const element = healthData[i];
    //   if (element.currentmicroservice === service || element.currentMicroservice === service) {
    //     xAxis.push(i);
    //     yAxis.push(element.latency);
    //   }
    // }

    return (
      <Plot
        data={[
          {
            name: 'CPU Latency',
            type: 'scattergl',
            // x: xAxis,
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
            dtick: 5,
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
