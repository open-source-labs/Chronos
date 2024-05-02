import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import { DashboardContext } from '../../context/DashboardContext';
import { Typography } from '@material-ui/core';
import { AwsContext } from '../../context/AwsContext';
import './styles.scss';
import { useLocation } from 'react-router-dom';
import EC2GraphsComponent from './EC2GraphsComponent';
import ECSGraphsComponent from './ECSGraphsComponent';
import EKSGraphsComponent from './EKSGraphsComponent';

const AwsGraphsContainer = () => {
  const { app, appIndex, setIntervalID, intervalID } = useContext(ApplicationContext);
  const { user } = useContext(DashboardContext);
  const { awsAppInfo, fetchAwsData, fetchAwsEcsData, fetchAwsEksData, fetchAwsAppInfo } = useContext(AwsContext);
  const { state } = useLocation();
  const { typeOfService } = state;
  const [awsLive, setAwsLive] = React.useState(false);

  useEffect(() => {
    if (awsLive) {
      const id = setInterval(() => {
        fetchAwsAppInfo(user, appIndex);
        if (typeOfService === 'AWS/EC2') {
          fetchAwsData(user, appIndex);
        }
        if (typeOfService === 'AWS/ECS') {
          fetchAwsEcsData(user, appIndex);
        }
        if (typeOfService === 'AWS/EKS') {
          fetchAwsEksData(user, appIndex);
        }
      }, 10000);
      setIntervalID(id);
    } else {
      if (intervalID) {
        clearInterval(intervalID);
      }
    }

    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [awsLive, user, appIndex, typeOfService, fetchAwsAppInfo, fetchAwsData, fetchAwsEcsData, fetchAwsEksData, intervalID, setIntervalID]);

  return (
    <div className="AWS-container">
      <div className="AWS-header">
        <Typography variant="h3">{app}</Typography>
        <p>Metrics for AWS Service</p>
        <button onClick={() => setAwsLive(!awsLive)}>
          {awsLive ? 'Stop Live Update' : 'Start Live Update'}
        </button>
      </div>
      {typeOfService === 'AWS/ECS' && <ECSGraphsComponent region={awsAppInfo.region} typeOfService={typeOfService} />}
      {typeOfService === 'AWS/EC2' && <EC2GraphsComponent />}
      {typeOfService === 'AWS/EKS' && <EKSGraphsComponent awsEksData={awsAppInfo.awsUrl} />}
    </div>
  );
};

export default AwsGraphsContainer;