import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';

const ProcessesChart = props => {
  const { healthData } = useContext(HealthContext);
  console.log('this is the healthData in process chart   ', healthData.totalprocesses);
  const createChart = () => {
    const runningProcesses = healthData.runningprocesses;
    const blockedProcesses = healthData.blockedprocesses;
    const sleepingProcesses = healthData.sleepingprocesses;

    return (
      <Plot
        data={[
          {
            type: 'scattergl',
            x: { autorange: true },
            y: runningProcesses,
            mode: 'markers',
            rangemode: 'nonnegative',
            name: 'Running Processes',
            marker: {
              color: '#00d3f2',
              size: 3,
            },
          },
          {
            type: 'scatter',
            x: { autorange: true },
            y: blockedProcesses,
            mode: 'markers',
            rangemode: 'nonnegative',
            name: 'Blocked Processes',
            marker: {
              color: '#00eda0',
              size: 3,
            },
          },
          {
            type: 'scatter',
            x: { autorange: true },
            y: sleepingProcesses,
            mode: 'markers',
            rangemode: 'nonnegative',
            name: 'Sleeping Processes',
            marker: {
              color: '#4a4eee',
              size: 3,
            },
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
          legend: {
            itemsizing: 'constant',
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
          },
        }}
      />
    );
  };

  return <div className="processesChart">{createChart()}</div>;
};

export default ProcessesChart;
