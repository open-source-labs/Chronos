import React from 'react';

import ItemList from '../components/ItemList.js';
import { useAppContext } from '../context/appContext.js';
import { Link } from 'react-router-dom';
import { IoCaretBackCircle } from 'react-icons/io5';

const Items = () => {
  const { items } = useAppContext();

  if (!items.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">No items created</h1>
        <h1>Go Back to Create Items</h1>
        <Link to="/" className="underline mt-2 hover:scale-110">
          <IoCaretBackCircle className="text-light text-6xl" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ItemList />
    </div>
  );
};

export default Items;
