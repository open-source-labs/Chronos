import React from 'react';
import { useStylingContext } from './StylingContext';

const names = ['Mike', 'Stephen', 'Ted', 'Sofia'];

const TeamMembers: React.FC = () => {
  const currentMode = useStylingContext();

  const nameList = names.map(name => (
    <span key={name} style={currentMode} className="text">
      <p>{name}</p>
    </span>
  ));

  return (
    <div>
      <h3 style={currentMode} className="title">
        Current Version Authors
      </h3>
      <div id='OSPNames'>
        {nameList}
        <br />
      </div>
    </div>
  );
};

export default TeamMembers;