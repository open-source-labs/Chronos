import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, IconButton, Modal } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import ServicesModal from './ServicesModal';

const Applications = () => {
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [index, setIndex] = useState<number>(2);

  useEffect(() => {
    getApplications();
  }, []);

  // const { applications, deleteApp } = useContext(DashboardContext);

  // Sends request to Main.js to delete application data
  const onDelete = (index: number) => {
    deleteApp(index);
  };

  // Ask user for deletetion confirmation
  const confirmDelete = (app: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    // Proceed with deletion if user confirms
    if (confirm(message)) onDelete(i);
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

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, app: string, i: number) => {
    console.log('=====================')
    console.log('handleclick, index =>', i)
    console.log('handleclick, app =>', app)
    setSelected(app);
    setIndex(i);
    toggleOpen();
  };

  const classes = useStyles();
  // Create a button for each app
  return (
    <>
      {applications.map((app: string, i: number | any | string | undefined) => (
        <div onClick={e => handleClick(e, app, i)} style={{ cursor: 'pointer' }}>
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
      <Modal open={open} onClose={toggleOpen}>
        <ServicesModal app={selected} i={index} />
      </Modal>
    </>
  );
};

export default Applications;
