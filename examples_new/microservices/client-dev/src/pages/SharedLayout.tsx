import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const SharedLayout = () => {
  return (
    <main
      className="w-full h-screen max-h-[100vh]
      flex flex-col justify-center items-center
      bg-dark text-light"
    >
      <Header />
      <Outlet />
    </main>
  );
};

export default SharedLayout;
