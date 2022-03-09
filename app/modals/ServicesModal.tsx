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
  const { fetchServicesNames, servicesData, setServicesData, connectToDB } = useContext(
    ApplicationContext
  );

  let [services, setServices ] = useState<Array<string>>([])

  const toggleService = (service) => {
      if(services.includes(service)) {
        setServices(services.filter(el => el !== service))
      }
      else {
        if(service !== 'communications' && services.includes('communications')){
          services = [];
        }
        setServices(services.concat(service));
      };
  };

  useEffect(() => {
    console.log(services)
  },[services])
  
  useEffect(() => {
    connectToDB(i, app);
    // fetchServicesNames(app);

    return () => {
      // setServicesData([]);
    };
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
                key={index}
                className={services.includes(service.microservice) ? "link selected" : "link"}
                onClick={() => toggleService(service.microservice)}
              >
                {service.microservice}
              </div>
            ))}
            <div 
              className={services.includes('communications') ? "link selected" : "link"}
              onClick={() => setServices(['communications'])}>
              communications
            </div>
            <Link className="router link" to={services.length > 0 ? `/applications/${app}/${services.join(" ")}` : "#"}>
              {services.length === 0 && "Select Services"}
              {services.length === 1 && "Display Service"}
              {services.length > 1 && "Compare Services"}
            </Link>
          </div>
        </>
      )}
    </div>
  );
});

export default ServicesModal;
