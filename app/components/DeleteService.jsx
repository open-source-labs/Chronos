import React, { useContext } from 'react';
import DashboardContext from '../context/DashboardContext';
import SetupContext from '../context/SetupContext';


const { ipcRenderer } = window.require('electron');


const DeleteService = (props) => {
  console.log('in the DeleteService')
  
  // Used to toggle setup required if user wants delete all of the databases and the user needs to be sent to the front page.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices. 
  let serviceList = useContext(DashboardContext);
 
  // Only happens when a DB button is clicked
  const onDelete= (index) => {
    // IPC communication used to delete the button pressed.
    ipcRenderer.send('deleteService', index);
    ipcRenderer.on('deleteResponse', (event, services) => {
        serviceList = services;
        if(serviceList === ["hard","coded","in"]){
          setup.setupRequired =setup.toggleSetup(false);
        }
        document.location.reload();
      
    }); 
  }

  const databaseButtons =[];
  for(let i = 0; i<serviceList.length; i++){
    databaseButtons.push(<button className="microserviceBtn deleteMicroservice" key ={"delete"+i} onClick={()=>{
      const moveForward = confirm(`Are you sure you want to delete ${serviceList[i]}? \n If "YES" press the "OK" button, \n else press the "Cancel" button`);
      // if yes run the function 
      if (moveForward){onDelete(i)}
      
    }}>{serviceList[i]}</button>)
  }

  return (
    <div className="mainContainer">
        <h1 className='overviewTitle'>Press on the Database You Want to Delete</h1>
        <div className="servicesList">{databaseButtons}</div>
    </div>
  );
};

export default DeleteService;
