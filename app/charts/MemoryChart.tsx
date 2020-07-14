import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';

const MemoryChart = () => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    const free: number[] = healthData.freememory;
    const used: number[] = healthData.usedmemory;
    const active: number[] = healthData.activememory;

    return (
      <Plot
        data={[
          {
            type: 'scattergl',
            fill: 'tonexty',
            fillcolor: 'rgb(0, 237, 160)',
            mode: 'none',
            y: free,
            name: 'Free Memory',
          },
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: 'rgba(0, 237, 160, .4)',
            mode: 'none',
            y: used,
            name: 'Used Memory',
          },
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: 'rgba(74, 78, 238, .5)',
            mode: 'none',
            y: active,
            name: 'Active Memory',
          },
        ]}
        layout={{
          title: 'Memory Traces',
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15,
            family: 'Nunito sans, sans serif',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 5,
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
};

export default MemoryChart;
