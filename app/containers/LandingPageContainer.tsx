import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import CreateAdmin from '../components/CreateAdmin';
import FirstLaunch from '../components/FirstLaunch';
import Login from '../components/Login';

import SignUp from '../components/SignUp';
import { DashboardContext } from '../context/DashboardContext';

const LandingPageContainer = React.memo(() => {
  const { landingPage } = useContext(DashboardContext);

  if (landingPage === 'signUp') return <SignUp />;
  if (landingPage === 'login') return <Login />;
  if (landingPage === 'dashBoard') return <Redirect to="/applications" />;
  if (landingPage === 'createAdmin') return <CreateAdmin />;
  return <FirstLaunch />;
});

export default LandingPageContainer;
