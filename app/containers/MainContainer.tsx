import React, { useContext, useEffect } from 'react';
import { redirect, Route, Routes } from 'react-router-dom';
import LandingPageContainer from './LandingPageContainer';
import WindowBar from '../components/WindowBar';
import About from '../components/About';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
import Occupied from '../components/Occupied';
import lightAndDark from '../components/Styling';
import GraphsContainer from './GraphsContainer';
import AwaitingApproval from '../components/AwaitingApproval';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/MainContainer.scss';

const MainContainer = React.memo(() => {
  const { mode, landingPage, getLandingPage, authStatus } = useContext(DashboardContext);
  const currentModeCSS =
    mode === 'light mode' ? lightAndDark.lightModeMain : lightAndDark.darkModeMain;


  /* <h1 style={{color: 'red', fontSize: '400px'}}>Hello world</h1> */

  useEffect(() => {
    getLandingPage();
  }, []);
  return (
    <>
      {/* <WindowBar /> */}
      <div className="main-container" style={currentModeCSS}>
        <div className="main-routes">
          <Routes>
            <Route path="/" element={<Occupied />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/applications/:app/:service"
              element={<GraphsContainer />}
            />
            <Route path="*" element={<h1 style={{color: 'red', fontSize: '200px'}}>Not Found</h1> } />
          </Routes>
        </div>
      </div>
    </>
  );

  // const checkAuth = (Component: any) => {
  //   if (landingPage === 'dashBoard' || authStatus) return <Component />;
  //   return redirect('/');
  // };

  // return (
  //   <>
  //     {/* <WindowBar /> */}
  //     <div className="main-container" style={currentModeCSS}>
  //       <div className="main-routes">
  //         <Routes>
  //           <Route path="/" element={LandingPageContainer} />
  //           <Route path="/awaitingApproval" element={AwaitingApproval} />
  //           <Route path="/about" element={() => checkAuth(About)} />
  //           <Route path="/contact" element={() => checkAuth(Contact)} />
  //           <Route path="/settings" element={() => checkAuth(Settings)} />
  //           <Route path="/applications" element={() => checkAuth(Occupied)} />
  //           <Route
  //             path="/applications/:app/:service"
  //             element={() => checkAuth(GraphsContainer)}
  //           />
  //           <Route path="*" element={() => <h1>Not found</h1>} />
  //         </Routes>
  //       </div>
  //     </div>
  //   </>
  // );
});

export default MainContainer;
