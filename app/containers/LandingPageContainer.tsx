import React, { useContext } from 'react';
import { redirect } from 'react-router-dom';
import CreateAdmin from '../components/CreateAdmin';
import FirstLaunch from '../components/FirstLaunch';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { DashboardContext } from '../context/DashboardContext';

function LandingPageContainer() {
  const { landingPage } = useContext(DashboardContext);

  if (landingPage === 'signUp') return <SignUp />;
  if (landingPage === 'login') return <Login />;
  if (landingPage === 'dashBoard') {
    return <h1 style={{color: 'red', fontSize: '400px'}}>Hello Landing Page</h1> 
    // return redirect("/applications")
  };
  if (landingPage === 'createAdmin') return <CreateAdmin />;
  return <FirstLaunch />;
};

export default LandingPageContainer;
