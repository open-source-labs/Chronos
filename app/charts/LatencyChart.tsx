import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import { all, solo } from './sizeSwitch';

interface GraphsContainerProps {
  sizing: string;
}

const LatencyChart: React.FC<GraphsContainerProps> = React.memo(({ sizing }) => {
  const { healthData } = useContext(HealthContext);

  const createChart = () => {
    const yAxis: Array<number> = healthData.latency;

    const sizeSwitch = sizing === 'all' ? all : solo;

    console.log(sizeSwitch);

    return (
      <Plot
        data={[
          {
            name: 'CPU Latency',
            type: 'scattergl',
            y: yAxis,
            mode: 'lines',
            marker: { color: '#fc4039' },
          },
        ]}
        layout={{
          title: 'Latency',
          ...sizeSwitch,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
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
});

export default LatencyChart;
