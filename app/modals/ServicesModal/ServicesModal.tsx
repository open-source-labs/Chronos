/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { DashboardContext } from '../../context/DashboardContext'
import { ApplicationContext } from '../../context/ApplicationContext';
import './ServicesModal.scss';

import ServicesLink from './ServicesLink';

interface ServicesModalProps {
  i: number;
  app: string;
}



// v10: Seems to never have been updated for cloud-based info...
// servicesModal is re-rendered depending on i and application passed in...
const ServicesModal: React.FC<ServicesModalProps> = React.memo(({ i, app }) => {
  //console.log('Hi, inside ServicesModal. Memoize function invoked in ServicesModal.');
  //console.log('ServicesModal current props (index, app): ', i, ' ', app);

  const { user, applications } = useContext(DashboardContext);
  const { servicesData, connectToDB } = useContext(ApplicationContext);
  const [services, setServices] = useState<Array<string>>([]);
  console.log(services);
  const [ cardName,dbType,dbURI,description,serviceType ] = applications[i]



  // v10: connectToDB function definition in Application Context.
  // parameters for connectToDB call: user, i (index), app (card title), app URL (url on card)
  // applications[i][2] refers to the user provided URI
  // adding database type to make connection and fetchServiceNames more efficient
  useEffect(() => {
    // console.log('Hi, inside useEffect in ServicesModal. Calling connectToDB function.');
    connectToDB(user, i, app, dbURI, dbType);
  }, [i]);



  return (
    <div className="servicesContainer">
      {!servicesData.length ? (
        <div className="loadingMessageModal">
          <h2 id="loadingMessage">Loading...</h2>
        </div>
      ) : (
        <>
          <div className="services-header">
            <h2>{app}</h2>
            <p>Select a server to monitor</p>
          </div>
          <ServicesLink 
            app={app} 
            servicesData={servicesData} 
            services={services} 
            setServices={setServices}
          />
        </>
      )}
    </div>
  );
});

export default ServicesModal;
