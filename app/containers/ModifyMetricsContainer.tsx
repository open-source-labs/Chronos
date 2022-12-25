import React, { useEffect, useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext'

const MetricsContainer:React.FC = React.memo(props => {

  const { savedMetrics, getSavedMetrics } = useContext(ApplicationContext)

  useEffect(() => {
    getSavedMetrics();
    console.log(savedMetrics)}, [])

  return (
    <div className="transferColumns">
      <h2>You can modify which metrics you want your Chronos app to track by selecting or deselecting from the list below</h2>
    </div>
  );
});

export default MetricsContainer;