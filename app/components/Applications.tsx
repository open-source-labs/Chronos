import React, { useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, Modal } from '@material-ui/core';
=======
import { Box, Button, Modal } from '@material-ui/core';
>>>>>>> 51bc884101e4eb262d3485705d604154595a1681
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
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'yellow' },
    },
  }));

  const classes = useStyles();

  return (
    <>
      {applications.map((app: string, i: number | any | string | undefined) => (
        <div
          key={i}
          // onClick={e => handleClick(e, app, i)}
          style={{ cursor: 'pointer' }}
          className={classes.paper}
        >
          <Box
            id={i}
            key={i}
            border={1}
            borderColor="secondary.main"
            onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(app, i)}
          >
            {app}
          </Box>
          <Button
            className={classes.customHoverFocus}
            size="large"
            aria-label="Delete"
            onClick={(event: React.MouseEvent<HTMLElement>) => confirmDelete(app, i)}
          >
            <DeleteForeverOutlinedIcon color="secondary" />
          </Button>
        </div>
      ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ServicesModal i={index} app={app} />
      </Modal>
    </>
  );
};

export default Applications;
