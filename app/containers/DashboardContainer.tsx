import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommsContextProvider from '../context/CommsContext';
import ApplicationContextProvider from '../context/ApplicationContext';
import DashboardContextProvider from '../context/DashboardContext';
import DockerContexProvider from '../context/DockerContext'
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => (
  <Router>
    <div className="dashboard">
      <ApplicationContextProvider>
        <DashboardContextProvider>
          <CommsContextProvider>
            <DockerContexProvider>
            <HealthContextProvider>
              <SidebarContainer />
              <MainContainer />
            </HealthContextProvider>
            </DockerContexProvider>
          </CommsContextProvider>
        </DashboardContextProvider>
      </ApplicationContextProvider>
    </div>
  </Router>
);

export default DashboardContainer;
