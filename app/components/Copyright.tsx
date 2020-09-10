import React from 'react';
import { Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../stylesheets/Applications.scss';

export interface CopyrightProps {}

const Copyright = () => {
  const useStyles = makeStyles(theme => ({
    copyright: {
      fontFamily: 'Inter',
      position: 'fixed',
    }
  }))
  const classes = useStyles();
  return (
  <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://chronoslany.com/" target="_blank">
      Team Chronos
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)};
export default Copyright;
