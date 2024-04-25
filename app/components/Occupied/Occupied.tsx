 /** From Version 5.2 Team:
 * We only fixed linting issues regarding Notifications.
 * Otherwise, Notifications still does not function properly.
 */

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';

// MATERIAL UI METHODS
import { Modal, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

// MATERIAL UI ICONS
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

// // MODALS
// import AddModal from '../modals/AddModal';
import EnvModal from '../../modals/EnvModal';
import AddModal from '../../modals/AddModal';
import AwsModal from '../../modals/AwsModal';
import ProfileContainer from '../../containers/ProfileContainer';
import ServicesModal from '../../modals/ServicesModal';

// STYLESHEETS
import './Occupied.scss';

// // CONTEXT
import { DashboardContext } from '../../context/DashboardContext';
import { ApplicationContext } from '../../context/ApplicationContext';

//Components

import SearchBar from '../SearchBar';
import DashboardIcons from '../DashboardIcons/DashboardIcons';
import ApplicationsCard from '../ApplicationsCard/ApplicationsCard';

// TYPESCRIPT
interface StyleProps {
  root: BaseCSSProperties;
}

//v10: Memoized function, without any props. Should theoretically be called only once.
const Occupied = React.memo(() => {
  const { setServicesData, app } = useContext(ApplicationContext);
  const { user, applications, getApplications, mode } = useContext(DashboardContext);
  const [serviceModalOpen, setServiceModalOpen] = useState<boolean>(false);
  const [personModalOpen, setPersonModalOpen] = useState<boolean>(false);
  const [envModalOpen, setEnvModalOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [awsModalOpen, setAwsModalOpen] = useState<boolean>(false);
  const { appIndex } = useContext(ApplicationContext);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Grab services and applications whenever the user changes
  // v10: Runs once when Occupied is memoized, and subsequently when user is updated.
  useEffect(() => {
    setServicesData([]);
    getApplications();
  }, [user]);

  // Conditional Rendering of UI Modals for Light and Dark Mode
  // Theme, StyleProps
  const useStylesDark = makeStyles<StyleProps>(theme => ({
    // ALL CARDS
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'visible',
      height: 280,
      width: 280,
      textAlign: 'center',
      color: '#888888',
      whiteSpace: 'nowrap',
      backgroundColor: 'lightgray',
      borderRadius: 3,
      border: '0',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        fontWeight: 600,
      },
    },
    iconbutton: {
      boxShadow: 'none',
      color: 'none',
      visibility: 'hidden',
    },
    btnStyle: {
      position: 'absolute',
      top: -10,
      left: -72,
      margin: '0',
      color: '#eeeeee',
      borderRadius: '0',
      backgroundColor: 'none',
      visibility: 'visible',
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
    },

    // ALL CARDS: CONTENT
    fontStyles: {
      fontSize: '18px',
      fontFamily: 'Roboto',
      fontWeight: 300,
      color: '#444d56',
    },
  }));

  const useStylesLight = makeStyles<StyleProps>(theme => ({
    // ALL CARDS
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'visible',
      height: 280,
      width: 280,
      textAlign: 'center',
      color: '#888888',
      whiteSpace: 'nowrap',
      backgroundColor: 'white',
      borderRadius: 3,
      border: '0',
      boxShadow:
        '0 6px 6px 0 rgba(153, 153, 153, 0.14), 0 6px 6px -2px rgba(153, 153, 153, 0.2), 0 6px 8px 0 rgba(153, 153, 153, 0.12)',
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: `#3788fc`,
        color: '#ffffff',
        fontWeight: 600,
      },
    },
    iconbutton: {
      boxShadow: 'none',
      color: 'none',
      visibility: 'hidden',
    },
    btnStyle: {
      position: 'absolute',
      top: -10,
      left: -72,
      margin: '0',
      color: '#eeeeee',
      borderRadius: '0',
      backgroundColor: 'none',
      visibility: 'visible',
    },
    icon: {
      width: '75px',
      height: '75px',
      boxShadow: 'none',
    },
    // ALL CARDS: CONTENT
    fontStyles: {
      fontSize: '18px',
      fontFamily: 'Roboto',
      fontWeight: 300,
      color: '#444d56',
    },
  }));

  const classes = mode === 'light' ? useStylesLight({}) : useStylesDark({});

  return (
    <div className="entireArea">
      <div className="dashboardArea">

        <header className="mainHeader">
          <section className="header" id="rightHeader">
            <SearchBar
              setSearchTerm={setSearchTerm}
            />
            <DashboardIcons
              setPersonModalOpen={setPersonModalOpen}
            />
          </section>
        </header>

        <div className="cardContainer">

          <div className="card" id="card-add">
            <Button className={classes.paper} onClick={() => setEnvModalOpen(true)}>
              <AddCircleOutlineTwoToneIcon className={classes.icon} />
            </Button>
          </div>

          {applications &&
            applications
              .filter((db: any) => db[0].toLowerCase().includes(searchTerm.toLowerCase()))
              .map((application: string[], i: any) => (
                <ApplicationsCard
                  application={application}
                  i={i}
                  setServiceModalOpen={setServiceModalOpen}
                  classes={classes}
                />
          ))}
          <Modal open={envModalOpen} onClose={() => setEnvModalOpen(false)}>
            <EnvModal
              setOpen={setEnvModalOpen}
              setAwsModalOpen={setAwsModalOpen}
              setAddModalOpen={setAddModalOpen}
            />
          </Modal>

          <Modal open={awsModalOpen} onClose={() => setAwsModalOpen(false)}>
            <AwsModal setOpen={setAwsModalOpen} />
          </Modal>

          <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
            <AddModal setOpen={setAddModalOpen} />
          </Modal>

          <Modal open={personModalOpen} onClose={() => setPersonModalOpen(false)}>
            <ProfileContainer setOpen={setPersonModalOpen} />
          </Modal>

          <Modal open={serviceModalOpen} onClose={() => setServiceModalOpen(false)}>
            <ServicesModal key={`key-${appIndex}`} i={appIndex} app={app} />
          </Modal>
        </div>
      </div>
    </div>
  );
});

export default Occupied;

/*
// update notification count based on statuscode >= 400
  // const notification = commsData
  //   .filter((item: { responsestatus: number }) => item.responsestatus >= 400)
  //   .filter((item: { time: string }) => {
  //     const d1 = new Date(item.time);
  //     const d2 = new Date(clickedAt);
  //     return d1 > d2;
  //   });

  // const updateNotification = () => {
  //   const timestamp = new Date();
  //   setClickedAt(timestamp.toISOString());
  // };
*/