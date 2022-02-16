import React, { useContext, useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import { all, solo as soloStyle } from './sizeSwitch';

interface GraphsContainerProps {
  sizing: string;
}

const ProcessesChart: React.FC<GraphsContainerProps> = React.memo(({ sizing }) => {
  const { healthData } = useContext(HealthContext);
  const createChart = () => {
    const runningProcesses: Array<number> = healthData.runningprocesses;
    const blockedProcesses: Array<number> = healthData.blockedprocesses;
    const sleepingProcesses: Array<number> = healthData.sleepingprocesses;

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
            y: runningProcesses,
            mode: 'markers',
            name: 'Running Processes',
            marker: {
              color: '#3788fc',
              size: 3,
            },
          },
          {
            type: 'scatter',
            y: blockedProcesses,
            mode: 'markers',
            name: 'Blocked Processes',
            marker: {
              color: '#fc4039',
              size: 3,
            },
          },
          {
            type: 'scatter',
            y: sleepingProcesses,
            mode: 'markers',
            name: 'Sleeping Processes',
            marker: {
              color: '#4b54ea',
              size: 3,
            },
          },
        ]}
        layout={{
          title: 'Process Overview',
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
            dtick: 10,
            title: 'Time Elapsed (min)',
          },
          yaxis: {
            title: 'Number of Processes',
          },
        }}
      />
    );
  };

  return <div className="chart">{createChart()}</div>;
});

export default ProcessesChart;
