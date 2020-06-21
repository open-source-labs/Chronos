import React, { useState } from 'react';

// Used to save query results. Laid foundation for conditional rendering similar to how SetupContext was used.
// const OverviewContext = React.createContext({
//   overviewData: null,
//   overviewStatus: true,
//   toggleOverview: status => !status,
// });

export const OverviewContext = React.createContext();

const OverviewContextProvider = ({ children }) => {
  const [overviewData, setOverviewData] = useState(null);
  const [overviewStatus, setOverviewStatus] = useState(true);

  return (
    <OverviewContext.Provider value={{ overviewData, setOverviewData }}>
      {children}
    </OverviewContext.Provider>
  )
};

export default OverviewContextProvider;
