import React, { useContext, useEffect, useState } from 'react';
import {
  IconButton,
  Grid,
  Modal,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { DashboardContext } from '../context/DashboardContext';

import ServicesModal from '../modals/ServicesModal';
import '../stylesheets/Applications.css';

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
  const handleClick = (selectedApp: string, i: number) => {
    setIndex(i);
    setApp(selectedApp);
    console.log('handle', selectedApp);
    setOpen(true);
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      height: 340,
      textAlign: 'center',
      color: 'rgba(33, 34, 41, 1.2)',
      whiteSpace: 'nowrap',
      backgroundColor: 'rgba(33, 34, 41, 0.2)',
      border: '3px ridge #808080',
      boxShadow: '0 10px 10px rgba(0,0,0,0.5)',
      '&:hover, &.Mui-focusVisible': { color: 'white', background: 'rgba(33, 34, 41, 1.2)' },
    },
    hover: {
      position: 'relative',
      bottom: 20,
      right: 40,
      boxShadow: 'none',
      '&:hover, &.Mui-focusVisible': { color: 'red' },
    },
    btnStyle: {
      position: 'relative',
      top: 50,
      margin: '0 auto',
      color: 'rgb(255, 243, 72)',
      backgroundColor: 'grey',
    },
    fontStyles: {
      fontSize: '3rem',
      [theme.breakpoints.up('lg')]: {
        fontSize: '2.75rem',
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      {applications.map((app: string[], i: number | any | string | undefined) => (
        <Grid item lg={4} md={6} sm={12} key={i}>
          <div id="card-hover">
            <Card
              className={classes.paper}
              variant="outlined"
              onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(app[0], i)}
            >
              <CardHeader
                avatar={
                  <IconButton
                    ref={delRef}
                    className={classes.hover}
                    aria-label="Delete"
                    onClick={(event: React.MouseEvent<HTMLElement>) => confirmDelete(app[0], i)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                }
              ></CardHeader>
              <CardContent>
                <Typography className={classes.fontStyles}>{app[0]}</Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      ))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ServicesModal i={index} app={app} />
      </Modal>
    </>
  );
};

export default Applications;

//name, desc, creation date
// three cards a row, same width
// move trash can
//change the font
