/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { DashboardContext } from '../context/DashboardContext';
import { Typography } from '@material-ui/core';
import { AwsContext } from '../context/AwsContext';

import '../stylesheets/AWSGraphsContainer.scss';
import AwsChart from '../charts/AwsChart';
import ClusterTable from '../components/ClusterTable';
import AwsEC2Graphs from '../components/AwsEC2Graphs';
import AwsECSClusterGraphs from '../components/AwsECSClusterGraphs';
import { useLocation } from 'react-router-dom';

const AwsGraphsContainer: React.FC = React.memo(props => {
  const {
    awsData,
    setAwsData,
    awsAppInfo,
    setAwsAppInfo,
    awsEcsData,
    setAwsEcsData,
    fetchAwsData,
    fetchAwsEcsData,
    fetchAwsAppInfo,
  } = useContext(AwsContext);
  const { app, appIndex, intervalID, setIntervalID } = useContext(ApplicationContext);
  const { user } = useContext(DashboardContext);
  // const [intervalID, setintervalID] = useState<NodeJS.Timeout | null>(null);
  const [awsLive, setAwsLive] = useState<boolean>(false);
  const { region } = awsAppInfo;
  const { state } = useLocation();
  const { typeOfService } = state;

  useEffect(() => {
    if (awsLive) {
      setIntervalID(
        setInterval(() => {
          console.log('intervalId after click live', intervalID);
          fetchAwsAppInfo(user, appIndex);

          typeOfService === 'AWS/EC2'
            ? fetchAwsData(user, appIndex)
            : fetchAwsEcsData(user, appIndex);
        }, 10000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchAwsAppInfo(user, appIndex);

      typeOfService === 'AWS/EC2' ? fetchAwsData(user, appIndex) : fetchAwsEcsData(user, appIndex);
    }
  }, [awsLive]);

  useEffect(() => {
    return () => {
      if (intervalID) clearInterval(intervalID);
      setAwsData({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] });
      setAwsEcsData({});
      setAwsAppInfo({ typeOfService: '', region: '' });
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

      return colour;
    }
  };

  // const awsGraphArray = Object.keys(awsData)?.map(metric => {

  // })

  return (
    <div className="AWS-container">
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
      {typeOfService === 'AWS/ECS' ? (
        <div className="cluster-table">
          <ClusterTable typeOfService={typeOfService} region={region} />
          <AwsECSClusterGraphs />
        </div>
      ) : (
        <AwsEC2Graphs />
      )}
    </div>
  );
  // }
});

export default AwsGraphsContainer;
