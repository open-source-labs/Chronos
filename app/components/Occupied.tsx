import React, { useState } from 'react';
import { Grid, Modal, Button, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Copyright from '../components/Copyright';
import AddModal from '../modals/AddModal';
import Applications from './Applications';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListIcon from '@material-ui/icons/List';
import '../stylesheets/Occupied.scss';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

interface StyleProps {
  root: BaseCSSProperties,
};

const Occupied: React.FC = () => {
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    // card: "+" button only
    paper: {
      color: 'rgba(33, 34, 41, 0.75)',
      height: 340,
      width: '100%',
      backgroundColor: '#ffffff',
      // border: '3px ridge #808080',
      border: '0',
      boxShadow: '0 10px 10px rgba(0,0,0,0.5)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'rgb(61, 67, 78)',
        color: '#ffffff',
      },
    },
    grid: {
      margin: '0 auto',
      maxWidth: '65vw',
      maxHeight: '75vh',
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
    },
  }));

  const classes = useStyles({} as StyleProps);

  return (
    <div>
      <div className="sidebarArea">

      </div>
      <div className="dashboardArea">
        <header className="mainHeader">
          <section className="header" id="leftHeader">
            <span><ListIcon className="icon" id="listIcon" /></span>
            <span><p id="dashboard">Dashboard</p></span>
          </section>
          <section className="header" id="rightHeader">
            Search Magnifying Glass DashBoard Alerts Profile
          </section>
        </header>
        <Modal open={open} onClose={() => setOpen(false)}>
          <AddModal setOpen={setOpen} />
        </Modal>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item lg={4} md={6} sm={12}>
            <Button className={classes.paper} onClick={() => setOpen(true)}>
              <AddCircleOutlineTwoToneIcon className={classes.icon} />
            </Button>
          </Grid>
          <Applications />
        </Grid>
      </div>
    </div>
  );
};

export default Occupied;
