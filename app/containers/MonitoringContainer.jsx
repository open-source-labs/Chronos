import React, { Fragment } from 'react';
import '../stylesheets/monitoring.css'

const MonitoringContainer = (props) => {
  const { detailsSelected } = props;

  return <>{detailsSelected || null}</>;
};

export default MonitoringContainer;
