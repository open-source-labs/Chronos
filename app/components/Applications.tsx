import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/Applications.css';

const Applications = ({ handleClick }: any) => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications()
  }, [])

  // Create a button for each app
  return applications.map((app: string, i: string | undefined) => (
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
