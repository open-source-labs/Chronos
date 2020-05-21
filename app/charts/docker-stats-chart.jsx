import React, { useContext, useState, useEffect } from 'react';
import HealthContext from '../context/DetailsContext';
// import Plot from 'react-plotly.js';

// A table that displays real-time Docker container stats.
  // Just need to pull data from most recent (last) obj in healthData.
const DockerStatsChart = (props) => {
  const healthData = useContext(HealthContext).detailData;

  // console.log('healthData (in docker-stats-chart):', healthData);

  // Declare a dockerStats obj to store extracted Docker stats.
  let dockerStats = {};
  // This var will store the ind of the most recent data pt in healthData that matches currently selected microsvc.
  let index; 
  
  // Scan from the end of the data collection in heathData. (End = most recent)
    // Use the loop to find the index of the data pt that matches current microsrvc (props.service).
    // We are only extracting this most recent data pt. 
  for (let i = healthData.length - 1; i >= 0; i -= 1) {
    // If user-chosen DB is NoSQL (Mongo):
    if (healthData[i].currentMicroservice === props.service) {
      index = i;
      // db = 'mongo';
      break;
    }
    // If SQL:
    if (healthData[i].currentmicroservice === props.service) {
      index = i;
      // db = 'sql';
      break;
    }
  }

  // Note: The difference btw MongoDB and pSQL is whether a stat title is camelCased (mongo = yes, psql = no).
  // Extract Docker-related MongoDB data (if exists) and save to dockerStats obj.
  if (healthData[index].containerId) {
    dockerStats = {
      'Containerized service': healthData[index].currentMicroservice,
      'Container ID': healthData[index].containerId.slice(0, 7) + '[...]',
      'CPU usage %': parseFloat(healthData[index].containerCpuPercent).toFixed(2) + '%',
      'Mem usage %': parseFloat(healthData[index].containerMemPercent).toFixed(2) + '%',
      'Mem limit (Mb)': parseFloat(healthData[index].containerMemLimit / 1000000).toFixed(2),
      'Mem usage (Mb)': parseFloat(healthData[index].containerMemUsage / 1000000).toFixed(2),
      'Network I/O - Received (Kb)': parseFloat(healthData[index].networkReceived / 1000).toFixed(2),
      'Network I/O - Sent (Kb)': parseFloat(healthData[index].networkSent / 1000).toFixed(2),
      'Process count': healthData[index].containerProcessCount,
      'Restart count': healthData[index].containerRestartCount,
    };
  }
  // Extract Docker-related SQL data (if exists) and save to dockerStats obj.
  if (healthData[index].containerid) {
    dockerStats = {
      'Containerized service': healthData[index].currentmicroservice,
      'Container ID': healthData[index].containerid.slice(0, 7) + '[...]',
      'CPU usage %': parseFloat(healthData[index].containercpupercent).toFixed(2) + '%',
      'Mem usage %': parseFloat(healthData[index].containermempercent).toFixed(2) + '%',
      'Mem limit (Mb)': parseFloat(healthData[index].containermemlimit / 1000000).toFixed(2),
      'Mem usage (Mb)': parseFloat(healthData[index].containermemusage / 1000000).toFixed(2),
      'Network I/O - Received (Kb)': parseFloat(healthData[index].networkreceived / 1000).toFixed(2),
      'Network I/O - Sent (Kb)': parseFloat(healthData[index].networksent / 1000).toFixed(2),
      'Process count': healthData[index].containerprocesscount,
      'Restart count': healthData[index].containerrestartcount,
    };
  }

  // Conditional rendering, depending on if dockerStats obj contains anything.
  if (Object.keys(dockerStats).length > 0) {
    // Build an array of <span>s that'll be rendered. Each <span> contains one stat.
    const dockerStatsArr = [];
  
    for (let stat in dockerStats) {
      dockerStatsArr.push(
        <span key={stat}>
          {stat}: {dockerStats[stat]}
        </span>
      )
    }
    
    console.log('dockerStatsArr (docker stats chart):', dockerStatsArr);
    return (
      <div id="docker-stats-chart">
        <header id="docker-stats-chart-header">Docker Container Stats</header>
        {dockerStatsArr}
      </div>
    )
  } else { // If no Docker data:
    return (
      <div id="docker-stats-chart">
        <header id="docker-stats-chart-header">
          No valid container ID for current microservice.
          Please ensure the microservice is running in a Docker container.
        </header>
      </div>
    )
  }
}

export default DockerStatsChart;