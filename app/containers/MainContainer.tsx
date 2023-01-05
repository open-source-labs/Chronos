import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from '../components/About';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
import Occupied from '../components/Occupied';
import lightAndDark from '../components/Styling';
import GraphsContainer from './GraphsContainer';
import { DashboardContext } from '../context/DashboardContext';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
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
