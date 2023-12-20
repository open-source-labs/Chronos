import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <main
      className="w-full h-screen max-h-[100vh]
      flex flex-col justify-center items-center
      bg-dark text-light"
    >
      <Outlet />
    </main>
  );
};

export default SharedLayout;
