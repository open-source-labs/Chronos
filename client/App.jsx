import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './components/pages/Main';
import Team from './components/pages/Team';
import Contact from './components/pages/Contact';
import Footer from './components/Footer';

import './stylesheets/index.scss';
import './stylesheets/App.scss'

const App = () => {
  return (
    <div className="container">
      <Nav />
      <div className="routes">
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/team" element={<Team/>} />
          <Route exact path="/contact" element={<Contact/>} />
          {/* <Route exact path="*" component={NotFound} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
