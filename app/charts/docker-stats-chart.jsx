import React, { useContext } from 'react';
import HealthContext from '../context/DetailsContext';
// import Plot from 'react-plotly.js';

// A table that displays real-time Docker container stats.
  // Just need to pull data from most recent (last) obj in healthData.
const DockerStatsChart = (props) => {
  let length = useContext(HealthContext).detailData.length;
  // const healthData = useContext(HealthContext).detailData[length - 1]; // <== only used if only getting the last data pt.
  const healthData = useContext(HealthContext).detailData;

  // console.log('healthData (in docker-stats-chart):', healthData);

  // Declare a dockerStats obj to store extracted Docker stats.
  let dockerStats = {};

  // Scan from the end of the data collection in heathData. (End = most recent)
    // Break the loop as soon as we find a data pt that matches current srvc (props.service).
    // We are only extracting this most recent data pt. 
  for (let i = length - 1; i >= 0; i -= 1) {
    // The difference btw MongoDB and pSQL is whether a stat title is camelCased (mongo = yes, psql = no).
    // If user-chosen DB is MongoDB:
    if (healthData[i].currentMicroservice === props.service) {
      // Extract Docker-related data (MongoDB) and save to dockerStats obj.
      dockerStats = {
        'Containerized service': healthData[i].currentMicroservice,
        'Container ID': healthData[i].containerId.slice(0, 7) + '[...]',
        'CPU usage %': parseFloat(healthData[i].containerCpuPercent).toFixed(2) + '%',
        'Mem usage %': parseFloat(healthData[i].containerMemPercent).toFixed(2) + '%',
        'Mem limit (Mb)': parseFloat(healthData[i].containerMemLimit / 1000000).toFixed(2),
        'Mem usage (Mb)': parseFloat(healthData[i].containerMemUsage / 1000000).toFixed(2),
        'Network I/O - Received (Kb)': parseFloat(healthData[i].networkReceived / 1000).toFixed(2),
        'Network I/O - Sent (Kb)': parseFloat(healthData[i].networkSent / 1000).toFixed(2),
        'Process count': healthData[i].containerProcessCount,
        'Restart count': healthData[i].containerRestartCount,
      };
      break;
    }
    
    // If postgreSQL:
    if (healthData[i].currentmicroservice === props.service) {
      dockerStats = {
        'Containerized service': healthData[i].currentmicroservice,
        'Container ID': healthData[i].containerid.slice(0, 7) + '[...]',
        'CPU usage %': parseFloat(healthData[i].containercpupercent).toFixed(2) + '%',
        'Mem usage %': parseFloat(healthData[i].containermempercent).toFixed(2) + '%',
        'Mem limit (Mb)': parseFloat(healthData[i].containermemlimit / 1000000).toFixed(2),
        'Mem usage (Mb)': parseFloat(healthData[i].containermemusage / 1000000).toFixed(2),
        'Network I/O - Received (Kb)': parseFloat(healthData[i].networkreceived / 1000).toFixed(2),
        'Network I/O - Sent (Kb)': parseFloat(healthData[i].networksent / 1000).toFixed(2),
        'Process count': healthData[i].containerprocesscount,
        'Restart count': healthData[i].containerrestartcount,
      };
      break;
    }
  }


  // Build an array of <span>s that'll be rendered. Each <span> contains one stat.
  const dockerStatsArr = [];

  for (let stat in dockerStats) {
    dockerStatsArr.push(
      <span key={stat}>
        {stat}: {dockerStats[stat]}
      </span>
    )
  }
  
  return (
    <div id="docker-stats-chart">
      <header id="docker-stats-chart-header">Docker Container Stats</header>
      {dockerStatsArr}
    </div>
  )
}

export default DockerStatsChart;