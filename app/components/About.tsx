import React, { useContext } from 'react';
import '../stylesheets/About.scss';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from './Styling';

const About: React.FC = React.memo(() => {
  const { mode } = useContext(DashboardContext.DashboardContext);

  const currentMode =
    mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  return (
    <div className="about">
      <div className="blurb" data-testid="aboutPage">
        <h3 style={currentMode} className="mainTitle">
          About
        </h3>
        <p style={currentMode} className="text">
          The Chronos Team has always had a passion for Open Source endeavors that would greatly
          benefit the developer community. With many existing subscription services being difficult
          to use and expensive to operate, Chronos was born. Chronos is an all-in-one network and
          health monitoring tool for your application or microservice, containerized or not!
        </p>
        <h3 style={currentMode} className="title">
          Fantastic Four
        </h3>
        <div>
          <span style={currentMode} className="text">
            Nachiket
          </span>
          <br />
          <span style={currentMode} className="text">
            Tiffany
          </span>
          <br />
          <span style={currentMode} className="text">
            Bruno
          </span>
          <br />
          <span style={currentMode} className="text">
            Danny
          </span>
          <br />
          <br />
        </div>
        <h3 style={currentMode} className="title">
          Contributors
        </h3>
        <p style={currentMode} className="text">
          Vince, Matt, Derek, Kit, Grace, Jen, Patty, Stella, Michael, Ronelle, Todd, Greg, Brianna,
          Brian, Alon, Alan, Ousman, Ben, Chris, Jenae, Tim, Kirk, Jess, William, Alexander
        </p>
        <br />
        <p style={currentMode}>Copyright © Team Chronos 2021.</p>
      </div>
    </div>
  );
});

export default About;
