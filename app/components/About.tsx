import React, { useContext } from 'react';
import '../stylesheets/About.scss';
import * as DashboardContext from '../context/DashboardContext';
import lightAndDark from './Styling';

const About: React.FC = React.memo(() => {
  const { mode } = useContext(DashboardContext.DashboardContext);

  const currentMode =
    mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  /**
   * Enter your OSP group's names into the explicit array of names in nameArray, and it will render them Chronos appropriately.
   * Feel free to change the header for the list of names.
   * 
   */
  const nameArray: JSX.Element[] = ['Brisa', 'Kelsi', 'Lucie', 'Jeffrey', 'Justin'].map(name => {
    return (
      <span style={currentMode} className="text">
        <p>{`${name}`}</p>
      </span>
    );
  });

  return (
    <div className="about">
      <div className="blurb" data-testid="aboutPage">
        <h3 style={currentMode} className="mainTitle">
          About
        </h3>
        <p style={currentMode} className="text">
          The Chronos Team has a passion for building tools that are powerful, beautifully
          designed, and easy to use. Chronos was conceived as an Open Source endeavor that directly benefits the developer
          community. Together, the Chronos application and NPM package make up an all-in-one network and health monitoring
          tool for your containerized or non-conatinerized applications or microservices. It can also
          monitor applications deployed using AWS, EC2, and ECS from Amazon.
        </p>
        <br></br>
        <h3 style={currentMode} className="title">
          Current Version Authors
        </h3>
        <div id='OSPNames'>
          {nameArray}
          <br />
        </div>
        <h3 style={currentMode} className="title">
          Past Contributors
        </h3>
        <p style={currentMode} className="text">
          Snow, Taylor, Tim, Roberto, Nachiket, Tiffany, Bruno, Danny, Vince, Matt, Derek, Kit,
          Grace, Jen, Patty, Stella, Michael, Ronelle, Todd, Greg, Brianna, Brian, Alon, Alan,
          Ousman, Ben, Chris, Jenae, Tim, Kirk, Jess, William, Alexander, Elisa, Josh, Troy, Gahl
        </p>
        <br />
      </div>
    </div>
  );
});

export default About;
