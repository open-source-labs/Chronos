import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../context/ApplicationContext';
import { DashboardContext } from '../../context/DashboardContext';
import { Typography } from '@mui/material';
import { AwsContext } from '../../context/AwsContext';
import './styles.scss';
import { useLocation } from 'react-router-dom';
import AwsEC2Graphs from '../../components/AwsEC2Graphs';
import ClusterTable from '../../components/ClusterTable';
import AwsECSClusterGraphs from '../../components/AwsECSClusterGraphs';

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
  }, [
    awsLive,
    user,
    appIndex,
    typeOfService,
    fetchAwsAppInfo,
    fetchAwsData,
    fetchAwsEcsData,
    fetchAwsEksData,
    intervalID,
    setIntervalID,
  ]);

  return (
    <div className="AWS-container">

      <div className="AWS-header">
        <Typography 
          variant="h3"
        >
          {app}
        </Typography>
        <p>Metrics for AWS Service</p>
        <button 
          onClick={() => setAwsLive(!awsLive)}
        >
          {awsLive ? 'Stop Live Update' : 'Start Live Update'}
        </button>
      </div>

      {typeOfService === 'AWS/ECS' && (
        <div className="cluster-table">
          <ClusterTable 
            typeOfService={typeOfService} 
            region={awsAppInfo.region} 
          />
          <AwsECSClusterGraphs />
        </div>
      )}

      {typeOfService === 'AWS/EC2' && 
        <div className="cluster-table">
          <AwsEC2Graphs />
        </div>
      }

      {typeOfService === 'AWS/EKS' && 
        <iframe 
          src={`${awsAppInfo.awsUrl}?orgId=1&refresh=10s&theme=light&kiosk`} 
          width="1300" 
          height="1300"
        ></iframe>
        }
    </div>
  );
};

export default AwsGraphsContainer;
