import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';

interface IProp {
  firstVisit: boolean;
  setFirstVisit: React.Dispatch<React.SetStateAction<IProp | undefined>>;
  // fn: (firstVisit: boolean) => void;
}

const App: React.FC = () => {
  // HARD CODED for development
  // const [firstVisit, setFirstVisit] = useState(false);

  // UNCOMMENT this for splash demo
  const [firstVisit, setFirstVisit] = useState<IProp>();

  // function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

  // Splash image on startup
  return firstVisit ? <Splash setFirstVisit={setFirstVisit} /> : <DashboardContainer />;
};

export default App;

// Original Implementation

// const App: React.FC<IProps> = () => {
//   const [firstVisit, setFirstVisit] = useState(true);

//   // Splash image on startup
//   return firstVisit ? <Splash setFirstVisit={setFirstVisit}/> : <DashboardContainer />;
// };

// export default App;
