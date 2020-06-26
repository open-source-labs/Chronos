import React, { useEffect } from 'react';
// import icon from '../assets/icons/icon.png';
import '../stylesheets/Splash.css';

interface Props {
  flag: boolean;
}

const Splash: React.FC<Props> = () => {
  // Display splash for 3 seconds
  useEffect(() => {
    setTimeout(() => (flag = false), 3000);
  });

  return (
    <div id="splash">
      <img alt="Chronos Logo" />
      <span>chronos</span>
    </div>
  );
};

export default Splash;
// const Splash = ({ setFirstVisit }: any) => {
//   // Display splash for 3 seconds
//   useEffect(() => {
//     setTimeout(() => setFirstVisit(false), 3000);
//   });

//   return (
//     <div id="splash">
//       <img alt="Chronos Logo" />
//       <span>chronos</span>
//     </div>
//   );
// };

// export default Splash;
