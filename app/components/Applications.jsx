import React, { useContext } from 'react';
import DashboardContext from '../context/DashboardContext';
import '../stylesheets/Applications.css';

const Applications = ({ handleClick }) => {
  const { applicationsList } = useContext(DashboardContext);

  // Create a button for each app
  return applicationsList.map((app, i) => (
    <button
      className="app-btn"
      type="button"
      id={i}
      key={i}
      onClick={e => handleClick(e.target.id)}
    >
      {app}
    </button>
  ));
};

export default Applications;
