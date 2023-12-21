import { FormEvent, useState } from 'react';
import { GiGrapes, GiBananaBunch, GiStrawberry } from 'react-icons/gi';
import { Fruit } from '../util/types';
import { useAppContext } from '../context/appContext';
import { nanoid } from 'nanoid';

const fruitOptions = ['bananas', 'strawberries', 'grapes'];

const CreateItemForm = () => {
  const { items, createItem } = useAppContext();
  const itemOptions = fruitOptions.filter(fruit => {
    return items.findIndex(item => item.itemName === fruit) < 0;
  });
  const [fruit, setFruit] = useState<Fruit>(itemOptions[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO
    // SEND REQUEST TO CREATE ITEM
    createItem(fruit);
  };

  const fruitIcon = () => {
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

  return (
    <form
      className="flex flex-col justify-center items-center bg-white/70 text-dark py-4 px-8 rounded-md"
      onSubmit={e => handleSubmit(e)}
    >
      <h1 className="text-2xl font-bold">Create an Item</h1>
      <div className="bg-dark rounded-md p-2 mt-4 shadow-blkSm">{fruitIcon()}</div>
      <select
        className="text-dark mt-4 p-1 w-full text-center rounded-md"
        defaultValue={itemOptions[0]}
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
