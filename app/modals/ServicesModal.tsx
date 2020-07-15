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
    connectToDB(i);
    fetchServicesNames(app);

    return () => {
      setServicesData([]);
    };
  }, [i]);

  /**
   * TEMPORARY fix to allow us to fetch service names
   * AFTER we connect to the Mongo Database. This error does
   * not occur with PostgreSQL databases.
   *
   * Just click on the whitespace of the modal to run another
   * fetch request for service names
   */
  const fetchStuff = () => {
    fetchServicesNames(app);
  };

  return (
    <div className="services-container" onClick={() => fetchStuff()}>
      {!servicesData.length ? (
        <h2>Loading...</h2>
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
