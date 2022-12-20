import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../components/About';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
import Occupied from '../components/Occupied';
import lightAndDark from '../components/Styling';
import GraphsContainer from './GraphsContainer';

import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/MainContainer.scss';

const MainContainer = React.memo(() => {
  const { mode } = useContext(DashboardContext);
  const currentModeCSS =
    mode === 'light' ? lightAndDark.lightModeMain : lightAndDark.darkModeMain;

  return (
    <>
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
            <Route path="*" element={<h1 style={{color: 'red', fontSize: '200px'}}>Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
});

export default MainContainer;


// THE CODE BELOW IS HOW IT SHOULD WORK MORE OR LESS IF YOU WANT TO RE-IMPLEMENT SIGN-IN
// import LandingPageContainer from './LandingPageContainer';
// import AwaitingApproval from '../components/AwaitingApproval';
  // useEffect(() => {
  //   getLandingPage();
  // }, []);

  // const checkAuth = (Component: any) => {
  //   if (landingPage === 'dashBoard' || authStatus) return <Component />;
  //   return < Redirect to='/' />);
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
