import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DashboardContext } from '../context/DashboardContext';
import { Button, Grid } from '@material-ui/core';
import Applications from './Applications';
import { Modal } from '@material-ui/core';
import AddApplication from './AddApplication';

const Home = () => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

  const [newAppModal, setNewAppModal] = useState(false);

  const toggleNewAppModal = () => {
    setNewAppModal(!newAppModal);
  };

  return !applications.length ? (
    <div className="blank">
      <img width="300" height="auto" src={'../assets/pangolin.png'} alt="Chronos logo" />
      <h1>Welcome to Chronos!</h1>
      {/* <p>Select your application to get started!</p> */}
      <Button variant="contained">Get Started, Bruh</Button>
    </div>
  ) : (
    <div style={ApplicationStyle}>
      <h1>These are your applications</h1>
      <button onClick={toggleNewAppModal}>Create</button>
      <Modal open={newAppModal} onClose={toggleNewAppModal}>
        <AddApplication />
      </Modal>
      {/* Grid Needs Aligning */}
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        spacing={10}
      >
        <Grid container item justify="center" xs={12}>
          <Applications />
        </Grid>
      </Grid>
    </div>
  );
};

const ApplicationStyle = {
  height: '100vh',
};

export default Home;
