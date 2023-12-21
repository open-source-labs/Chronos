import { nanoid } from 'nanoid';
import Item from '../components/Item';
import { testItems } from '../util/testData';
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';

const Home = () => {
  const { user, getItemsForSale } = useAppContext();

  useEffect(() => {
    if (user) {
      getItemsForSale();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl bg-light text-dark rounded-md px-4 py-2">Items for Sale</h1>
      <div className="flex flex-wrap gap-4 w-[85%] mt-8">
        {testItems.map(item => (
          <Item key={nanoid()} itemId={item.itemId} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default Home;
