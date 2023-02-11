import React, {useState, useEffect} from 'react';
import { HashRouter as Router } from 'react-router-dom';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommsContextProvider from '../context/CommsContext';
import ApplicationContextProvider from '../context/ApplicationContext';
import DashboardContextProvider from '../context/DashboardContext';
import DockerContextProvider from '../context/DockerContext';
import EventContextProvider from '../context/EventContext';
import QueryContextProvider from '../context/QueryContext';
import AwsContextProvider from '../context/AwsContext';
import '../stylesheets/Dashboard.scss';

const DashboardContainer = React.memo(() => {
  const [visible, setVisible] = useState(true);
  
  // useEffect(() => {
  //   setTimeout(() => setVisible(true), 4000);
  // }, []);

  return (
    <>
      {visible &&
        <Router>
        <div className="dash">
          <ApplicationContextProvider>
            <DashboardContextProvider>
              <CommsContextProvider>
                <DockerContextProvider>
                  <HealthContextProvider>
                    <EventContextProvider>
                      <QueryContextProvider>
                        <AwsContextProvider>
                          <SidebarContainer />
                          <MainContainer />
                        </AwsContextProvider>
                      </QueryContextProvider>
                    </EventContextProvider>
                  </HealthContextProvider>
                </DockerContextProvider>
              </CommsContextProvider>
            </DashboardContextProvider>
          </ApplicationContextProvider>
        </div>
      </Router>
      }
    </>
)});

export default DashboardContainer;
