import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
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

    const chartData = {
      datasets: [{
        label: 'Blocked Processes',
        backgroundColor: 'rgb(198, 42, 177)',
        data: blockedProcesses,
      }, {
        label: 'Sleeping Processes',
        backgroundColor: 'rgb(252, 170, 52)',
        data: sleepingProcesses,
      }, {
        label: 'Running Processes',
        backgroundColor: 'rgb(239, 91, 145)',
        data: runningProcesses,
      }, {
        label: 'Total Processes',
        backgroundColor: 'rgb(182, 219, 26)',
        data: totalProcesses,
      }],
      labels: communicationLabel,
    };

    return <Bar data={chartData} />;
  };

  return <div>{createChart()}</div>;
};

export default ProcessesChart;
