import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import FirstLaunch from '../components/FirstLaunch';

import SignUp from '../components/SignUp';
import { DashboardContext } from '../context/DashboardContext';

const LandingPageContainer = React.memo(() => {
  const { landingPage } = useContext(DashboardContext);

  if (landingPage === 'signUp') return <SignUp />;
  if (landingPage === 'dashBoard') return <Redirect to="/applications" />;
  return <FirstLaunch />;
});

export default LandingPageContainer;
