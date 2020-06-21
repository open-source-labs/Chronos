import React from 'react';
import '../stylesheets/monitoring.css';

// Details is the current microservice being displayed
// This is set in Sidebar Container and Services List Component
const MonitoringContainer = ({ details }) => <>{details || null}</>;

export default MonitoringContainer;
