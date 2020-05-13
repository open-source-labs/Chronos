import React, { useContext } from 'react';
import HealthContext from '../context/DetailsContext';
import Plot from 'react-plotly.js';

const MemoryChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const xAxis = [];
    const free = [];
    const used = [];
    const active = [];
    const total = [];

    for (let i = 0; i < healthData.length; i += 1) {
      xAxis.push(i);
      // If Mongo
      if (healthData[i].currentMicroservice === props.service) {
        free.push(healthData[i].freeMemory);
        active.push(healthData[i].activeMemory);
        used.push(healthData[i].usedMemory);
        total.push(healthData[i].totalMemory);
      }

      // If SQL
      if (healthData[i].currentmicroservice === props.service) {
        free.push(healthData[i].freememory);
        active.push(healthData[i].activememory);
        used.push(healthData[i].usedmemory);
        total.push(healthData[i].totalmemory);
      }
    }

    return (
      <Plot
        data = {[
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgb(193, 225, 220)',
            mode: 'none',
            x: {autorange: true},
            y: free,
            name: 'Free Memory',
            rangemode: 'nonnegative'
          },
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(255, 235, 148, .3)',
            mode: 'none',
            x: {autorange: true},
            y: used,
            name: 'Used Memory',
            rangemode: 'nonnegative'
          },
          {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(253, 212, 117, .4)',
            mode: 'none',
            x: {autorange: true},
            y: active,
            name: 'Active Memory',
            rangemode: 'nonnegative'
          },
          {label: xAxis},
        ]}
        layout = {{
          height: 400,
          width: 400,
          font: {
            color: 'azure',
            size: 15
          },
          paper_bgcolor: '#8BA6B9',
          plot_bgcolor: '#8BA6B9',
          legend: {
            itemsizing: 'constant',
            orientation: 'h',
            xanchor: 'center',
            x: .5
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 100,
          },
        }}
      />
    )
  };

  return <div className="memoryChart">{createChart()}</div>;
};

export default MemoryChart;
