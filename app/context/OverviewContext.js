import React from 'react';

const OverviewContext = React.createContext({
  overviewData: null,
  overviewStatus: true,
  toggleOverview: (status) => {
    if (status) return false;
    return true;
  },
});

export const OverviewProvider = OverviewContext.Provider;
export const OvervieConsumer = OverviewContext.Consumer;
export default OverviewContext;
