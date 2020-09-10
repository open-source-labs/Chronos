import React, { useState } from 'react';
import { Grid, Modal, Button, Typography } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Copyright from '../components/Copyright';
import AddModal from '../modals/AddModal';
import Applications from './Applications';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListIcon from '@material-ui/icons/List';
import SearchIcon from '@material-ui/icons/Search';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import '../stylesheets/Occupied.scss';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

interface StyleProps {
  root: BaseCSSProperties,
};

const Occupied: React.FC = () => {
  const [open, setOpen] = useState(false);

  const useStyles = makeStyles<Theme, StyleProps>(theme => ({
    // card: "+" button only
    paper: {
      height: 280,
      width: 280,
      textAlign: 'center',
      color: 'rgba(33, 34, 41, 1.2)',
      whiteSpace: 'nowrap',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      border: '0',
      boxShadow: '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: `#ccd8e1`,
        color: '#ffffff',
      },
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
      color: '#999999',
    },
  }));

  const classes = useStyles({} as StyleProps);
  
  function append(parent:any, child:any) {
    const parentNode: HTMLElement = document.querySelector(parent);
    const childNode: HTMLElement = document.querySelector(child);
    return parentNode.append(childNode);
  }

  return (
    
    <div>
      <div className="sidebarArea">
      </div>
      <div className="dashboardArea">
        <header className="mainHeader">
          <section className="header" id="leftHeader">
            <span><ListIcon className="icon" id="listIcon" /></span>
            <span><p id="dashboard">Dashboard</p></span>
          </section>
          <section className="header" id="rightHeader">
            <form className="form">
              <label className="inputContainer">
                <input className="form" id="textInput" value={`Search`} type="text" name="search" />
                <hr />
              </label>
              <button className="form" id="submitBtn" type="submit">
                <SearchIcon className="icon" id="searchIcon"/>
              </button>
            </form>
            <DashboardIcon className="sideIcon" id="dashboardIcon"/>
            <NotificationsIcon className="sideIcon" id="notificationsIcon"/>
            <PersonIcon className="sideIcon" id="personIcon"/>
          </section>
        </header>
        <Modal open={open} onClose={() => setOpen(false)}>
          <AddModal setOpen={setOpen} />
        </Modal>
        <Button className={classes.paper} onClick={() => setOpen(true)}>
          <AddCircleOutlineTwoToneIcon className={classes.icon} />
        </Button>
        <Applications />
      </div>
    </div>
  );
};

export default Occupied;
