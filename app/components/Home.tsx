// import { faGlassMartiniAlt } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
import React from 'react';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

import '../stylesheets/Home.scss';

// const { ipcRenderer } = window.require('electron');

interface PersonProps {
  email: string;
  password: string;
}

// type ClickEvent = React.MouseEvent<HTMLElement>;

// const [email] = React.useState<string>('');
// const [password] = React.useState<string>('');
// function handleChange(e) {

// }
const adminUser = {
  email: 'admin@admin.com',
  password: 'admin123',
};

// removed props as it was not being used
const Home = React.memo(() => {
  // const [open, setOpen] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = React.useState<PersonProps>({
    email: '',
    password: '',
  });

  function myFunction() {
    location.replace('/applications');
  }
  // function pageRedirect() {
  //   setTimeout(() => {
  //     window.location.href = '/applications';
  //   }, 5000);
  // }

  function submitLogin(e: any) {
    e.preventDefault();
    // check local state if the username is there
    if (loginInfo.email === adminUser.email && loginInfo.password === adminUser.password) {
      myFunction();
      // alert('Welcome Back!\n\n (\\__/) \n (=\'.\'=) \n(\'\')__(\'\')')
      // //  pageRedirect();
      // //  "window.location='/applications'"
    } else alert("Log In credentials are wrong!\n\n (\\__/) \n (='.'=) \n('')__('')");
  }
  // function checkLoginStatus() {
  //   // axios('http://localhost:3000/loggedIn', {withCredentials: true})
  // }

  return (
    <div className="home">
      <p className="welcomeMessage">
        Welcome Back To Chronos! Your all-in-one application monitoring tool
      </p>

      <form className="form" onSubmit={submitLogin}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="login">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.here"
            onChange={e => setLoginInfo({ ...loginInfo, email: e.target.value })}
          />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })}
          />
          <hr />
        </label>
        <br />
        <br />
        <br />
        <button className="link" id="submitBtn" type="submit" onClick={() => true}>
          Log In
        </button>
      </form>

      <br />
      {/* <Link className="link" to="/applications">
        Get Started
      </Link> */}
    </div>
  );
});

export default Home;
