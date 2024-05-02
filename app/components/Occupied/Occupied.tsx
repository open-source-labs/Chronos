 /** From Version 5.2 Team:
 * We only fixed linting issues regarding Notifications.
 * Otherwise, Notifications still does not function properly.
 */

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';

// MATERIAL UI METHODS
import { Modal, Button } from '@material-ui/core';

// MATERIAL UI ICONS
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';

// // MODALS
// import AddModal from '../modals/AddModal';
import EnvModal from '../../modals/EnvModal/EnvModal';
import AddModal from '../../modals/AddModal/AddModal';
import AwsModal from '../../modals/AwsModal/AwsModal';
import ProfileContainer from '../../containers/ProfileContainer';
import ServicesModal from '../../modals/ServicesModal/ServicesModal';

// STYLESHEETS
import './styles.scss';

// // CONTEXT
import { DashboardContext } from '../../context/DashboardContext';
import { ApplicationContext } from '../../context/ApplicationContext';

//Components

import SearchBar from '../SearchBar/SearchBar';
import DashboardIcons from '../DashboardIcons/DashboardIcons';
import ApplicationsCard from '../ApplicationsCard/ApplicationsCard';

import { useStylesLight, useStylesDark } from './helpers/muiHelper'
import { Link } from 'react-router-dom';

//v10: Memoized function, without any props. Should theoretically be called only once.
const Occupied = React.memo(() => {
  const { setServicesData, app, example } = useContext(ApplicationContext);
  const { user, applications, getApplications, mode } = useContext(DashboardContext);
  const [ modal,setModal ] = useState({isOpen:false,type:''})
  const { appIndex } = useContext(ApplicationContext);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Grab services and applications whenever the user changes
  // v10: Runs once when Occupied is memoized, and subsequently when user is updated.
  useEffect(() => {
    setServicesData([]);
    getApplications();
  }, [user]);

  const classes = mode === 'light' ? useStylesLight({}) : useStylesDark({});

  return (
    <div 
      className="dashboardArea"
    >
      <header className="mainHeader">
        <section 
          className="header" 
          id="rightHeader"
        >
          <SearchBar
            setSearchTerm={setSearchTerm}
          />
          <DashboardIcons
            setModal={setModal}
          />
        </section>
      </header>

      <div 
        className="cardContainer"
      >
        {!example &&
        <div 
          className="card" 
          id="card-add"
        >
          <Button 
            className={classes.paper} 
            onClick={() => setModal({isOpen:true,type:'envModal'})}
          >
            <AddCircleOutlineTwoToneIcon 
              className={classes.icon} 
            />
          </Button>
        </div>
        }

        {applications
          .filter((db: any) => db[0].toLowerCase().includes(searchTerm.toLowerCase()))
          .map((application: string[], i: any) => {
            const description = application[3]
            if(!example && description === "Example") return <></>
            return (
              <ApplicationsCard
                key={crypto.randomUUID()}
                application={application}
                i={i}
                setModal={setModal}
                classes={classes}
              />
            )})}

        <Modal 
          open={modal.isOpen} 
          onClose={() => setModal({isOpen:false,type:''})}
        >
          {
            modal.type === 'envModal' ? 
              <EnvModal setModal={setModal} />
            :
            modal.type === 'awsModal' ?
              <AwsModal setModal={setModal} />
            :
            modal.type === 'addModal' ?
              <AddModal setModal={setModal} />
            :
            modal.type === 'personalModal' ?
              <ProfileContainer setModal={setModal}/>
            :
            modal.type === 'serviceModal' ?
              <ServicesModal 
                key={`key-${appIndex}`} 
                i={appIndex} 
                app={app}
              />
            :
            <></>
          }
        </Modal>

        {/* <Modal open={envModalOpen} onClose={() => setEnvModalOpen(false)}>
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
        </Modal> */}
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