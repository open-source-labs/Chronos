import React, { useState, useEffect } from 'react';
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

  const [visible, setVisible] = useState(false);

  /**
   * When DashBoard Container first mounted, visible is default to false, so that the Splash component can be stay visible.
   * After 4 seconds, set the DashBoard Container visibility to true
   */
  useEffect(() => {
    setTimeout(() => setVisible(true), 4000);
  }, []);

  /**
   * 1. Provide access to use ReactRouter
   * 2. Provide access to serveral Context Providers (a.k.a Data Bank), including Application, Dashboard, Comms, Docker, Health, Event, Query, Aws
   * 3. Child Component: SidebarContainer and MainContainer
   */
  return (
    <>
      {visible && (
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
      )}
    </>
  );
});

export default DashboardContainer;
