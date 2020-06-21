import React, { useState } from 'react';

export const CommunicationsContext = React.createContext();

const CommunicationsContextProvider = ({ children }) => {
  const [communicationsData, setCommunicationsData] = useState(null);

  return (
    <CommunicationsContext.Provider value={{ communicationsData, setCommunicationsData }}>
      {children}
    </CommunicationsContext.Provider>
  );
};

export default CommunicationsContextProvider;
