import { FormEvent, useState } from 'react';
import { GiGrapes, GiBananaBunch, GiStrawberry } from 'react-icons/gi';

type Fruit = 'bananas' | 'strawberries' | 'grapes';

const Home = () => {
  const [fruit, setFruit] = useState<Fruit>('bananas');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO
    // SEND REQUEST TO CREATE ITEM
    console.log('🍌 Create Item');
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
    <div className="flex flex-col justify-center items-center">
      <form
        className="flex flex-col justify-center items-center bg-white/70 text-dark py-4 px-8 rounded-md"
        onSubmit={e => handleSubmit(e)}
      >
        <h1 className="text-2xl font-bold">Create an Item</h1>
        <div className="bg-dark rounded-md p-2 mt-4 shadow-blkSm">{fruitIcon()}</div>
        <select
          className="text-dark mt-4 p-1 w-full text-center rounded-md"
          value={fruit}
          onChange={e => {
            setFruit(e.target.value as Fruit);
          }}
        >
          <option value="bananas">Banana</option>
          <option value="strawberries">Strawberries</option>
          <option value="grapes">Grapes</option>
        </select>
        <button className="bg-blue-400 py-2 px-4 rounded-md hover:shadow-blkSm hover:scale-110 mt-4 w-full">
          Create Item
        </button>
      </form>
    </div>
  );
};

export default Home;
