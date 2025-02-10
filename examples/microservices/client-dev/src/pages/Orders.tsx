import React from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../components/OrderList.js';
import { IoCaretBackCircle } from 'react-icons/io5';
import { useAppContext } from '../context/appContext.js';

const Orders = () => {
  const { orders } = useAppContext();

  if (!orders.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">No orders created</h1>
        <h1>Go Back to Create Orders</h1>
        <Link to="/" className="underline mt-2 hover:scale-110">
          <IoCaretBackCircle className="text-light text-6xl" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <OrderList />
    </div>
  );
};

export default Orders;
