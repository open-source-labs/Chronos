import React from 'react';

const About: React.FC = () => {
  return (
    <div className="home">
      <h1>About</h1>
      <p>
        The Chronos Team has always had passion for Open Source endeavors that would greatly benefit
        the developer community.
      </p>
      <p>
        With many existing paid options being difficult to use and expensive to operate, Chronos was
        born...
      </p>
      <p>
        Chronos is an all-in-one network and health monitoring tool for your application or
        microservice, containerized or not!
      </p>
      <p>Insert snippets from the github readme on how to use it</p>
      <h1>Team</h1>
      <div>
        <span>Michael </span>
        <span>Greg </span>
        <span>Ronelle </span>
        <span>Todd </span>
      </div>
      <h1>History</h1>
      <div>
        <span>Maybe have past teams put what they want here</span>
      </div>
    </div>
  );
};

export default About;
