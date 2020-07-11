import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';

import Empty from './Empty';
import Occupied from './Occupied';
import '../stylesheets/Home.css';

const Home = () => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div>
      <h1>
        Welcome to Chronos!
      </h1>
    </div>
  )
  // return <div className="home">{!applications.length ? <Occupied /> : <Empty />}</div>;
};

export default Home;
