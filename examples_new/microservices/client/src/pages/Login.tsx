import { useState } from 'react';
import { useAppContext } from '../context/appContext';

const Login = () => {
  const { loginUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!username || !password) return;
    if (!isLogin && (!passwordConfirm || password !== passwordConfirm)) return;

    loginUser(username, password, isLogin);

    setUsername('');
    setPassword('');
    setPasswordConfirm('');
  };

  const makeLabel = (text: string, htmlFor: string) => {
    return (
      <label className="text-xl capitalize" htmlFor={htmlFor}>
        {text}
      </label>
    );
  };

  const makeInput = (type: string, id: string, value: string, onChange: (e: string) => void) => {
    return (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        className="text-dark mb-2 min-w-[250px] p-1 border-2 border-black"
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
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center relative
          px-20 py-10 ring-1 ring-black/5 bg-white/20 backdrop-blur-lg
          rounded-md
          shadow-blkSm"
        >
          <div></div>
          {makeLabel('username', 'username')}
          {makeInput('text', 'username', username, setUsername)}
          {makeLabel('password', 'password')}
          {makeInput('password', 'password', password, setPassword)}
          {!isLogin && (
            <>
              {makeLabel('confirm password', 'passwordConfirm')}
              {makeInput('password', 'passwordConfirm', passwordConfirm, setPasswordConfirm)}
            </>
          )}
          <button
            className="my-4 px-8 py-2
            rounded-md shadow-blkSm
            bg-blue-400/50 font-bold"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
          <p>
            {isLogin ? 'Not' : 'Already'} a member?{' '}
            <span className="text-blue-400" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Signup' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
