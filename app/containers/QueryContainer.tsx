import React, { useEffect, useState, useContext } from 'react';
import TransferColumns from '../components/TransferColumns';
import { QueryContext } from '../context/QueryContext';


const QueryContainer = React.memo( props => {
  const {selectedMetrics } = useContext(QueryContext);
  return <div>
    <h2>Search Your Metrics to Display</h2>
    <p>{JSON.stringify(selectedMetrics)}</p>
    <TransferColumns/>
    </div>;
});

export default QueryContainer;

