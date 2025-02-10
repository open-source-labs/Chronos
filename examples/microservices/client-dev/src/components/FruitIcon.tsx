import React from 'react';

import { GiBananaBunch, GiGrapes, GiStrawberry } from 'react-icons/gi';
import { Fruit } from '../util/types.js';

type Props = {
  fruit: Fruit;
};

const FruitIcon = ({ fruit }: Props) => {
  const fruitIcon = (fruit: Fruit) => {
    const classes = 'text-6xl';

    switch (fruit) {
      case 'bananas':
        return <GiBananaBunch className={`text-yellow-300 ${classes}`} />;
      case 'strawberries':
        return <GiStrawberry className={`text-red-300 ${classes}`} />;
      case 'grapes':
        return <GiGrapes className={`text-purple-400 ${classes}`} />;
      default:
        return <GiBananaBunch className={`text-yellow-300 ${classes}`} />;
    }
  };

  return <>{fruitIcon(fruit)}</>;
};

export default FruitIcon;
