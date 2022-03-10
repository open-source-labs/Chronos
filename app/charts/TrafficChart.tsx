import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { CommsContext } from '../context/CommsContext';

const TrafficChart = React.memo(() => {
  const { commsData } = useContext(CommsContext);
  const microserviceCount: { [key: string]: number } = {};

  for (let i = 0; i < commsData.length; i += 1) {
    const curr = commsData[i].microservice;
    if (!microserviceCount[curr]) microserviceCount[curr] = 0;
    microserviceCount[curr] += 1;
  }

  const xAxis = Object.keys(microserviceCount);

  const serverPings: number[] = Object.values(microserviceCount);

  const yAxisHeadRoom: number = Math.max(...serverPings) + 10;

  return (
    <div className="chart" data-testid="Traffic Chart">
      <Plot
        data={[
          {
            type: 'bar',
            x: [...xAxis],
            y: [...serverPings, 0, yAxisHeadRoom],
            fill: 'tozeroy',
            marker: { color: '#fc4039' },
            mode: 'none',
            name: 'Times Server Pinged',
            showlegend: false,
          },
        ]}
        layout={{
          title: 'Server Traffic',
          height: 300,
          width: 300,
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
            y: 5,
          },
          yaxis: {
            rangemode: 'nonnegative',
            title: 'Times Server Pinged',
            showline: true,
          },
        }}
      />
    </div>
  );
});

export default TrafficChart;
