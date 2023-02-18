/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import { Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import { AwsContext } from '../context/AwsContext';

import '../stylesheets/AWSGraphsContainer.scss';
import AwsCpuChart from '../charts/AwsCpuChart';

const AwsGraphsContainer: React.FC = React.memo(props => {
  const { awsData, fetchAwsData, setAwsData } = useContext(AwsContext);
  const { app } = useContext(ApplicationContext);

  const [awsLive, setAwsLive] = useState<boolean>(false);

  let awsIntervalId;

  useEffect(() => {
    if(awsLive) {
      console.log('we are live! fetching data every 10 seconds...')

      // awsIntervalId = setInterval(() => {
      //   fetchAwsData();
      // }, 2000);

      // clearInterval(awsIntervalId);
    } else {
      console.log('not fetching data')
      clearInterval(awsIntervalId)
      fetchAwsData();
    }

  }, [awsLive]);

  useEffect(() => {
    return () => clearInterval(awsIntervalId);
  }, [])
  
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
      {/* <p>
        AWS TEST
        DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </p>
      <p>Here is our data: {awsData ? awsData.CPUUtilization?.map(el => el.time) : 'Loading...'}</p>
      
      <p>Here is our data: {awsData}</p> */}
      <div className="AWSheader">
        <Typography variant="h3">{app}</Typography>
        <p>Metrics for AWS Service</p>
        <button onClick={() => setAwsLive(!awsLive)}>
          {awsLive ? (
            <div>
              <span id="live">Live</span>
            </div>
          ) : (
            <div id="gatherLiveData">Gather Live Data</div>
          )}
        </button>
      </div>
      <div className="charts">
        <AwsCpuChart 
          className='chart'
          // key={`Chart${counter}`}
          renderService='CPU Utilization'
          metric='Percent'
          timeList={awsData.CPUUtilization?.map(el => el.time)}
          valueList={awsData.CPUUtilization?.map(el => el.value)}
          // sizing={props.sizing}
          colourGenerator={stringToColor}
        />
        <AwsCpuChart 
          className='chart'
          // key={`Chart${counter}`}
          renderService='Network In'
          metric='Percent'
          timeList={awsData.NetworkIn?.map(el => el.time)}
          valueList={awsData.NetworkIn?.map(el => el.value)}
          // sizing={props.sizing}
          colourGenerator={stringToColor}
        />
        <AwsCpuChart 
          className='chart'
          // key={`Chart${counter}`}
          renderService='Network Out'
          metric='Percent'
          timeList={awsData.NetworkOut?.map(el => el.time)}
          valueList={awsData.NetworkOut?.map(el => el.value)}
          // sizing={props.sizing}
          colourGenerator={stringToColor}
        />
        <AwsCpuChart 
          className='chart'
          // key={`Chart${counter}`}
          renderService='DiskReadBytes'
          metric='Percent'
          timeList={awsData.DiskReadBytes?.map(el => el.time)}
          valueList={awsData.DiskReadBytes?.map(el => el.value)}
          // sizing={props.sizing}
          colourGenerator={stringToColor}
        />
      </div>
    </div>
  );
  // }
});

export default AwsGraphsContainer;
