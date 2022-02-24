import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const { ipcRenderer } = window.require('electron');

const Login = React.memo(() => {
  const history = useHistory();
  const { updateLandingPage, setAuth, setUser } = useContext(DashboardContext);

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
    else {
      window.alert('Authentication failed please try again');
      history.push('/');
    }
  };

  return (
    <div className="home">
      <p>Welcome to Chronos. Please enter your credentials to login</p>

      <form className="form" onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="login">
          <input type="email" name="email" id="email" placeholder="your@email.here" />
          <br />
          <input type="password" name="password" id="password" placeholder="enter password" />
          <hr />
        </label>
        <br />
        <br />
        <br />
        <button className="link" id="submitBtn" type="submit">
          Login
        </button>
      </form>

      <br />
      <button className="link" onClick={() => updateLandingPage('signUp')}>
        Need an account?
      </button>
    </div>
  );
});
// alert("Log In credentials are wrong!\n\n (\\__/) \n (='.'=) \n('')__('')");

export default Login;
