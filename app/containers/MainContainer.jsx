import React from 'react';
import '../stylesheets/MainContainer.css';

// Details is the current microservice being displayed
// This is set in Sidebar Container and Services List Component
const MainContainer = ({ details }) => <>{details || null}</>;

export default MainContainer;
