/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const { ipcRenderer } = window.require('electron');

const CreateAdmin = React.memo(() => {
  const { updateLandingPage } = useContext(DashboardContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputFields = e.currentTarget.querySelectorAll('input');
    const username = inputFields[0].value;
    const email = inputFields[1].value;
    const password = inputFields[2].value;

    const validSignUp = ipcRenderer.sendSync('addUser', { email, username, password });
    if (validSignUp) updateLandingPage('login');
    else window.alert('Sorry your sign up cannot be completed at this time. Please try again.');
  };

  return (
    <div className="home">
      <div className="welcome" data->
        <h1 className="welcomeMessage">Welcome to Chronos!</h1>
        <h2>Please create your admin account.</h2>
        <form className="form" onSubmit={handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="username">
            <input type="text" name="username" id="username" placeholder="enter username" />
          </label>
          <label htmlFor="" className="email">
            <input type="email" name="email" id="email" placeholder="your@email.here" />
          </label>
          <label htmlFor="" className="password">
            <input type="password" name="password" id="password" placeholder="enter password" />
          </label>

          <button className="link" id="submitBtn" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
});

export default CreateAdmin;
