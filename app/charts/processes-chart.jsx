import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import HealthContext from '../context/DetailsContext';

const ProcessesChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  const createChart = () => {
    const communicationLabel = [];
    const totalProcesses = [];
    const runningProcesses = [];
    const blockedProcesses = [];
    const sleepingProcesses = [];

    for (let i = 0; i < healthData.length; i += 1) {
      const element = healthData[i];
      // If using a SQL Database
      if (element.currentmicroservice === props.service) {
        communicationLabel.push(i);
        totalProcesses.push(element.totalnumprocesses);
        runningProcesses.push(element.numrunningprocesses);
        blockedProcesses.push(element.numblockedprocesses);
        sleepingProcesses.push(element.numsleepingprocesses);
      }
      // If using a Mongo Database
      if (element.currentMicroservice === props.service && element.cpuCurrentSpeed) {
        communicationLabel.push(i);
        totalProcesses.push(element.numTotalProcesses);
        runningProcesses.push(element.numRunningProcesses);
        blockedProcesses.push(element.numBlockedProcesses);
        sleepingProcesses.push(element.numSleepingProcesses);
      }
    }

    return (
      <Plot
        data = {[
          {
            type: 'scatter',
            x: {autorange: true},
            y: runningProcesses,
            mode: 'markers',
            rangemode: 'nonnegative',
            name: 'Running Processes',
            marker: {
              color: '#00d3f2',
              size: 3
            }},
          {
            type: 'scatter',
            x: {autorange: true},
            y: blockedProcesses,
            mode: 'markers',
            rangemode: 'nonnegative',
            name: 'Blocked Processes',
            marker: {
              color: '#00eda0',
              size: 3
            }},
          { 
            type: 'scatter',
            x: {autorange: true},
            y: sleepingProcesses,
            mode: 'markers',
            rangemode: 'nonnegative',
            name: 'Sleeping Processes',
            marker: {
              color: '#4a4eee',
              size: 3
          }},
          {label: communicationLabel},
        ]}
        layout = {{
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 15
          },
          paper_bgcolor: 'white',
          plot_bgcolor: 'white',
          legend: {
            itemsizing: 'constant',
            orientation: 'h',
            xanchor: 'center',
            x: .5
          },
        }}
      />
    )
  };
    
  return <div className="processesChart">{createChart()}</div>;
};

export default ProcessesChart;
