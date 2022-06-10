import React, { useEffect, useState} from 'react';

export const QueryContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Array} selectedMetrics 
 * @method    setSelectedMetrics
 */

const QueryContextProvider: React.SFC = React.memo(({ children }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);


  return (
   <QueryContext.Provider value={{ selectedMetrics, setSelectedMetrics}}>
      {children}
    </QueryContext.Provider>
  );
});

export default QueryContextProvider;
