import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { ApplicationContext } from '../context/ApplicationContext';

export interface HeaderProps {
  app: string;
  service: string;
}

const Header: React.SFC<HeaderProps> = ({ app, service }) => {
  const history = useHistory();
  
  const { servicesData } = useContext(ApplicationContext);

  return (
    <div>
      <h1>{app}</h1>
      <h3>{service} data</h3>
      <select name="microservice" value={service} onChange={e => history.replace(e.target.value)}>
        {servicesData.map(({ _id, microservice }: any) => (
          <option key={_id} value={`${microservice}`} selected={service === microservice}>
            {microservice}
          </option>
        ))}
        <option value="communications" selected={service === 'communications'}>
          communications
        </option>
      </select>
    </div>
  );
};

export default Header;
