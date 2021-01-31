import React from 'react';

import Home from '../Home';
import Features from '../Features';
import Demo from '../Demo';
import Quotes from '../Quotes';
import Action from '../Action';
import '../../stylesheets/Main.scss';

const Main = () => {
  return (
    <>
      <Home />
      <Features />
      <Demo />
      <Action />
    </>
  );
};

export default Main;
