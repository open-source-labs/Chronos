import React from 'react';

const MonitoringContainer = (props) => {
  const { detailsSelected } = props;

  return (
    <div className="mainContainer">
      {detailsSelected || null}
    </div>
  );
};

export default MonitoringContainer;
