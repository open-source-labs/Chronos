
import React from 'react';
import { FaRedhat } from 'react-icons/fa';
import { IoShirtOutline } from 'react-icons/io5';
import { PiPants } from 'react-icons/pi';

import { Clothes } from '../util/types';

type Props = {
  clothes: Clothes;
};

const ClothesIcon = ({ clothes }: Props) => {
  const clothesIcon = (clothes: Clothes) => {
    const classes = 'text-6xl';

    switch (clothes) {
      case 'hat':
        return <FaRedhat className={`text-amber-500 ${classes}`} />;
      case 'shirt':
        return <IoShirtOutline className={`text-red-400 ${classes}`} />;
      case 'pants':
        return <PiPants className={`text-blue-400 ${classes}`} />;
      default:
        return <FaRedhat className={`text-yellow-300 ${classes}`} />;
    }
  };

  return <>{clothesIcon(clothes)}</>;
};

export default ClothesIcon;
