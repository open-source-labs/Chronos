import React, { useContext } from 'react';
import { DetailsContext } from '../context/DetailsContext';
// import Plot from 'react-plotly.js';

// A table that displays real-time Docker container stats.
// Just need to pull data from most recent (last) obj in healthData.
const DockerStatsChart = props => {
  const { detailsData } = useContext(DetailsContext);

  // console.log('healthData (in docker-stats-chart):', healthData);

  // Declare a dockerStats obj to store extracted Docker stats.
  let dockerStats = {};
  // This var will store the ind of the most recent data pt in healthData that matches currently selected microsvc.
  let index;

  // Scan from the end of the data collection in heathData. (End = most recent)
  // Use the loop to find the index of the data pt that matches current microsrvc (props.service).
  // We are only extracting this most recent data pt.
  for (let i = detailsData.length - 1; i >= 0; i -= 1) {
    // If user-chosen DB is NoSQL (Mongo):
    if (detailsData[i].currentMicroservice === props.service) {
      index = i;
      // db = 'mongo';
      break;
    }
    // If SQL:
    if (detailsData[i].currentmicroservice === props.service) {
      index = i;
      // db = 'sql';
      break;
    }
  }

  // Note: The difference btw MongoDB and pSQL is whether a stat title is camelCased (mongo = yes, psql = no).
  // Extract Docker-related MongoDB data (if exists) and save to dockerStats obj.
  if (detailsData[index].containerId) {
    dockerStats = {
      'Containerized service': detailsData[index].currentMicroservice,
      'Container ID': detailsData[index].containerId.slice(0, 7) + '[...]',
      'CPU usage %': parseFloat(detailsData[index].containerCpuPercent).toFixed(2) + '%',
      'Mem usage %': parseFloat(detailsData[index].containerMemPercent).toFixed(2) + '%',
      'Mem limit (Mb)': parseFloat(detailsData[index].containerMemLimit / 1000000).toFixed(2),
      'Mem usage (Mb)': parseFloat(detailsData[index].containerMemUsage / 1000000).toFixed(2),
      'Network I/O - Received (Kb)': parseFloat(detailsData[index].networkReceived / 1000).toFixed(
        2
      ),
      'Network I/O - Sent (Kb)': parseFloat(detailsData[index].networkSent / 1000).toFixed(2),
      'Process count': detailsData[index].containerProcessCount,
      'Restart count': detailsData[index].containerRestartCount,
    };
  }
  // Extract Docker-related SQL data (if exists) and save to dockerStats obj.
  if (detailsData[index].containerid) {
    dockerStats = {
      'Containerized service': detailsData[index].currentmicroservice,
      'Container ID': detailsData[index].containerid.slice(0, 7) + '[...]',
      'CPU usage %': parseFloat(detailsData[index].containercpupercent).toFixed(2) + '%',
      'Mem usage %': parseFloat(detailsData[index].containermempercent).toFixed(2) + '%',
      'Mem limit (Mb)': parseFloat(detailsData[index].containermemlimit / 1000000).toFixed(2),
      'Mem usage (Mb)': parseFloat(detailsData[index].containermemusage / 1000000).toFixed(2),
      'Network I/O - Received (Kb)': parseFloat(detailsData[index].networkreceived / 1000).toFixed(
        2
      ),
      'Network I/O - Sent (Kb)': parseFloat(detailsData[index].networksent / 1000).toFixed(2),
      'Process count': detailsData[index].containerprocesscount,
      'Restart count': detailsData[index].containerrestartcount,
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
      );
    }

    console.log('dockerStatsArr (docker stats chart):', dockerStatsArr);
    return (
      <div id="docker-stats-chart">
        <header id="docker-stats-chart-header">Docker Container Stats</header>
        {dockerStatsArr}
      </div>
    );
  } else {
    // If no Docker data:
    return (
      <div id="docker-stats-chart">
        <header id="docker-stats-chart-header">
          No valid container ID for current microservice. Please ensure the microservice is running
          in a Docker container.
        </header>
      </div>
    );
  }
};

export default DockerStatsChart;
