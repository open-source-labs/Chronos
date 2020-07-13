import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommsContextProvider from '../context/CommsContext';
import ApplicationContextProvider from '../context/ApplicationContext';
import DashboardContextProvider from '../context/DashboardContext';
import DockerContextProvider from '../context/DockerContext';

const DashboardContainer = () => (
  <Router>
    <div style={dashboardStyle}>
      <ApplicationContextProvider>
        <DashboardContextProvider>
          <CommsContextProvider>
            <DockerContextProvider>
              <HealthContextProvider>
                <SidebarContainer />
                <MainContainer />
              </HealthContextProvider>
            </DockerContextProvider>
          </CommsContextProvider>
        </DashboardContextProvider>
      </ApplicationContextProvider>
    </div>
  </Router>
);

// Style
const dashboardStyle = {
  display: 'flex',
  width: '100vw'
}

export default DashboardContainer;
