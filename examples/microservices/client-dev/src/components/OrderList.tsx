import React from 'react';

import { useAppContext } from '../context/appContext';
import { nanoid } from 'nanoid';
import ClothesIcon from './ClothesIcon';
import { Clothes } from '../util/types';

const OrderList = () => {
  const { orders } = useAppContext();

  return (
    <div className="w-full flex flex-col justify-center items-center mt-4">
      <h1 className="text-3xl font-bold">Orders</h1>
      <div className="flex flex-wrap justify-center w-[85%]">
        {orders.map(order => (
          <div
            key={nanoid()}
            className="bg-white/70 rounded-md m-2 p-4 min-w-[150px] flex flex-col justify-center items-center text-center"
          >
            <div className="bg-dark rounded-md p-2 mt-4 shadow-blkSm">
              <ClothesIcon clothes={order.item as Clothes} />
            </div>
            <p className="capitalize font-bold text-dark mt-4">{order.item}</p>
            <div className="my-2 border-[1px] w-full border-dark"></div>
            <div>
              <p className="my-2">
                Amount:{' '}
                <span className="text-light bg-dark p-2 rounded-md text-center">
                  {order.amount}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
