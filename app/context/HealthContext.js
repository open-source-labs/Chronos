import React, { useState } from 'react';

// Used to save query results. Laid foundation for conditional rendering similar to how SetupContext was used.
export const HealthContext = React.createContext();

const HealthContextProvider = ({ children }) => {
  const [healthData, setHealthData] = useState(null);

  return (
    <HealthContext.Provider value={{ setHealthData, healthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthContextProvider;
