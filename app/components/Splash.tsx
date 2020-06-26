import React, { useEffect } from 'react';
import '../stylesheets/Splash.css';

//superset of JS
// types: tell code what types we expect
// interface Props {
//   flag: boolean;
// }

// const Splash: React.FC<Props> = () => {
//   // Display splash for 3 seconds
//   useEffect(() => {
//     setTimeout(() => (flag = false), 3000);
//   });

//   return (
//     <div id="splash">
//       <img alt="Chronos Logo" />
//       <span>chronos</span>
//     </div>
//   );
// };

// export default Splash;
interface IProp {
  firstVisit: boolean;
}

const Splash = ({ setFirstVisit }: any) => {
  console.log('SetfirstVisis', setFirstVisit);
  // Display splash for 3 seconds

  useEffect(() => {
    setTimeout(() => setFirstVisit(false), 3000);
  });

  return (
    <div id="splash">
      <img src={'../assets/icons/icon.png'} alt="Chronos Logo" />
      <span>chronos</span>
    </div>
  );
};

export default Splash;

// what component expects to receive
// interface IProps {
//   children: (
//     firstVisit: boolean,
//     setFirstVisit: React.Dispatch<React.SetStateAction<boolean>>
//   ) => JSX.Element | null;
// }

// interface IProp {
//   firstVisit: boolean;
//   setFirstVisit: (value: boolean | (prevVar: boolean) => boolean) => void;
// }

// // we are expecting splash to have a flag property passed to it
// const Splash: React.FC<IProps> = ({ setFirstVisit }) => {
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
