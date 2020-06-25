import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommsContextProvider from '../context/CommsContext';
import ApplicationContextProvider from '../context/ApplicationContext';
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => (
  <Router>
    <div className="dashboard">
      <ApplicationContextProvider>
        <CommsContextProvider>
          <HealthContextProvider>
            <SidebarContainer />
            <MainContainer />
          </HealthContextProvider>
        </CommsContextProvider>
      </ApplicationContextProvider>
    </div>
  </Router>
);

export default DashboardContainer;
