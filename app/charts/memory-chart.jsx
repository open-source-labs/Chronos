import React, { useContext } from 'react';
import { DetailsContext } from '../context/DetailsContext';
import Plot from 'react-plotly.js';

const MemoryChart = props => {
  const { detailsData } = useContext(DetailsContext);

  const createChart = () => {
    const xAxis = [];
    const free = [];
    const used = [];
    const active = [];
    const total = [];

    for (let i = 0; i < detailsData.length; i += 1) {
      xAxis.push(i);
      // If Mongo
      if (detailsData[i].currentMicroservice === props.service) {
        free.push(detailsData[i].freeMemory);
        active.push(detailsData[i].activeMemory);
        used.push(detailsData[i].usedMemory);
        total.push(detailsData[i].totalMemory);
      }

      // If SQL
      if (detailsData[i].currentmicroservice === props.service) {
        free.push(detailsData[i].freememory);
        active.push(detailsData[i].activememory);
        used.push(detailsData[i].usedmemory);
        total.push(detailsData[i].totalmemory);
      }
    }

    return (
      <Plot
        data={[
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: 'rgb(0, 237, 160)',
            mode: 'none',
            x: { autorange: true },
            y: free,
            name: 'Free Memory',
            rangemode: 'nonnegative',
          },
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: 'rgba(0, 237, 160, .4)',
            mode: 'none',
            x: { autorange: true },
            y: used,
            name: 'Used Memory',
            rangemode: 'nonnegative',
          },
          {
            type: 'scatter',
            fill: 'tonexty',
            fillcolor: 'rgba(74, 78, 238, .5)',
            mode: 'none',
            x: { autorange: true },
            y: active,
            name: 'Active Memory',
            rangemode: 'nonnegative',
          },
          { label: xAxis },
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
          legend: {
            itemsizing: 'constant',
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
          },
          xaxis: {
            tickmode: 'linear',
            tick0: 0,
            dtick: 100,
          },
        }}
      />
    );
  };

  return <div className="memoryChart">{createChart()}</div>;
};

export default MemoryChart;
