import React from 'react';
import { useStylingContext } from './StylingContext';

const contributors = [
  'Haoyu', 'Eisha', 'Edwin', 'Tyler', 'Snow', 'Taylor', 'Tim', 'Roberto', 'Nachiket', 'Tiffany', 'Bruno', 'Danny', 'Vince',
  'Matt', 'Derek', 'Kit', 'Grace', 'Jen', 'Patty', 'Stella', 'Michael', 'Ronelle', 'Todd',
  'Greg', 'Brianna', 'Brian', 'Alon', 'Alan', 'Ousman', 'Ben', 'Chris', 'Jenae', 'Tim',
  'Kirk', 'Jess', 'William', 'Alexander', 'Elisa', 'Josh', 'Troy', 'Gahl', 'Brisa', 'Kelsi', 
  'Lucie', 'Jeffrey', 'Justin'
];

const PastContributors: React.FC = () => {
  const currentMode = useStylingContext();

  return (
    <div>
      <h3 style={currentMode} className="title">
        Past Contributors
      </h3>
      <p style={currentMode} className="text">
        {contributors.join(', ')}
      </p>
      <br />
    </div>
  );
};

export default PastContributors;