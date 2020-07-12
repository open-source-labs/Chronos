import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import '../stylesheets/ServicesModal.css';
import { Link } from 'react-router-dom';

interface ServicesModalProps {
  i: number;
  app: string
}

interface IService {
  microservice: string
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
    <div className="modal" onClick={() => fetchStuff()}>
      {!servicesData.length ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h3>Microservices for <strong>{app}</strong></h3>
          {servicesData.map((service: IService, i: number) => (
          <Link key={i} className="link" to={`/${service.microservice}`}>
            {service.microservice}
          </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default ServicesModal;
