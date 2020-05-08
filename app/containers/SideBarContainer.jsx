import React, { useState, useContext } from 'react';
import ServiceOverview from './ServiceOverview.jsx';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext';
import AddService from './AddService.jsx';
import DeleteService from './DeleteService.jsx';

const ServicesDashboard = (props) => {
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  // Used to hold the buttons created for each database found in context.
  const [serviceSelected, setSelection] = useState();