import React, { useState } from 'react';
import { Grid, Modal, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

import AddModal from '../modals/AddModal';
import Applications from './Applications';

const Occupied: React.FC = () => {
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles(theme => ({
    paper: {
      color: 'rgba(33, 34, 41, 0.75)',
      height: 340,
      width: '100%',
      backgroundColor: 'rgba(33, 34, 41, 0.2)',
      border: '3px ridge #808080',
      boxShadow: '0 10px 10px rgba(0,0,0,0.5)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'rgba(33, 34, 41, 1.2)',
        color: 'rgb(255, 243, 72)',
      },
    },
    grid: {
      margin: '0 auto',
      maxWidth: '65vw',
      maxHeight: '75vh',
    },
    icon: {
      width: '100px',
      height: '100px',
      boxShadow: 'none',
    },
    heroContent: {
      fontWeight: 700,
      color: '#333',
      padding: theme.spacing(8, 0, 6),
      backgroundColor: '#e8e8e8',
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.heroContent}
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Applications
        <Typography>Click a Card to Begin!</Typography>
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
