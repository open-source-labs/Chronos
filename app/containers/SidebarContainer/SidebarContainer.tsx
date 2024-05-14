import React, { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SettingsIcon from '@mui/icons-material/Settings';

import './styles.scss';
import { ApplicationContext } from '../../context/ApplicationContext';
import { AwsContext } from '../../context/AwsContext';
import { DashboardContext } from '../../context/DashboardContext';
import { QueryContext } from '../../context/QueryContext';

const SidebarContainer = React.memo(() => {
  // Extract invervalID from ApplicationContext. Initival value: intervalID = null
  const { intervalID,example,setExample,setAppIndex,setApp,setServicesData,setChart } = useContext(ApplicationContext);
  // Extract isLoading and setLoading state from AwsContext. Initial value: isLoading = true
  const { isLoading, setLoadingState } = useContext(AwsContext);
  // clear interval and set loading state to true when leaving graph containers
  const { addApp,setApplications,deleteApp } = useContext(DashboardContext)
  const { setSelectedMetrics } = useContext(QueryContext)

  const navigate = useNavigate();

  /**
   * @function handleCLick - check if the 'intervalID' exists. If so, theres a timer running and the fuunction clears the timer using @function clearInterval - function.
   * Checks if variable 'isLoading' is false and if so the content is not loading and therefore, sets it to true using the setLoadingState function.
   */
  const handleClick = () => {
    if (intervalID) clearInterval(intervalID);
    if (!isLoading) setLoadingState(true);
  };

  const handleExample = () => {

    setExample(true)

    const examplesData = {
      microServicesMongoFields: {
        typeOfService: 'Microservices',
        database: 'MongoDB',
        URI: "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5",
        name: 'Microservices-Mongo',
        description: 'Mongo Microservices Example'
      }
      ,
      dockerMongoData: {
        typeOfService: 'Docker',
        database: 'MongoDB',
        URI: "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5",
        name: 'Docker-Mongo',
        description: 'Docker Example'
      }
    }

    addApp(examplesData)
  }

  const handleExitExample = () => {

    setExample(false)
    setAppIndex(0);
    setApp('');
    setServicesData([]);
    setChart('all')
    deleteApp(0,'all')
    setSelectedMetrics([])
    navigate("/")
  }

  return (
    <div className="sidebar-container" id="mySidebar">
      <div className="sidebar">
        <div className="firstRow">
          <span>
            {/* Attempting to change the path by taking out the ../ */}
            <img alt="C" id="C" src="assets/C.svg" />
          </span>
          <span>
            <img alt="Chronos" id="logo" src="assets/logo.svg" />
          </span>
        </div>
        <hr className="line" id="firstLine" />
        <div className="thirdRow">
          <Link className="sidebar-link" to="/" id="dash" onClick={handleClick}>
            <ListIcon
              style={{
                WebkitBoxSizing: 'content-box',
                boxShadow: 'none',
                width: '35px',
                height: '35px',
              }}
            />
            &emsp;Dashboard
          </Link>
          <Link className="sidebar-link" to="/settings" id="settings" onClick={handleClick}>
            <SettingsIcon
              style={{
                WebkitBoxSizing: 'content-box',
                boxShadow: 'none',
                width: '35px',
                height: '35px',
              }}
            />
            &emsp;Settings
          </Link>
          <Link className="sidebar-link" to="/about" id="about" onClick={handleClick}>
            <InfoIcon
              style={{
                WebkitBoxSizing: 'content-box',
                boxShadow: 'none',
                width: '35px',
                height: '35px',
              }}
            />
            &emsp;About
          </Link>
          <Link className="sidebar-link" to="/contact" id="contact" onClick={handleClick}>
            <ContactSupportIcon
              style={{
                WebkitBoxSizing: 'content-box',
                boxShadow: 'none',
                width: '35px',
                height: '35px',
              }}
            />
            &emsp;Contact
          </Link>
          <Link className="sidebar-link" to="/" id="dash" onClick={handleClick}>
            {!example ?
            
              <button 
                className="example-button"
                onClick={() => handleExample()}
              >
                  EXAMPLE
              </button>
              :
              <button
                className="example-button"
                onClick={() => handleExitExample()}
              >
                EXIT EXAMPLE
              </button>
            
            }       
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SidebarContainer;
