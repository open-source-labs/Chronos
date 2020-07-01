import React, { useContext, useEffect } from 'react';
import '../stylesheets/Home.css';
import { DashboardContext } from '../context/DashboardContext';
import { Button, Grid } from '@material-ui/core';
import Applications from './Applications';

const Home = () => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

  return !applications.length ? (
    <div className="blank">
      <img width="300" height="auto" src={'../assets/pangolin.png'} alt="Chronos logo" />
      <h1>Welcome to Chronos!</h1>
      {/* <p>Select your application to get started!</p> */}
      <Button variant="contained">Get Started, Bruh</Button>
    </div>
  ) : (
    <Grid container direction="row" justify="center" alignItems="baseline" spacing={6}>
      <Applications />
    </Grid>
  );
};

export default Home;
