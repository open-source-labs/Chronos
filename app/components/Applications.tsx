import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Grid, Button, IconButton } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
// import { DashboardContext } from '../context/DashboardContext';

const Applications = () => {
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);

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
  // Create a button for each app
  return applications.map((app: string, i: number | any | string | undefined) => (
    <div className={classes.paper}>
      <Box
        id={i}
        key={i}
        border={1}
        borderColor="secondary.main"
        onClick={(event: React.MouseEvent<HTMLElement>) => console.log('clicking app!')}
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
  ));
};

export default Applications;
