/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ApplicationContext } from '../context/ApplicationContext';
import '../stylesheets/ServicesModal.scss';

interface ServicesModalProps {
  i: number;
  app: string;
}

interface IService {
  microservice: string;
}

const ServicesModal: React.FC<ServicesModalProps> = React.memo(({ i, app }) => {
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

  useEffect(() => {
    connectToDB(i, app);
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
