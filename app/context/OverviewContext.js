import React, { useState } from 'react';

export const OverviewContext = React.createContext();

const OverviewContextProvider = ({ children }) => {
  const [overviewData, setOverviewData] = useState(null);

  return (
    <OverviewContext.Provider value={{ overviewData, setOverviewData }}>
      {children}
    </OverviewContext.Provider>
  );
};

export default OverviewContextProvider;
