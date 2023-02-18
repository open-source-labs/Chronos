/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from '../components/Styling';
import { useQuery } from 'react-query';
import { AwsContext } from '../context/AwsContext';

import '../stylesheets/AWSGraphsContainer.scss';
import AwsCpuChart from '../charts/AwsCpuChart';

const AWSGraphsContainer: React.FC = React.memo(props => {
  const { awsData, fetchAwsData, data, isLoading, isFetching } = useContext(AwsContext);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if(live) {
      fetchAwsData();
    }
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
  }

  return (
    <div className="AWS-container">
      <p>
        AWS TEST
        DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </p>
      <p>Here is our data: {awsData ? awsData.CPUUtilization?.map(el => el.time) : 'Loading...'}</p>
      <AwsCpuChart 
        // key={`Chart${counter}`}
        renderService='CPUUtilization'
        metric='Percent'
        timeList={awsData.CPUUtilization?.map(el => el.time)}
        valueList={awsData.CPUUtilization?.map(el => el.value)}
        // sizing={props.sizing}
        colourGenerator={stringToColor}
      />
    </div>
  );
  // }
});

export default AWSGraphsContainer;
