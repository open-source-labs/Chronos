/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext'
import { ApplicationContext } from '../context/ApplicationContext';
import '../stylesheets/ServicesModal.scss';

interface ServicesModalProps {
  i: number;
  app: string;
}

interface IService {
  microservice: string;
}

// v10: Seems to never have been updated for cloud-based info...
// servicesModal is re-rendered depending on i and application passed in...
const ServicesModal: React.FC<ServicesModalProps> = React.memo(({ i, app }) => {
  console.log('Hi, inside ServicesModal. Memoize function invoked in ServicesModal.');
  console.log('ServicesModal current props (index, app): ', i, ' ', app);

  const { user, applications } = useContext(DashboardContext);
  console.log('user from Dashboard Context:', user);
  console.log('applications from Dashboard Context: ', applications);
  console.log('applications[i][2]: ', applications[i][2]);
  const { servicesData, connectToDB } = useContext(ApplicationContext);
  const [services, setServices] = useState<Array<string>>([]);

  const toggleService = service => {
    if (services.includes(service)) {
      setServices(services.filter(el => el !== service));
    } else {
      if (service !== 'communications' && services.includes('communications')) setServices([]);
      setServices(services.concat(service));
    }
  };

  // v10: connectToDB function definition in Application Context.
  // parameters for connectToDB call: user, i (index), app (card title), app URL (url on card)
  // applications[i][2] refers to the user provided URI
  useEffect(() => {
    console.log('Hi, inside useEffect in ServicesModal. Calling connectToDB function.');
    console.log("Passing the following parameters for user, i, app, applications, ");
    console.log(user, ' ', i, ' ', app, ' ', applications);
    connectToDB(user, i, app, applications[i][2]);
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
          <div className="services-links">
            {servicesData.map((service: IService, index: number) => (
              <div
                key={`${index}servicesData`}
                className={services.includes(service.microservice) ? 'link selected' : 'link'}
                onClick={() => toggleService(service.microservice)}
              >
                {service.microservice}
              </div>
            ))}
            <Link id='selectLink'
              className="router link"
              to={services.length > 0 ? `/applications/${app}/${services.join(' ')}` : '#'}
            >
              {services.length === 0 && 'Select Services'}
              {services.length === 1 && 'Display Service'}
              {services.length > 1 && 'Compare Services'}
            </Link>
          </div>
        </>
      )}
    </div>
  );
});

export default ServicesModal;
