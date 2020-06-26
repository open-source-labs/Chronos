import React, { useContext } from 'react';
import DashboardContext from '../context/DashboardContext';
import '../stylesheets/Applications.css';

const Applications = ({ handleClick }: any) => {
  const { applicationsList } = useContext(DashboardContext);

  // Create a button for each app
  return applicationsList.map((app: string, i: string | undefined) => (
    <button
      className="app-btn"
      type="button"
      id={i}
      key={i}
      onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event.currentTarget.id)}
    >
      {app}
    </button>
  ));
};

export default Applications;
