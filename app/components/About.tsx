import React from 'react';
import '../stylesheets/About.scss';

const About: React.FC = () => {
  return (
    <div className="home">
      <div className="blurb">
        <h3 className="para">About</h3>
        <p className="para">
          The Chronos Team has always had passion for Open Source endeavors that would greatly benefit
          the developer community. With many existing paid options being difficult to use and expensive to operate, Chronos was
          born. Chronos is an all-in-one network and health monitoring tool for your application or
          microservice, containerized or not!
        </p>
        <div className="doya">
          <h3 className="para">Team Doya</h3><span id="sproutSpan"><img className="sprout" src="../assets/clean-sprout.gif" alt="sprout"></img></span>
          <br/>
          <div>
            <span className="para">Grace </span><br />
            <span className="para">Jen </span><br />
            <span className="para">Patty </span><br />
            <span className="para">Stella </span><br /><br />
          </div>
        </div>
        <h3 className="para">Contributors</h3>
        <p className="para">Michael, Ronelle, Todd, Greg
        Brianna, Brian, Alon, Alan
        Ousman, Ben, Chris, Jenae, Tim</p>
      </div>
    </div>
  );
};

export default About;
