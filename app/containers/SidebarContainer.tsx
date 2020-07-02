import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import SidebarHeader from '../components/SidebarHeader';
import Applications from '../components/Applications';
import '../stylesheets/SidebarContainer.css';

interface IService {
  _id: number;
  interval: number;
  microservice: string;
}

const SidebarContainer: React.FC = (): JSX.Element => {
  /* 
  ******************* This logic will move to Applications.tsx!! ********************
  ******************* This logic will move to Applications.tsx!! ********************
  ******************* This logic will move to Applications.tsx!! ********************
  
  // Set view to selected index
  // Index is dependent on which microservice button is clicked
  const [index, setIndex] = useState<null | number>(null);
  const handleClick = (_id: any) => {
    // Toggle the sidebar buttons to reveal or hide their microservices
    if (index === null) {
      setIndex(_id);
    } else {
      setIndex(index === _id ? null : _id);
    }
  };
  const { connectToDB, fetchServicesNames, servicesData } = useContext(ApplicationContext);
  // On Mount: fetch all of an application's comms and health data
  useEffect(() => {
    connectToDB(index);
    fetchServicesNames(index);
  }, [index]);
 */
  return (
    <div className="container">
      <div className="sidebar">
        <SidebarHeader />
        <div className="btn-container">
          <Link className="link" to="/">
            <HomeSharpIcon />
          </Link>
          <Link className="link" to="/delete">
            -
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
