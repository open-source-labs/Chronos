/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { DashboardContext } from '../context/DashboardContext';
import { Typography } from '@material-ui/core';
import { AwsContext } from '../context/AwsContext';
// import AwsEksGrafana from '../components/AwsEksGrafana';
import '../stylesheets/AWSGraphsContainer.scss';
import AwsChart from '../charts/AwsChart';
import ClusterTable from '../components/ClusterTable';
import AwsEC2Graphs from '../components/AwsEC2Graphs';
import AwsECSClusterGraphs from '../components/AwsECSClusterGraphs';
import { useLocation } from 'react-router-dom';
import GrafanaIFrame from './GrafanaIFrame';
interface Dashboard {
  uid: string;
  url: string;
}
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
    fetchAwsEksData,
    fetchAwsAppInfo,
  } = useContext(AwsContext);
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const { app, appIndex, intervalID, setIntervalID } = useContext(ApplicationContext);
  const { user } = useContext(DashboardContext);
  // const [intervalID, setintervalID] = useState<NodeJS.Timeout | null>(null);
  const [awsLive, setAwsLive] = useState<boolean>(false);
  const { region } = awsAppInfo;
  const { state } = useLocation();
  const { typeOfService } = state;
  const { awsUrl } = awsAppInfo;

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

      typeOfService === 'AWS/EC2'? fetchAwsData(user, appIndex) : fetchAwsEcsData(user, appIndex);
    }

  }, [awsLive]);

  useEffect(() => {
    return () => {
      if (intervalID) clearInterval(intervalID);
      setAwsData({ CPUUtilization: [], NetworkIn: [], NetworkOut: [], DiskReadBytes: [] });
      setAwsEcsData({});
      setAwsAppInfo({ typeOfService: '', region: '', awsUrl: '' });
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
      {typeOfService === 'AWS/ECS' && (
        <div className="cluster-table">
          <ClusterTable typeOfService={typeOfService} region={region} />
          {/* <iframe src="http://a43696611f78d41e89960d0f1bb06f07-578600705.us-west-2.elb.amazonaws.com/d/3H7r_bB4z/kubernetes-cluster-monitoring-via-prometheus?orgId=1&refresh=10s&theme=light" width="100" height="1300" ></iframe> */}
          <AwsECSClusterGraphs /> 
        </div>
      ) }
      {typeOfService === 'AWS/EC2' && (
        <div className="cluster-table">
          <AwsEC2Graphs />
        </div>
      )}
      {typeOfService === 'AWS/EKS' && (
        <div>
          {/* <iframe src={`${awsUrl}/d/8jYcvsBVz/kubernetes-cluster-monitoring-via-prometheus?orgId=1&refresh=10s&theme=light`} width="1300" height="1300" ></iframe>
          <iframe src={`${awsUrl}/d/jPEGwyfVk/opencost?orgId=1&theme=light`} width="1300" height="1300" ></iframe> */}
          <GrafanaIFrame {...awsAppInfo} />
        </div>
      )}
    </div>
  );
  // }
});
export default AwsGraphsContainer;
