import React from 'react';
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
import '../stylesheets/Dashboard.scss';

const DashboardContainer = React.memo(() => (
  <Router>
    <div className="dash">
      <ApplicationContextProvider>
        <DashboardContextProvider>
          <CommsContextProvider>
            <DockerContextProvider>
              <HealthContextProvider>
                <EventContextProvider>
                  <QueryContextProvider>
                    <SidebarContainer />
                    <MainContainer />
                  </QueryContextProvider>
                </EventContextProvider>
              </HealthContextProvider>
            </DockerContextProvider>
          </CommsContextProvider>
        </DashboardContextProvider>
      </ApplicationContextProvider>
    </div>
  </Router>
));

export default DashboardContainer;
