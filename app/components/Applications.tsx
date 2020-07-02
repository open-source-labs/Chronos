import React, { useContext, useEffect, useState } from 'react';
import { Box, IconButton, Modal, Card, CardActions } from '@material-ui/core';
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
      height: 256,
      width: '45%',
      marginRight: '1%',
      textAlign: 'center',
      verticalAlign: 'middle',
      alignItems: 'center',
      color: 'white',
      fontSize: '3rem',
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(3),
      background: 'rgb(33, 34, 41)',
      border: '2px solid black',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    customHoverFocus: {
      position: 'relative',
      margin: 'auto',
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'yellow' },
    },
  }));

  const classes = useStyles();

  return (
    <>
      {applications.map((app: string, i: number | any | string | undefined) => (
        <div key={i} style={{ cursor: 'pointer' }} className={classes.paper}>
          <Card
            id={i}
            key={i}
            onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(app, i)}
          >
            {app}
          </Card>
          <CardActions>
            <IconButton
              className={classes.customHoverFocus}
              // size="large"
              aria-label="Delete"
              onClick={(event: React.MouseEvent<HTMLElement>) => confirmDelete(app, i)}
            >
              <DeleteForeverOutlinedIcon
                color="secondary"
                style={{ boxShadow: 'none', width: 60, height: 60 }}
              />
            </IconButton>
          </CardActions>
        </div>
      ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ServicesModal i={index} app={app} />
      </Modal>
    </>
  );
};

export default Applications;
