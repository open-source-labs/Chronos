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
      color: theme.palette.text.secondary,
      height: 340,
      width: '100%',
      backgroundColor: '#24262f',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'rgba(33, 34, 41, 0.75)',
      },
    },
    grid: {
      margin: '0 auto',
      maxWidth: '75vw',
      maxHeight: '75vh',
    },
    icon: {
      width: '100px',
      height: '100px',
      color: ' white',
      boxShadow: 'none',
      '&:hover, &.Mui-focusVisible': { color: 'rgb(255, 243, 72)' },
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
        <Grid item xs={6}>
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
