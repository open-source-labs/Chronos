/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from '../components/Styling';
import { useQuery } from 'react-query';
import { AwsContext } from '../context/AwsContext';

const AwsGraphsContainer: React.FC = React.memo(props => {
  const { awsData, fetchAwsData, setAwsData } = useContext(AwsContext);

  useEffect(() => {
    fetchAwsData();
  })
  
  // const { data, status, isLoading } = useQuery('awsData', fetchAwsData);

  //   if(status === 'loading') {
  //     return <p>Loading...</p>
  //   }

  //   if(status === 'error') {
  //     return <p>Error!</p>
  //   }

  //   else {
      return (
        <div className='test-container'>
          <p>AWS TEST DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
          <p>Here is our data: {awsData}</p>
        </div>
      )
    // }
});

export default AwsGraphsContainer;