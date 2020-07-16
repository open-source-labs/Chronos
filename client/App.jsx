import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './components/pages/Main';
import Team from './components/pages/Team';
import Contact from './components/pages/Contact';
import Quotes from './components/Quotes';
import Footer from './components/Footer';
import './stylesheets/index.scss';

const App = () => {
  // const [burgerState, setBurgerState] = useState(false);
  // const [dropMenu, renderDrop] = useState(null);

  // let droptoggle = null;

  // function onBurgerClick() {
  //   //conditional rendering for dropdown meny
  //   if (burgerState === false) {
  //     setBurgerState(true);
  //     renderDrop(<DropMenu />);
  //   } else {
  //     setBurgerState(false);
  //     renderDrop(null);
  //   }
  // }

  return (
    <div>
      {/* <div className="hamburgerMenu">
        <button
          onClick={() => {
            onBurgerClick();
          }}
          id="hamburgerButton"
        >
          &#9776;
        </button>
      </div>
      {dropMenu} */}
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/contact" component={Contact} />
        {/* <Route exact path="*" component={NotFound} /> */}
      </Switch>
      <Quotes />
      <Footer />
    </div>
  );
};

export default App;
