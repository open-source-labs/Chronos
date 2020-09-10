import React, { useState } from 'react';
import { Grid, Modal, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

import AddModal from '../modals/AddModal';
import Applications from './Applications';

const Occupied: React.FC = () => {
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles(theme => ({
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
    // APPLICATION HEADER
    applicationHeader: {
      fontWeight: 700,
      fontFamily: 'Inter',
      color: '#ffffff',
      padding: theme.spacing(8, 0, 6),
      backgroundColor: '#4fa3f1',
      boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.5)',
    },
    subTitle: {
      fontFamily: 'Inter',
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.applicationHeader}
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Applications
        <Typography className={classes.subTitle}>Select A Microservice</Typography>
      </Typography>
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
    </>
  );
};

export default Occupied;
