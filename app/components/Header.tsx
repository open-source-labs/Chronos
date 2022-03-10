import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/Header.scss';
import lightAndDark from './Styling';

export interface HeaderProps {
  app: string[];
  service: string;
  live: boolean;
  setLive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = React.memo(({ app, service, setLive, live }) => {
  const history = useHistory();
  const { servicesData } = useContext(ApplicationContext);
  const { mode } = useContext(DashboardContext);
  const [selectModal, setSelectModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleCheckbox = (e: any) => {
    e.persist();
    if (e.target.checked) {
      e.target.parentElement.classList.toggle('selected');
      setSelectedServices(selectedServices.concat(e.target.value));
    } else {
      e.target.parentElement.classList.toggle('selected');
      setSelectedServices(selectedServices.filter(serv => serv !== e.target.value));
    }
  };

  const dropdownClickHandler = () => {
    if (selectModal === false) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      
      /** From Version 5.2 Team:
       * Can't remove ! in Lines 45 and 49 as they are strictNullChecks
       */

      document.querySelector('html')!.style.overflowY = 'hidden';
      setSelectModal(true);
      setSelectedServices([]);
    } else {
      document.querySelector('html')!.removeAttribute('style');
      setSelectModal(false);
    }
  };

  const handleServices = () => {
    const joinedServices = selectedServices.join(' ');
    history.replace(joinedServices);
  };

  const currentModeCSS =
    mode === 'light mode' ? lightAndDark.lightModeHeader : lightAndDark.darkModeHeader;

  return (
    <div className="microservice-header" style={currentModeCSS} data-testid="Header">
      <h1 className="microserviceTitle">{app}</h1>

      {selectModal && <div className="filter" onClick={dropdownClickHandler}></div>}

      <div className={selectModal ? 'dropdown active' : 'dropdown'}>
        <div
          className={selectModal ? 'select disabled' : 'select'}
          onClick={() => (!selectModal ? dropdownClickHandler() : () => {})}
        >
          {service}
        </div>

        {selectModal && (
          <div className="services">
            {servicesData.map(({ microservice }: any) => {
              return (
                <label htmlFor={microservice} className="select">
                  {microservice}
                  <input
                    type="checkbox"
                    value={`${microservice}`}
                    id={`${microservice}`}
                    name={`${microservice}`}
                    onChange={handleCheckbox} />
                </label>
              );
            })}

            <button className="service-button" onClick={handleServices}>
              {selectedServices.length === 0 && 'Select Service'}
              {selectedServices.length === 1 && 'Display Single'}
              {selectedServices.length > 1 && 'Compare Services'}
            </button>
          </div>
        )}
      </div>

      <div className="header">
        <button onClick={() => setLive(!live)}>
          {live ? (
            <div>
              <span id="live">Live</span>
            </div>
          ) : (
            <div id="gatherLiveData">Gather Live Data</div>
          )}
        </button>
      </div>
    </div>
  );
});

export default Header;
