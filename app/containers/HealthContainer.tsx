import React, { useEffect } from 'react';
import SpeedChart from '../charts/speed-chart';
import TemperatureChart from '../charts/temperature-chart';
import LatencyChart from '../charts/latency-chart';
import MemoryChart from '../charts/memory-chart';
import ProcessesChart from '../charts/processes-chart';

export interface HealthContainerProps {}

const HealthConainer: React.SFC<HealthContainerProps> = () => {
  return (
    <>
      <SpeedChart />
      <TemperatureChart />
      <LatencyChart />
      <MemoryChart />
      <ProcessesChart />
    </>
  );
};

export default HealthConainer;
