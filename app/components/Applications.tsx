import React, { useContext, useEffect, useState } from 'react';
import { Grid, IconButton, Modal, Paper } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { DashboardContext } from '../context/DashboardContext';

import ServicesModal from '../modals/ServicesModal';

const Applications = () => {
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [app, setApp] = useState<string>('');

  useEffect(() => {
    getApplications();
  }, []);

  // Ask user for deletetion confirmation
  const confirmDelete = (app: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i);
  };

  // Handle clicks on Application cards
  const handleClick = (app: string, i: number) => {
    setIndex(i);
    setApp(app);
    setOpen(true);
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      height: 340,
      textAlign: 'center',
      color: 'white',
      fontSize: '3rem',
      whiteSpace: 'nowrap',
      background: 'rgb(33, 34, 41)',
      border: '2px solid black',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      marginBottom: theme.spacing(1),
    },
    hover: {
      position: 'relative',
      top: '5%',
      right: '5%',
      height: 120,
      width: 120,
      boxShadow: 'none',
      '&:hover, &.Mui-focusVisible': { color: 'red' },
    },
  }));

  const classes = useStyles();

  return (
    <>
      {applications.map((app: string, i: number | any | string | undefined) => (
        <Grid item xs={6} key={i}>
          <Paper
            className={classes.paper}
            id={i}
            key={i}
            onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(app, i)}
          >
            {app}
            <IconButton
              aria-label="Delete"
              onClick={(event: React.MouseEvent<HTMLElement>) => confirmDelete(app, i)}
              color="primary"
            >
              <DeleteForeverOutlinedIcon className={classes.hover} />
            </IconButton>
          </Paper>
        </Grid>
      ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ServicesModal i={index} app={app} />
      </Modal>
    </>
  );
};

export default Applications;
