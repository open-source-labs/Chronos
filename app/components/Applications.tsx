import React, { useContext, useEffect, useState, useRef } from 'react';
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
import '../stylesheets/Applications.scss';

type ClickEvent = React.MouseEvent<HTMLElement>;

// eslint-disable-next-line react/display-name
const Applications: React.FC = React.memo(() => {
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [app, setApp] = useState<string>('');

  // Dynamic refs
  const delRef = useRef<any>([]);

  useEffect(() => {
    getApplications();
  }, []);

  // Ask user for deletetion confirmation
  const confirmDelete = (event: ClickEvent, application: string, i: number) => {
    const message = `The application '${application}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i);
  };

  // Handle clicks on Application cards
  const handleClick = (event: ClickEvent, selectedApp: string, i: number) => {
    if (delRef.current[i] && !delRef.current[i].contains(event.target)) {
      setIndex(i);
      setApp(selectedApp);
      setOpen(true);
    }
  };

  const useStyles = makeStyles(theme => ({
    // cards: myPostgres, myMongo, ToddDB
    paper: {
      height: 280,
      width: 280,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 3,
      border: '0',
      boxShadow:
        '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: `#3788fc`,
      },
      '&:active': {
        backgroundColor: `#3788fc`,
      },
    },
    iconbutton: {
      position: 'relative',
      bottom: 20,
      right: 47,
      boxShadow: 'none',
      '&:hover, &.Mui-focusVisible': { color: '#ffffff' },
      backgroundColor: 'transparent',
    },
    fontStyles: {
      color: '#444d56',
      fontSize: '22px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '22px',
        fontFamily: 'Roboto',
        fontWeight: 100,
      },
    },
  }));

  const classes = useStyles();
  return (
    <>
      {applications.map((application: string[], i: number | any | string | undefined) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid item lg={4} md={6} sm={12} key={`${i}application`}>
          <div id="card-hover">
            <Card
              // key={`card-${i}`}
              className={classes.paper}
              variant="outlined"
              onClick={event => handleClick(event, application[0], i)}
            >
              <CardHeader
                avatar={
                  <IconButton
                    ref={element => {
                      delRef.current[i] = element;
                    }}
                    className={classes.iconbutton}
                    aria-label="Delete"
                    onClick={event => confirmDelete(event, application[0], i)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Typography className={classes.fontStyles}>{application[0]}</Typography>
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
});

export default Applications;
