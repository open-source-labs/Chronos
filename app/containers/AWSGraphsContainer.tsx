/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from '../components/Styling';
import { useQuery } from 'react-query';
import { AwsContext } from '../context/AwsContext';

import '../stylesheets/AWSGraphsContainer.scss';

const AWSGraphsContainer: React.FC = React.memo(props => {
  const { awsData, fetchAwsData, setAwsData } = useContext(AwsContext);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if(live) {
      fetchAwsData();

      setInterval(() => {
        fetchAwsData();
      }, 100000);
    }
  }, []);

  return (
    <div className="AWS-container">
      <p>
        AWS TEST
        DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      </p>
      <p>Here is our data: {awsData}</p>
    </div>
  );
  // }
});

export default AWSGraphsContainer;
