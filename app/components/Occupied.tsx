import React, { useState } from 'react';
import { Grid, Modal, Button, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

import AddModal from '../modals/AddModal';
import Applications from './Applications';
// import '../stylesheets/Occupied.css';

const Occupied: React.FC = () => {
  const [open, setOpen] = useState(false);

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
      color: ' rgb(255, 243, 72)',
    },
    heroContent: {
      // backgroundColor: '#f4f4f4'/* theme.palette.background.paper */,
      padding: theme.spacing(8, 0, 6),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Typography
        className={classes.heroContent}
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Applications
      </Typography>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddModal setOpen={setOpen} />
      </Modal>
      {/* Grid Needs Aligning */}
      <Grid container direction="column" alignItems="center" justify="space-between">
        <Grid container item xs={12} sm={6}>
          <Applications />
          <Button className={classes.paper} onClick={() => setOpen(true)}>
            <AddCircleOutlineTwoToneIcon className={classes.icon} style={{ boxShadow: 'none' }} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Occupied;
