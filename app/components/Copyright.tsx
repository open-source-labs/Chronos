import React from 'react';
import { Typography, Link } from '@material-ui/core';

export interface CopyrightProps {}

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://chronoslany.com/" target="_blank">
      Team Chronos
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);
export default Copyright;
