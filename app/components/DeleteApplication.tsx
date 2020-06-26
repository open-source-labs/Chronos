import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/DeleteApplication.css';


const DeleteApplication: React.FC = () => {
  const { applications, deleteApp } = useContext(DashboardContext);

  // Sends request to Main.js to delete application data
  const onDelete = (index: number) => {
    deleteApp(index);
  };

  // Ask user for deletetion confirmation
  const confirmDelete = (app: string, i: number) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;
    // Proceed with deletion if user confirms
    if (confirm(message)) onDelete(i);
  };

  return (
    <div className="deleteMainContainer">
      <h1 className="overviewTitle">Select Database To Delete</h1>
      <div className="servicesList">
        {applications.map((app: string, i: number) => (
          <button className="deleteMicroservice" key={i} onClick={() => confirmDelete(app, i)}>
            {app}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeleteApplication;
