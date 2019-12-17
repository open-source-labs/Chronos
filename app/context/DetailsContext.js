import React from 'react';

// Used to save query results. Laid foundation for conditional rendering similar to how SetupContext was used. 
const DetailContext = React.createContext({
  detailData: null,
  detailSelected: null,
  detailStatus: false,
  toggleOverview: (status) => {
    if (status) return false;
    return true;
  },
});

export const DetailProvider = DetailContext.Provider;
export const DetailConsumer = DetailContext.Consumer;
export default DetailContext;
