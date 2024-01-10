import { useEffect } from 'react';
import CreateItemForm from '../components/CreateItemForm';
import { useAppContext } from '../context/appContext';

const Home = () => {
  const { getAllItems } = useAppContext();

  useEffect(() => {
    // getAllItems();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <CreateItemForm />
    </div>
  );
};

export default Home;
