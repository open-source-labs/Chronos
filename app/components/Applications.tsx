import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, IconButton } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const Applications = () => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

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
  // Create a button for each app
  return applications.map((app: string, i: string | undefined) => (
    <Paper
      className={classes.paper}
      id={i}
      key={i}
      onClick={(event: React.MouseEvent<HTMLElement>) => console.log('clicking app!')}
    >
      {app}
      <IconButton className={classes.customHoverFocus} aria-label="Delete">
        <DeleteForeverOutlinedIcon />
      </IconButton>
    </Paper>
  ));
};

export default Applications;
