import React, { useContext, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import { all, solo as soloStyle } from './sizeSwitch';

interface GraphsContainerProps {
  sizing: string;
}

const MemoryChart: React.FC<GraphsContainerProps> = React.memo(({ sizing }) => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    const free: number[] = healthData.freememory;
    const used: number[] = healthData.usedmemory;
    const active: number[] = healthData.activememory;

    const [solo, setSolo] = useState(null);

    setInterval(() => {
      if (solo != soloStyle) {
        setSolo(soloStyle);
      }
    }, 20);

    const sizeSwitch = sizing === 'all' ? all : solo;

    return (
      <Plot
        data={[
          {
            type: 'scattergl',
            fill: 'tonexty',
            fillcolor: '#fc4039',
            mode: 'none',
            y: free,
            name: 'Free Memory',
          },
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: '#4b54ea',
            mode: 'none',
            y: used,
            name: 'Used Memory',
          },
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: '#3788fc',
            mode: 'none',
            y: active,
            name: 'Active Memory',
          },
        ]}
        layout={{
          title: 'Memory Traces',
          ...sizeSwitch,
          font: {
            color: '#444d56',
            size: 11.5,
            family: 'Roboto',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: -1.0,
            font: {
              size: 9,
            },
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 10,
            title: 'Time Elapsed (min)',
          },
          yaxis: {
            title: 'Bytes',
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
});

export default MemoryChart;
