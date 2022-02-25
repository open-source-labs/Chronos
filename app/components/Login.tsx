import React, { useContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const { ipcRenderer } = window.require('electron');

const Login = React.memo(() => {
  const history = useHistory();
  const { updateLandingPage, setAuth, setUser } = useContext(DashboardContext);
  const [, setState] = useState<{}>();

  const forceUpdate = useCallback(() => setState({}), []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputFields = e.currentTarget.querySelectorAll('input');
    const email = inputFields[0].value;
    const password = inputFields[1].value;
    const validLogin:
      | boolean
      | string
      | {
          email: string;
          username: string;
          password: string;
          admin: boolean;
          awaitingApproval: boolean;
        } = ipcRenderer.sendSync('verifyUser', { email, password });
    if (typeof validLogin === 'object') {
      setUser(validLogin);
      setAuth(true);
      history.push('/applications');
    } else if (validLogin === 'awaitingApproval') history.push('/awaitingApproval');
    else forceUpdate();
  };

  return (
    <div className="home">
      <div className="welcome">
        <h1>Welcome to Chronos!</h1>
        <h2>Please enter your credentials to login.</h2>
        <form className="form" onSubmit={handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="email">
            <input type="email" name="email" id="email" placeholder="your@email.here" />
          </label>
          <label className="password">
            <input type="password" name="password" id="password" placeholder="enter password" />
          </label>
          <button className="link" id="submitBtn" type="submit">
            Login
          </button>
          <button className="link needAccount" onClick={() => updateLandingPage('signUp')}>
            Need an account?
          </button>
        </form>
      </div>
    </div>
  );
});
// alert("Log In credentials are wrong!\n\n (\\__/) \n (='.'=) \n('')__('')");

export default Login;
