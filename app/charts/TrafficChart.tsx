import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

const TrafficChart = React.memo(() => {
  const { commsData } = useContext(CommsContext);
  const microserviceCount: { [key: string]: number } = {};

  // Iterate over trace points
  for (let i = 0; i < commsData.length; i += 1) {
    const curr = commsData[i].microservice;
    // Add to counter
    if (!microserviceCount[curr]) microserviceCount[curr] = 0;
    microserviceCount[curr] += 1;
  }

  // Prepare x axis
  const xAxis = Object.keys(microserviceCount);

  // Prepare data points
  const serverPings: number[] = Object.values(microserviceCount);

  // Factor top margins
  const yAxisHeadRoom: number = Math.max(...serverPings) + 10;

  return (
    <div className="chart">
      <Plot
        data={[
          {
            type: 'bar',
            x: [...xAxis],
            y: [...serverPings, 0, yAxisHeadRoom],
            fill: 'tozeroy',
            marker: { color: '#5C80FF' },
            mode: 'none',
            name: 'Open Sans',
            showlegend: true,
          },
        ]}
        layout={{
          title: 'Server Traffic',
          height: 300,
          width: 300,
          font: {
            color: 'black',
            size: 11.5,
            family: 'Open Sans',
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
          yaxis: { rangemode: 'nonnegative' },
        }}
      />
    </div>
  );
});

export default TrafficChart;
