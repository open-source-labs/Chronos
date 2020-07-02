import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Typography, Button, Grid, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
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
      height: 256,
      width: '45%',
      marginRight: '1%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(3),
      background: 'rgb(33, 34, 41)',
      border: '2px solid black',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    icon: {
      width: '50%',
      height: '50%',
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
    <div>
      <Typography variant="h1" align="center">
        Applications!
      </Typography>
      <Modal open={newAppModal} onClose={toggleNewAppModal}>
        <AddApplication />
      </Modal>
      {/* Grid Needs Aligning */}
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      >
        <Grid container item xs={12} sm={6} spacing={4}>
          <Applications />
          <Button className={classes.paper} onClick={toggleNewAppModal}>
            <AddCircleOutlineTwoToneIcon className={classes.icon} color="primary" />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

// const ApplicationStyle = {
//   height: '100vh',
// };

export default Home;
