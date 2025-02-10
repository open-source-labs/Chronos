import React from 'react';
import { FormEvent, useState } from 'react';
import { Clothes } from '../util/types.js';
import { useAppContext } from '../context/appContext.js';
import { nanoid } from 'nanoid';
import ClothesIcon from './ClothesIcon.js';

const itemOptions = ['hat', 'shirt', 'pants'];

const CreateOrderForm = () => {
  const { createOrder, isLoading } = useAppContext();
  const [clothes, setClothes] = useState<Clothes>('hat');
  const [amount, setAmount] = useState<number>(1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    createOrder(clothes, amount);
  };

  return (
    <form
      className="flex flex-col justify-center items-center bg-white/70 text-dark py-4 px-8 rounded-md mx-4 w-[250px]"
      onSubmit={e => handleSubmit(e)}
    >
      <h1 className="text-2xl font-bold">Order an Item</h1>
      <div className="bg-dark rounded-md p-2 mt-4 shadow-blkSm">
        <ClothesIcon clothes={clothes} />
      </div>
      <div className="w-full flex justify-between items-center">
        <select
          className="text-dark mt-4 p-1 w-[45%] text-center rounded-md"
          value={clothes}
          onChange={e => {
            setClothes(e.target.value as Clothes);
          }}
        >
          {itemOptions.map(item => {
            return (
              <option key={nanoid()} value={item} className="capitalize">
                {item}
              </option>
            );
          })}
        </select>
        <select
          className="text-dark mt-4 p-1 w-[45%] text-center rounded-md"
          value={amount}
          onChange={e => {
            setAmount(+e.target.value);
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(amount => {
            return (
              <option key={nanoid()} value={amount} className="capitalize">
                {amount}
              </option>
            );
          })}
        </select>
      </div>
      <button className="bg-blue-400 py-2 px-4 rounded-md hover:shadow-blkSm hover:scale-110 transition-all mt-4 w-full">
        Create Order
      </button>
    </form>
  );
};

export default CreateOrderForm;
