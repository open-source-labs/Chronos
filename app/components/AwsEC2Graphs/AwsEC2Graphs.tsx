import React, { useContext, useEffect, useState } from 'react';
import AwsChart from '../../charts/AwsChart';
import { AwsContext } from '../../context/AwsContext';
import { stringToColor } from '../../utils';
import './styles.scss'

const AwsEC2Graphs: React.FC = React.memo(props => {
  const { awsData, setAwsData, isLoading, setLoadingState } = useContext(AwsContext);

  useEffect(() => {
    return () => {
      setAwsData({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] });
      setLoadingState(true);
    };
  }, []);

  return (
    <div className="charts">
      {Object.keys(awsData)?.map(metric => {
        return (
          <AwsChart
            className="chart"
            key={`Chart${metric}`}
            renderService={isLoading? 'Loading...' : metric}
            metric={isLoading ? '' : awsData[metric][0]?.unit}
            timeList={awsData[metric]?.map(el => el.time)}
            valueList={awsData[metric]?.map(el => el.value)}
            colourGenerator={stringToColor}
          />
        );
      })}
    </div>
  );
});

export default AwsEC2Graphs;
