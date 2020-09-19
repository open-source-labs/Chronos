import React, { useContext, useEffect } from 'react';
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

const ServicesModal: React.SFC<ServicesModalProps> = ({ i, app }) => {
  const { fetchServicesNames, servicesData, setServicesData, connectToDB } = useContext(
    ApplicationContext
  );

  useEffect(() => {
    connectToDB(i, app);
    // fetchServicesNames(app);

    return () => {
      setServicesData([]);
    };
  }, [i]);

  return (
    <div className="services-container">
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
            {servicesData.map((service: IService, i: number) => (
              <Link key={i} className="link" to={`/applications/${app}/${service.microservice}`}>
                {service.microservice}
              </Link>
            ))}
            <Link className="link" to={`/applications/${app}/communications`}>
              communications
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesModal;
