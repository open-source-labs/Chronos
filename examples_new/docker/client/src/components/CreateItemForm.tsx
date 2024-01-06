import { FormEvent, useState } from 'react';
import { Fruit } from '../util/types';
import { useAppContext } from '../context/appContext';
import { nanoid } from 'nanoid';
import FruitIcon from './FruitIcon';

const itemOptions = ['bananas', 'strawberries', 'grapes'];

const CreateItemForm = () => {
  const { items, createItem } = useAppContext();
  const [fruit, setFruit] = useState<Fruit>('bananas');

  console.log(items);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO
    // SEND REQUEST TO CREATE ITEM
    createItem(fruit);
  };

  return (
    <form
      className="flex flex-col justify-center items-center bg-white/70 text-dark py-4 px-8 rounded-md"
      onSubmit={e => handleSubmit(e)}
    >
      <h1 className="text-2xl font-bold">Create an Item</h1>
      <div className="bg-dark rounded-md p-2 mt-4 shadow-blkSm">
        <FruitIcon fruit={fruit} />
      </div>
      <select
        className="text-dark mt-4 p-1 w-full text-center rounded-md"
        value={fruit}
        onChange={e => {
          setFruit(e.target.value as Fruit);
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
      <button className="bg-blue-400 py-2 px-4 rounded-md hover:shadow-blkSm hover:scale-110 mt-4 w-full">
        Create Item
      </button>
    </form>
  );
};

export default CreateItemForm;
