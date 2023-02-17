/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import { Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import { AwsContext } from '../context/AwsContext';

import '../stylesheets/AWSGraphsContainer.scss';

const AwsGraphsContainer: React.FC = React.memo(props => {
  const { awsData, fetchAwsData, setAwsData } = useContext(AwsContext);
  const { app } = useContext(ApplicationContext);

  const [awsLive, setAwsLive] = useState<boolean>(false);

  useEffect(() => {
    fetchAwsData();
  });

  return (
    <div className="AWS-container">
      {/* <p>
        AWS TEST
        DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </p>
      <p>Here is our data: {awsData}</p> */}
      <div className="AWSheader">
        <Typography variant="h3">{app}</Typography>
        <p>Here you will see the health data of you AWS cluster</p>
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
        <div className="CPU chart">chart</div>
        <div className="memory chart">chart</div>
        <div className="networkIn chart">chart</div>
        <div className="networkOut chart">chart</div>
      </div>
    </div>
  );
  // }
});

export default AwsGraphsContainer;
