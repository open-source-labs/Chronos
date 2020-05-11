import React, { useContext } from 'react';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext';
import '../stylesheets/DeleteServices.css';
// Declare a constant ipcRenderer by deconstructing window.require('electron') so that the onDelete function can initialize an IPC Communication 
const { ipcRenderer } = window.require('electron');


// Deletes a Service
const DeleteService = (props) => {
  // Declares a constant setup and initialize it to the SetupContext. 
  // SetupContext indicates whether or not an initial setup is necessary.
  // An initial setup is necessary when the user has not saved any database to chronos frontend application.   
  const setup = useContext(SetupContext);

  // Declares a variable serviceList and initialize it to the DashboardContext. 
  // DashboardContext lists the databases saved by users. 
  let serviceList = useContext(DashboardContext);
 
  /* 
   Sends a deleteService request with an index to an ipcMain.on function within the Main.js 
   On return, the function reassigns the serviceList variable to the updated services provided within the deleteResponse. If the serviceList equals ["hard","coded","in"], then the user has no database saved to the chronos frontend application. If this is true, the function reassigns setup.setupRequired to true by invoking setup.toggleSetup with the argument 'false'. Then the function reloads the application to show the changes made to the services.
  */
  const onDelete= (index) => {
    ipcRenderer.send('deleteService', index);
    ipcRenderer.on('deleteResponse', (event, services) => {
        serviceList = services;
        if(serviceList === ["hard","coded","in"]){
          setup.setupRequired = setup.toggleSetup(false);
        }
        document.location.reload();
    }); 
  }

  // Declares a constant databaseButtons and initialize it an empty array
  const databaseButtons =[];

  /* Iterates over the serviceList to create a button for each service. Each button is pushed into the databaseButtons array as the button is created. Each button has an onclick function that invokes the window confirm function with a warning message (ex:'Are you sure you want to delete this service?') and stores the result of invoking confirm into a constant moveForward. If the moveForward is true, then onDelete function is invoked with the index of where the service is stored within the serviceList*/
  for(let i = 0; i<serviceList.length; i++){
    databaseButtons.push(<button className="microserviceBtn deleteMicroservice" key ={"delete"+i} onClick={()=>{
      const moveForward = confirm(`Are you sure you want to delete ${serviceList[i]}? \n If "YES" press the "OK" button, else press the "Cancel" button`);
      if (moveForward){onDelete(i)}
      
    }}>{serviceList[i]}</button>)
  }
  // returns the title of the page with all of the services that can be deleted as buttons 
  return (
    <div className="mainContainer">
        <h1 className='overviewTitle'>Press on the Database You Want to Delete</h1>
        <div className="servicesList">{databaseButtons}</div>
    </div>
  );
};

// export the DeleteService function so that it can imported anywhere
export default DeleteService;

