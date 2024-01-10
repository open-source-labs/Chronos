import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const PageLinks = () => {
  const { items, orders } = useAppContext();

  const createLink = (route: string, text: string, count: number) => {
    return (
      <Link
        to={route}
        className="w-[250px] text-2xl font-bold text-center hover:font-bold relative border-2 rounded-md py-2 px-3 mx-4 hover:scale-105 transition-all"
      >
        {text}
        <div className="shadow-insetDbl"></div>
        {count > 0 && (
          <div className="w-5 h-5 flex flex-col justify-center items-center text-sm bg-green-500 rounded-full absolute top-[-10px] right-[-10px] z-50">
            <p className="font-bold m-0">{count}</p>
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="flex justify-end items-center">
      {createLink('/items', 'Items', items.length)}
      {createLink('/orders', 'Orders', orders.length)}
    </div>
  );
};

export default PageLinks;
