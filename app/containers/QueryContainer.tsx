import TransferColumns from '../components/TransferColumns';
import React from 'react';

const QueryContainer = React.memo(props => {
  return (
    <div className="transferColumns">
      <h2>Search Your Metrics to Display</h2>
      <TransferColumns />
    </div>
  );
});

export default QueryContainer;
