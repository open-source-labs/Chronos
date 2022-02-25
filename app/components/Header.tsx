import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
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
  let [selectedServices, setSelectedServices] = useState([]);

  const handleCheckbox = (e: any) => {
    e.persist();
    if (e.target.checked) {
      e.target.parentElement.classList.toggle('selected');
      setSelectedServices(selectedServices.concat(e.target.value));
    } else {
      e.target.parentElement.classList.toggle('selected');
      setSelectedServices(selectedServices.filter(service => service !== e.target.value));
    }
  };
  // console.log(selectedServices);

  const dropdownClickHandler = () => {
    if (selectModal === false) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      document.querySelector('html')!.style.overflowY = 'hidden';
      setSelectModal(true);
      setSelectedServices([]);
    } else {
      document.querySelector('html')!.removeAttribute('style');
      setSelectModal(false);
    }
  };

  const handleServices = () => {
    // e.preventDefault();
    const joinedServices = selectedServices.join(' ');
    console.log(location.href, joinedServices);

    history.replace(joinedServices);
  };

  const currentModeCSS =
    mode === 'light mode' ? lightAndDark.lightModeHeader : lightAndDark.darkModeHeader;

  useEffect(() => {
    console.log(selectedServices);
  }, [selectedServices]);

  return (
    <div className="microservice-header" style={currentModeCSS}>
      <h1 className="microserviceTitle">{app}</h1>

      {selectModal && <div className="filter" onClick={dropdownClickHandler}></div>}

      <div className={selectModal ? 'dropdown active' : 'dropdown'}>
        <div
          className={selectModal ? 'select disabled' : 'select'}
          onClick={() => !selectModal ? dropdownClickHandler : () => {}}
        >
          {service}
        </div>

        {selectModal && (
          <div className="services">
            {servicesData.map(({ _id, microservice }: any) => (
              <label htmlFor={microservice} className="select">
                {microservice}
                <input
                  type="checkbox"
                  value={`${microservice}`}
                  id={`${microservice}`}
                  name={`${microservice}`}
                  onChange={handleCheckbox}
                />
              </label>
            ))}
            <label htmlFor="communications" className="select">
              communications
              <input
                type="checkbox"
                value={'communications'}
                id={'communications'}
                name={'communications'}
                onChange={() => history.replace('communications')}
              />
            </label>
            <button className="service-button" onClick={handleServices}>
              {selectedServices.length === 0 && 'Select Service'}
              {selectedServices.length === 1 && 'Display Single'}
              {selectedServices.length > 1 && 'Compare Services'}
            </button>
          </div>
        )}
      </div>

      {/* <select name="microservice" value={service} onChange={e => history.replace(e.target.value)}>
        {servicesData.map(({ _id, microservice }: any) => (
          // <option key={_id} value={`${microservice}`} selected={service === microservice}>
          <option key={_id} value={`${microservice}`}>
            {microservice}
          </option>
        ))}
        <option defaultValue="Select service">communications</option>
        {/* <option value="communications" selected={service === 'communications'}>
            communications
          </option> 
      </select> */}

      <div className="header">
        {/* <Link className="link" id="return" to="/applications">
          <span>
            <ListIcon className="icon" id="returnIcon" />
          </span>
          <p id="returnToDash">Dashboard</p>
        </Link> */}
        {/* <button id="returnButton" onClick={() => history.goBack()}><ListIcon className="icon" id="returnIcon" /></button> */}
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
