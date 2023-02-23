import React, { useContext, useEffect, useState } from 'react';
import AwsChart from '../charts/AwsChart';
import { AwsContext } from '../context/AwsContext';
import { CircularProgress } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

const AwsEC2Graphs: React.FC = React.memo(props => {
  const { awsData, setAwsData, isLoading, setLoadingState } = useContext(AwsContext);

  useEffect(() => {
    return () => {
      setAwsData({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] });
      setLoadingState(true);
    };
  }, []);

  const stringToColor = (string: string, recurses = 0) => {
    if (recurses > 20) return string;
    function hashString(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.substring(-2);
      }

      console.log(colour);
      return colour;
    }
  };

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
