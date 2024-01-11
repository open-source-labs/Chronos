import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Protected = ({ children }: Props) => {
  const { user, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [user]);

  if (isLoading) {
    return (
      <>
        <Loading />
        {children}
      </>
    );
  }

  return children;
};

export default Protected;
