import { FormEvent, useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Login = () => {
  const { isLoading, user, loginUser } = useAppContext();
  const username = 'ScrumLord';
  const password = 'McKenzie';
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user]);

  if (isLoading) return <Loading />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    if (username !== 'ScrumLord' || password !== 'McKenzie') return;

    loginUser(username, password);
  };

  const makeLabel = (text: string, htmlFor: string) => {
    return (
      <label className="text-xl capitalize" htmlFor={htmlFor}>
        {text}
      </label>
    );
  };

  const makeInput = (type: string, id: string, value: string) => {
    return (
      <input
        value={value}
        readOnly
        className="text-dark mb-2 min-w-[250px] p-1 border-2 border-black text-center"
        type={type}
        id={id}
      />
    );
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center
      bg-dark text-light"
    >
      <div className="relative">
        <div
          className="absolute top-[-50px] right-[-50px]
          w-[100px] h-[100px]
          rounded-tl-[150px] rounded-tr-[120px]
          rounded-bl-[130px] rounded-br-[200px]
          shadow-blkSm animate-rotate1
          bg-amber-500"
        ></div>
        <div
          className="absolute bottom-[-50px] left-[-50px]
          w-[100px] h-[100px]
          rounded-tl-[620px] rounded-tr-[420px]
          rounded-bl-[500px] rounded-br-[530px]
          shadow-blkSm animate-rotate2
          bg-lime-600"
        ></div>
        <form
          onSubmit={e => handleSubmit(e)}
          className="flex flex-col justify-center items-center relative
          px-20 py-10 ring-1 ring-black/5 bg-white/20 backdrop-blur-lg
          rounded-md
          shadow-blkSm"
        >
          <div></div>
          {makeLabel('username', 'username')}
          {makeInput('text', 'username', 'ScrumLord')}
          {makeLabel('password', 'password')}
          {makeInput('password', 'password', 'McKenzie')}
          <button
            className="my-4 px-8 py-2
            rounded-md shadow-blkSm
            bg-blue-400/50 font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
