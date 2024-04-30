import React from 'react';
import './style.scss';
import TeamMembers from './TeamMembers';
import PastContributors from './PastContributors';

const About: React.FC = React.memo(() => {
  return (
    <div className="about">
      <div className="blurb" data-testid="aboutPage">
        <h3 className="mainTitle">About</h3>
        <p className="text">
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