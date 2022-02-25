import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const { ipcRenderer } = window.require('electron');

const CreateAdmin = React.memo(() => {
  const { updateLandingPage } = useContext(DashboardContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const inputFields = e.currentTarget.querySelectorAll('input');
    const email = inputFields[0].value;
    const username = inputFields[1].value;
    const password = inputFields[2].value;

    const validSignUp = ipcRenderer.sendSync('addUser', { email, username, password });
    if (validSignUp) {
      window.alert(
        'Your admin account has been created. Use this account to approve other accounts.'
      );
      updateLandingPage('login');
    } else window.alert('Sorry your sign up cannot be completed at this time. Please try again.');
  };

  return (
    <div className="home">
      <p className="welcomeMessage">Welcome to Chronos! Please create your admin account.</p>
      <br />
      <br />
      <form className="form" onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="login">
          <input type="email" name="email" id="email" placeholder="your@email.here" />
          <br />
          <input type="text" name="username" id="username" placeholder="enter username" />
          <br />
          <input type="password" name="password" id="password" placeholder="enter password" />
          <hr />
        </label>
        <br />
        <br />
        <br />
        <button className="link" id="submitBtn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
});

export default CreateAdmin;
