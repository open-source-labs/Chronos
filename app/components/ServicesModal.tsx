import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import '../stylesheets/ServicesModal.css';
import { Link } from 'react-router-dom';

interface ServicesModalProps {
  app: string;
  i: number;
}

const ServicesModal: React.SFC<ServicesModalProps> = ({ app, i }) => {
  console.log('service modal props', i, app);
  const { fetchServicesNames, servicesData, setServicesData, connectToDB } = useContext(
    ApplicationContext
  );

  useEffect(() => {
    console.log('running useEffect');
    connectToDB(i);
    fetchServicesNames();

    return () => {
      console.log('component unmounting');
      setServicesData([]);
    };
  }, [app, i]);

  const fetchStuff = () => {
    fetchServicesNames();
  };

  return (
    <div className="modal">
      {!servicesData.length ? (
        <h1>The services modal!!</h1>
      ) : (
        servicesData.map((service: any) => (
          <Link to={`/:${service.microservice}`}>{service.microservice}</Link>
        ))
      )}
      <button onClick={() => fetchStuff()}>fetch test</button>
    </div>
  );
};

export default ServicesModal;
