import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, Modal } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { DashboardContext } from '../context/DashboardContext';

import ServicesModal from './ServicesModal';

const Applications = () => {
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    getApplications();
  }, []);

  // Ask user for deletetion confirmation
  const confirmDelete = (app: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    // Proceed with deletion if user confirms
    if (confirm(message)) deleteApp(i);
  };

  // Handle clicks on Application cards
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const useStyles = makeStyles(theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      height: 128,
      width: '33%',
      padding: theme.spacing(1),
      textAlign: 'center',
      color: 'white',
      fontSize: '2rem',
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      background: 'rgb(33, 34, 41)',
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    customHoverFocus: {
      '&:hover, &.Mui-focusVisible': { backgroundColor: 'yellow' },
    },
  }));

  const classes = useStyles();

  return (
    <>
      {applications.map((app: string, i: number | any | string | undefined) => (
        <div onClick={e => handleClick(e, i)} style={{ cursor: 'pointer' }}>
          <Paper
            className={classes.paper}
            id={i}
            key={i}
            onClick={(event: React.MouseEvent<HTMLElement>) => console.log('clicking app!')}
          ></Paper>
          <IconButton
            className={classes.customHoverFocus}
            aria-label="Delete"
            onClick={(event: React.MouseEvent<HTMLElement>) => confirmDelete(app, i)}
          >
            {app}
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </div>
      ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ServicesModal i={index} />
      </Modal>
    </>
  );
};

export default Applications;
