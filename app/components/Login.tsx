/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const { ipcRenderer } = window.require('electron');

const Login = React.memo(() => {
  const navigate = useNavigate();
  const { setUser } = useContext(DashboardContext);
  const [failedAuth, setFailedAuthState] = useState<JSX.Element>(<></>);

  /** From Version 5.2 Team:
   * Function that will be called when the form button is clicked
   * It handles submitting the login information
   */

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputFields: HTMLInputElement[] = e.currentTarget.querySelectorAll('input');
    const username = inputFields[0].value;
    const password = inputFields[1].value;
    // eslint-disable-next-line no-return-assign
    inputFields.forEach(input => (input.value = ''));
    const validLogin: boolean = ipcRenderer.sendSync('login', { username, password });
    if (validLogin) {
      setUser(username);
      navigate('/');
    } else {
      setFailedAuthState(<p>Sorry your authentication failed please try again.</p>);
    }
  };

  return (
    <div className="home">
      <div className="welcome" data-testid="Login">
        <h1>Welcome to Chronos!</h1>
        <h2>Please enter your credentials to login.</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor='username'>
            <input type="text" name="username" id="username" placeholder="username" />
          </label>
          <label htmlFor='password'>
            <input type="password" name="password" id="password" placeholder="password" />
          </label>
          {failedAuth}
          <button className="link" id="submitBtn" type="submit">
            Login
          </button>
          <button className="link needAccount" onClick={() => navigate('/signup')}>
            Need an account?
          </button>
        </form>
      </div>
    </div>
  );
});

export default Login;
