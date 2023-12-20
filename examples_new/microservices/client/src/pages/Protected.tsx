import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Loading from '../components/Loading';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Protected = ({ children }: Props) => {
  const { username, isLoading } = useAppContext();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username]);

  return children;
};

export default Protected;
