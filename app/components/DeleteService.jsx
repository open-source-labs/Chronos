import React, { useContext } from 'react';
import DashboardContext from '../context/DashboardContext';
import '../stylesheets/DeleteService.css';

const { ipcRenderer } = window.require('electron');

const DeleteService = () => {
  const { applicationsList } = useContext(DashboardContext);

  // Sends request to Main.js to delete application data
  const onDelete = index => {
    ipcRenderer.send('deleteService', index);
    ipcRenderer.on('deleteResponse', (event, services) => {
      document.location.reload();
    });
  };

  // Ask user for deletetion confirmation
  const confirmDelete = (app, i) => {
    const message = `The application '${app}' will be permanently deleted. Continue?`;

    // Proceed with deletion if user confirms
    if (confirm(message)) onDelete(i);
  };

  // Create buttons are for each application
  const buttons = applicationsList.map((app, i) => (
    <button className="deleteMicroservice" key={i} onClick={() => confirmDelete(app, i)}>
      {app}
    </button>
  ));

  return (
    <div className="deleteMainContainer">
      <h1 className="overviewTitle">Select Database To Delete</h1>
      <div className="servicesList">{buttons}</div>
    </div>
  );
};

export default DeleteService;
