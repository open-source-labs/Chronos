import React from 'react';
import { Link } from 'react-router-dom';
import './ServicesModal.scss';

interface IService {
  microservice: string;
};


const ServicesLink = (props) => {
  const toggleService = service => {
    if (props.services.includes(service)) {
      props.setServices(props.services.filter(el => el !== service));
    } else {
      if (service !== 'communications' && props.services.includes('communications')) props.setServices([]);
      props.setServices(props.services.concat(service));
    }
  };

  return (

    <div className="services-links">
            {props.servicesData.map((service: IService, index: number) => (
              <div
                key={`${index}servicesData`}
                className={props.services.includes(service.microservice) ? 'link selected' : 'link'}
                onClick={() => toggleService(service.microservice)}
              >
                {service.microservice}
              </div>
            ))}
            <Link id='selectLink'
              className="router link"
              to={props.services.length > 0 ? `/applications/${props.app}/${props.services.join(' ')}` : '#'}
            >
              {props.services.length === 0 && 'Select Services'}
              {props.services.length === 1 && 'Display Service'}
              {props.services.length > 1 && 'Compare Services'}
            </Link>
          </div>
  )
}

export default ServicesLink;



