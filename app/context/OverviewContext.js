import React from 'react';

// Used to save query results. Laid foundation for conditional rendering similar to how SetupContext was used.
const OverviewContext = React.createContext({
  overviewData: null,
  overviewStatus: true,
  toggleOverview: (status) => {
    if (status) return false;
    return true;
  },
});

export const OverviewProvider = OverviewContext.Provider;
export const OverviewConsumer = OverviewContext.Consumer;
export default OverviewContext;
