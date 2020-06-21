import React, { useState } from 'react';

// Used to save query results. Laid foundation for conditional rendering similar to how SetupContext was used.
export const DetailsContext = React.createContext();

const DetailsContextProvider = ({ children }) => {
  const [detailsData, setDetailsData] = useState(null);
  // const [detailSelected, setDetailSelected] = useState(null);
  // const [detailStatus, setDetailStatus] = useState(null);
  // const toggleOverview = status => !status;

  return (
    <DetailsContext.Provider value={{ setDetailsData, detailsData }}>
      {children}
    </DetailsContext.Provider>
  );
};

export default DetailsContextProvider;

