/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const { ipcRenderer } = window.require('electron');

const Login = React.memo(() => {
  const history = useHistory();
  const { updateLandingPage, setAuth, setUser } = useContext(DashboardContext);
  const [failedAuth, setFailedAuthState] = useState<JSX.Element>(<></>);

  /** From Version 5.2 Team:
   * Function that will be called when the form button is clicked
   * It handles submitting the login information
   */

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputFields: HTMLInputElement[] = e.currentTarget.querySelectorAll('input');
    const email = inputFields[0].value;
    const password = inputFields[1].value;
    // eslint-disable-next-line no-return-assign
    inputFields.forEach(input => (input.value = ''));
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
    else setFailedAuthState(<p>Sorry your authentication failed please try again.</p>);
  };

  return (
    <div className="home">
      <div className="welcome" data-testid="Login">
        <h1>Welcome to Chronos!</h1>
        <h2>Please enter your credentials to login.</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label className="email">
            <input type="email" name="email" id="email" placeholder="your@email.here" />
          </label>
          <label className="password">
            <input type="password" name="password" id="password" placeholder="enter password" />
          </label>
          {failedAuth}
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

export default Login;
