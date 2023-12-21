
import { Link } from 'react-router-dom';

type Props = {
  itemId: string;
  name: string;
  price: number;
};

const Item = ({ itemId, name, price }: Props) => {

  return (
    <div
      className="flex flex-col justify-center items-center bg-white/30
      border-2 w-36 rounded-md px-6 py-4"
    >
      <h1 className="font-bold text-xl">{name}</h1>
      <p className="mt-4 text-xs">price</p>
      <p className="bg-dark w-full text-center rounded-sm py-1">${price}</p>
      
      <Link
        to={`/${itemId}`}
        className="bg-blue-400 text-dark rounded-sm w-full mt-4
        text-center font-semibold hover:shadow-blkSm hover:scale-110
        cursor-pointer"
      >
        Buy
      </Link>
    </div>
  );
};

export default Item;
