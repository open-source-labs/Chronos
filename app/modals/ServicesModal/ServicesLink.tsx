import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesModal.scss';

interface IService {
  microservice: string;
};


const ServicesLink = (props) => {
  const { services, setServices, servicesData, app} = props;

  const toggleService = service => {
    if (services.includes(service)) {
      setServices(services.filter(el => el !== service));
    } else {
      if (service !== 'communications' && services.includes('communications')) setServices([]);
      setServices(services.concat(service));
    }
  };

  return (

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
  )
}

export default ServicesLink;



