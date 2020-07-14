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
  const { dockerData } = useContext(DockerContext);
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

  // Render the component if there is available data
  return containerid ? (
    <div className="chart docker-chart">
      <header id="docker-stats-chart-header">Docker Container Stats</header>
      <span>Container Name: {containername}</span>
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
  ) : null;
};

export default DockerStatsChart;
