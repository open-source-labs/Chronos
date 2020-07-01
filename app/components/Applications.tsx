import React, { useContext, useEffect } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/Applications.css';
import { Grid } from '@material-ui/core';

const Applications = () => {
  const { applications, getApplications } = useContext(DashboardContext);

  useEffect(() => {
    getApplications();
  }, []);

  // Create a button for each app
  return applications.map((app: string, i: string | undefined) => (
    <Grid
      item
      xs={3}
      className="app-btn"
      id={i}
      key={i}
      onClick={(event: React.MouseEvent<HTMLElement>) => console.log('clicking app!')}
    >
      {app}
    </Grid>
  ));
};

export default Applications;
