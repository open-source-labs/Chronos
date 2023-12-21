import CreateItemForm from '../components/CreateItemForm';
import ItemList from '../components/ItemList';
import { useAppContext } from '../context/appContext';

const Home = () => {
  const { items } = useAppContext();
  return (
    <div className="flex flex-col justify-center items-center">
      <CreateItemForm />
      {items.length > 0 && <ItemList />}
    </div>
  );
};

export default Home;
