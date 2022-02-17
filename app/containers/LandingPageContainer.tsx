import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import SignUp from '../components/SignUp';
import { DashboardContext } from '../context/DashboardContext';

const LandingPageContainer = React.memo(() => {
  const { landingPage, getLandingPage } = useContext(DashboardContext);

  // useEffect(() => {
  //   console.log('LP', landingPage);
  //   getLandingPage();
  // }, []);
  // console.log('LP2', landingPage);

  return <SignUp />;
});

export default LandingPageContainer;
