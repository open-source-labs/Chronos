import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../context/ApplicationContext';
import { DashboardContext } from '../../context/DashboardContext';
import './styles.scss';
import ServiceDropdown from './ServiceDropdown';
import LiveToggle from './LiveToggle';

interface HeaderProps {
    app: any;  // Consider defining a more specific type if possible
    service?: string;  // Marking as optional if not all usages of Header need the service
    live?: boolean;  // Optional boolean for live status
    setLive?: React.Dispatch<React.SetStateAction<boolean>>;  // Optional function to change live status
  }
  

  const Header: React.FC<HeaderProps> = ({ app, service, live, setLive }) => {
  const navigate = useNavigate();
  const { servicesData } = useContext(ApplicationContext);
  const { mode } = useContext(DashboardContext);
  const [selectModal, setSelectModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const toggleDropdown = () => {
    setSelectModal(!selectModal);
  };

  const handleServices = () => {
    const path = `/applications/${app}/${selectedServices.join(' ')}`;
    navigate(path);
  };

  return (
    <div className="microservice-header" data-testid="Header">
      <h1 className="microserviceTitle">{app}</h1>
      <ServiceDropdown
        servicesData={servicesData}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        isOpen={selectModal}
        toggleDropdown={toggleDropdown}
      />
       <LiveToggle live={live} toggleLive={() => setLive && setLive(!live)} />
    </div>
  );
};

export default Header;