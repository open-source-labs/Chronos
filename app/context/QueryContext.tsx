import React, { useState} from 'react';

export const QueryContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} selectedMetrics 
 * @method    setSelectedMetrics
 */

const QueryContextProvider: React.FC = React.memo(({ children }) => {
  const [selectedMetrics, setSelectedMetrics] = useState([{}]);


  return (
   // uncoment here after pass test 
   <QueryContext.Provider value={{ selectedMetrics, setSelectedMetrics}}>
      {children}
    </QueryContext.Provider>
  );
});

export default QueryContextProvider;
