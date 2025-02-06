
import React from 'react';
import { useAppContext } from '../context/appContext';
import { nanoid } from 'nanoid';
import FruitIcon from './FruitIcon';
import { Fruit } from '../util/types';

const ItemList = () => {
  const { items, adjustInventory } = useAppContext();

  const changeInventoryAmount = (increment: boolean, itemId: string, units: number) => {
    if (!increment && units === 1) return;

    adjustInventory(itemId, increment ? units + 1 : units - 1);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-4">
      <h1 className="text-3xl font-bold">Created Items</h1>
      <div className="flex flex-wrap justify-center w-[85%]">
        {items.map(item => (
          <div
            key={nanoid()}
            className="bg-white/70 rounded-md m-2 p-4 min-w-[150px] flex flex-col justify-center items-center text-center"
          >
            <FruitIcon fruit={item.itemName as Fruit} />
            <p className="capitalize">{item.itemName}</p>
            <div className="my-2 border-[1px] w-full border-dark"></div>
            <div>
              <p className="my-2">
                In stock:{' '}
                <span className="text-light bg-dark p-2 rounded-md text-center">{item.units}</span>
              </p>
              <div className="flex justify-center items-center">
                <button
                  className="bg-blue-400 p-2 rounded-md shadow-blkSm"
                  onClick={() => changeInventoryAmount(false, item.id, item.units)}
                >
                  -
                </button>
                <p className="mx-2"> Adjust Stock</p>
                <button
                  className="bg-blue-400 p-2 rounded-md shadow-blkSm"
                  onClick={() => changeInventoryAmount(true, item.id, item.units)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
