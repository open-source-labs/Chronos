import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/Home.scss';

const { ipcRenderer } = window.require('electron');

const SignUp = React.memo(() => {
  const history = useHistory();
  const { updateLandingPage, setAuth, setUser } = useContext(DashboardContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputFields = e.currentTarget.querySelectorAll('input');
    const username = inputFields[0].value;
    const email = inputFields[1].value;
    const password = inputFields[2].value;

    const validSignUp:
      | boolean
      | {
          email: string;
          username: string;
          password: string;
          admin: boolean;
          awaitingApproval: boolean;
        } = ipcRenderer.sendSync('addUser', { email, username, password });
    if (typeof validSignUp === 'object') {
      setUser(validSignUp);
      setAuth(true);
      history.push('/applications');
    } else if (validSignUp) history.push('/awaitingApproval');
    else window.alert('Sorry your sign up cannot be completed at this time. Please try again.');
  };

  return (
    <div className="home">
      <div className="welcome">
        <h1 className="welcomeMessage">Welcome back to Chronos!</h1>
        <h2>Your all-in-one application monitoring tool.</h2>

        <form className="form" onSubmit={handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="username">
            <input type="text" name="username" id="username" placeholder="enter username" />
          </label>
          <label className="email">
            <input type="email" name="email" id="email" placeholder="your@email.here" />
          </label>
          <label className="password">
            <input type="password" name="password" id="password" placeholder="enter password" />
          </label>

          <button className="link" id="submitBtn" type="submit">
            Sign Up
          </button>
          <button className="link needAccount" onClick={() => updateLandingPage('login')}>
            Already have an account?
          </button>
        </form>
      </div>

      {/* <Link className="link" to="/applications">
        Get Started
      </Link> */}
    </div>
  );
});

export default SignUp;
