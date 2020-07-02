import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Paper, Button, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Applications from './Applications';
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

  const useStyles = makeStyles(theme => ({
    paper: {
      height: 128,
      width: '33%',
      padding: theme.spacing(4),
      textAlign: 'center',
      color: 'white',
      fontSize: '2rem',
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      background: 'rgb(33, 34, 41)',
    },
  }));

  const classes = useStyles();

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
          <Button className={classes.paper} onClick={toggleNewAppModal}>
            <AddCircleOutlinedIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const ApplicationStyle = {
  height: '100vh',
};

export default Home;
