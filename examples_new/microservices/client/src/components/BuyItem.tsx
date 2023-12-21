import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { ItemDetails } from '../util/types';

const BuyItem = () => {
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [amount, setAmount] = useState(1);
  const { getItemInventory } = useAppContext();
  const { itemId } = useParams();
  console.log(itemId);
  console.log(item);

  useEffect(() => {
    const itemData = getItemInventory(itemId);
    setItem(itemData);
    // eslint-disable-next-line
  }, [item]);

  // TODO replace with real inventory number
  const inventory = 20;
  console.log('Amount', amount);

  const buildSelect = () => {
    const options = [];
    for (let i = 1; i <= inventory; i++) {
      options.push(
        <option key={nanoid()} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div>
      <select
        className="bg-light text-dark p-1 rounded-md w-full text-center mt-4"
        value={amount}
        onChange={e => setAmount(+e.target.value)}
        name="amount-select"
      >
        {buildSelect()}
      </select>
    </div>
  );
};

export default BuyItem;
