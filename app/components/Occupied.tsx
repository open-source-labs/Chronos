import React, { useContext, useEffect, useState, useRef, forwardRef } from 'react';

// MATERIAL UI METHODS
import {
  IconButton,
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

// MATERIAL UI ICONS
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';

// MODALS
import AddModal from '../modals/AddModal';
import ServicesModal from '../modals/ServicesModal';

// STYLESHEETS
import '../stylesheets/Occupied.scss';

// DASHBOARD CONTEXT
import { DashboardContext } from '../context/DashboardContext';

import { ApplicationContext } from '../context/ApplicationContext';

// TYPESCRIPT
interface StyleProps {
  root: BaseCSSProperties,
};
type ClickEvent = React.MouseEvent<HTMLElement>;

const Occupied: React.FC = React.memo(function Occupied (props) {
  const { setServicesData } = useContext(ApplicationContext);
  const { applications, getApplications, deleteApp } = useContext(DashboardContext);
  const [open, setOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [app, setApp] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('Search...');
  // Dynamic refs
  const delRef = useRef<any>([]);

  useEffect(() => {
    setServicesData([]);
    getApplications();
  }, []);

  // Ask user for deletetion confirmation
  const confirmDelete = (event: ClickEvent, app: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    if (confirm(message)) deleteApp(i);
  };

  // Handle clicks on Application cards
  const handleClick = (event: ClickEvent, selectedApp: string, i: number) => {
    if (delRef.current[i] && !delRef.current[i].contains(event.target)) {
      setIndex(i);
      setApp(selectedApp);
      setServicesData([]);
      setOpen(true);
    }
  };

  const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    paper: {
      height: 280,
      width: 280,
      textAlign: 'center',
      color: '#888888',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      border: '0',
      boxShadow: '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: `#b5d3e9`,
        color: '#ffffff',
      },
    },
    hover: {
      boxShadow: 'none',
      color: 'transparent'
    },
    btnStyle: {
      position: 'absolute',
      top: -10,
      left: -10,
      margin: '0',
      color: '#eeeeee',
      borderRadius: '0',
      backgroundColor: 'transparent',
      '&:hover' : {
        backgroundColor: 'none'
      }
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
    },
  }));

  const classes = useStyles({} as StyleProps);

  return (
    <div className="entireArea">
      <div className="dashboardArea">
        <header className="mainHeader">
          <section className="header" id="leftHeader">
            <span><ListIcon className="icon" id="listIcon" /></span>
            <span><p id="dashboard">Dashboard</p></span>
          </section>
          <section className="header" id="rightHeader">
            <form className="form">
              <label className="inputContainer">
                <input className="form" id="textInput" placeholder={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" name="search" />
                <hr />
              </label>
              <button className="form" id="submitBtn" type="submit">
                <SearchIcon className="icon" id="searchIcon" />
              </button>
            </form>
            <DashboardIcon className="sideIcon" id="dashboardIcon" />
            <NotificationsIcon className="sideIcon" id="notificationsIcon" />
            <PersonIcon className="sideIcon" id="personIcon" />
          </section>
        </header>

        <div className="cardContainer">
          <div className="card" id={`card-add`}>
            <Button className={classes.paper} onClick={() => setAddOpen(true)}>
              <AddCircleOutlineTwoToneIcon className={classes.icon} />
            </Button>
          </div>
          {applications.map((app: string[], i: number | any | string | undefined) => (
            <div className="card" key={`card-${i}`} id={`card-${i}`}>
              <Card
                key={`card-${i}`}
                className={classes.paper}
                variant="outlined"
                onClick={event => handleClick(event, app[0], i)}
              >
                <CardHeader
                  avatar={
                    <IconButton
                      ref={element => (delRef.current[i] = element)}
                      className={classes.hover}
                      aria-label="Delete"
                      onClick={event => confirmDelete(event, app[0], i)}
                    >
                      <HighlightOffIcon className={classes.btnStyle} id="deleteIcon" />
                    </IconButton>
                  }
                ></CardHeader>
                <CardContent>
                  <Typography className={'cardContent'}>{app[0]}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
          <Modal open={addOpen} onClose={() => setAddOpen(false)}>
            <AddModal setOpen={setAddOpen} />
          </Modal>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ServicesModal key={`key-${index}`} i={index} app={app} />
          </Modal>
        </div>
      </div>
    </div>
  );
});

export default Occupied;
