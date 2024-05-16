import React from 'react';
import './styles.scss';
import TeamMembers from './TeamMembers';
import PastContributors from './PastContributors';
// import { useStylingContext } from './StylingContext';
import { useContext } from 'react';
import lightAndDark from '../Styling';
import { DashboardContext } from '../../context/DashboardContext';

const About: React.FC = React.memo(() => {
  const { mode } = useContext(DashboardContext);

  const currentMode = mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;
  const currentStyle = mode === 'light' ? lightAndDark.lightModeData : lightAndDark.darkModeData;
  return (

    
    <div className="about" >
      <div className="blurb" data-testid="aboutPage" style={currentStyle}>
        <h3 style={currentStyle} className="mainTitle">About</h3>
        <p style={currentStyle} className="text" >
          The Chronos Team has a passion for building tools that are powerful, beautifully
          designed, and easy to use. Chronos was conceived as an Open Source endeavor that directly benefits the developer
          community. It can also monitor applications deployed using AWS, EC2, and ECS from Amazon.
        </p>
        <br></br>
        <TeamMembers />
        <PastContributors />
      </div>
    </div>
  );
});

export default About;