import React, { useContext } from 'react';
import { DockerContext } from '../context/DockerContext';

interface IContainer {
  containername: string;
  containerid: string;
  platform: string;
  starttime: string;
  memoryusage: number;
  memorylimit: number;
  memorypercent: number;
  cpupercent: number;
  networkreceived: number;
  networksent: number;
  processcount: number;
  restartcount: number;
}

/**
 * Table that displays real-time Docker container information using the
 * latest data point available ???
 */
const DockerStatsChart = () => {
  console.log('in docker chart');
  const { dockerData } = useContext(DockerContext);
  console.log('dockerdata ----->', dockerData);
  const {
    containername,
    containerid,
    platform,
    starttime,
    memoryusage,
    memorylimit,
    memorypercent,
    cpupercent,
    networkreceived,
    networksent,
    processcount,
    restartcount,
  }: IContainer = dockerData;

  return containerid ? (
    // Docker data
    <div id="docker-stats-chart">
      <header id="docker-stats-chart-header">Docker Container Stats</header>
      <span>Container Name: {containername}</span>
      <span>Container ID: {containerid}</span>
      <span>Platform: {platform}</span>
      <span>Start time: {starttime}</span>
      <span>Memory Usage: {(memoryusage / 1000000).toFixed(2)}</span>
      <span>Memory Limit: {(memorylimit / 1000000).toFixed(2)}</span>
      <span>Memory Percent: {memorypercent.toFixed(2)}%</span>
      <span>CPU percent: {cpupercent.toFixed(2)}%</span>
      <span>Network I/O - Received (Kb): {networkreceived / 1000}</span>
      <span>Network I/O - Sent (Kb): {networksent / 1000}</span>
      <span>Process Count: {processcount}</span>
      <span>Restart Count: {restartcount}</span>
    </div>
  ) : (
    // No Docker data:
    <div id="docker-stats-chart">
      <header id="docker-stats-chart-header">
        No valid container ID for current microservice. Please ensure the microservice is running in
        a Docker container.
      </header>
    </div>
  );
};

export default DockerStatsChart;
