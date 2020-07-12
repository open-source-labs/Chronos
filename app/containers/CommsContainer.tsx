import React, { useEffect } from 'react';
import RequestTypesChart from '../charts/request-type-chart';
import ResponseCodeChart from '../charts/response-code-chart';
import MicroServiceTraffic from '../charts/microservice-traffic';

export interface CommsContainerProps {}

const CommsContainer: React.SFC<CommsContainerProps> = () => {
  return (
    <div>
      <RequestTypesChart />
      <ResponseCodeChart />
      <MicroServiceTraffic />
    </div>
  );
};

export default CommsContainer;
