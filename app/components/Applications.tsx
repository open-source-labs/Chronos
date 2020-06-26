import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/Applications.css';

interface Props {
  handleClick: (id: any) => void;
};

const Applications: React.FC<Props> = ({ handleClick }) => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

  console.log('apopppps', applications);
  // Create a button for each app
  return (
    <>
      {applications.map((app: string, i: any) => (
        <button
          className="app-btn"
          type="button"
          id={i}
          key={i}
          onClick={e => handleClick(e.currentTarget.id)}
        >
          {app}
        </button>
      ))}
    </>
  );
};

export default Applications;
