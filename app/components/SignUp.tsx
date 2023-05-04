/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/Home.scss';

const { ipcRenderer } = window.require('electron');

const SignUp:React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { setUser } = useContext(DashboardContext);
  const [failedSignUp, setFailedSignUp] = useState<JSX.Element>(<>hey</>);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(e: any) {
    e.preventDefault();
    const inputFields = e.currentTarget.querySelectorAll('input');
    const username = inputFields[0].value;
    const email = inputFields[1].value;
    const password = inputFields[2].value;
    const confirmPassword = inputFields[3].value;
    // setUsername(inputFields[0].value);
    // setEmail(inputFields[1].value);
    // setPassword(inputFields[2].value);
    // setConfirmPassword(inputFields[3].value);



    // eslint-disable-next-line no-return-assign
    inputFields.forEach(input => (input.value = ''));

    if (!password) {
      setFailedSignUp(<p>Please enter valid password</p>)
      return;
    }
    if (password !== confirmPassword) {
      setFailedSignUp(<p>Entered passwords do not match</p>);
      return;
    }

    ipcRenderer.invoke('addUser', { username, email, password})
      .then((message) => {
        console.log('message', message)
        if (message === false) {
          setFailedSignUp(<p>Sorry, your sign up failed. Please try a different username or email</p>)
        } else {
          console.log('in frontend', username)
          setUser(username);
          navigate('/');
        }
      }).catch(error => {
      console.error('Failed to sign up:', error);
      setFailedSignUp(<p>Sorry, your sign up failed. Please try again later</p>);
    });
    
  };

  return (
    <div className="home">
      <div className="welcome" data-testid="SignUp">
        <h1 className="welcomeMessage">Welcome to Chronos!</h1>
        <h2>Your all-in-one application monitoring tool.</h2>

        <form className="form" onSubmit={handleSubmit}>
          <label className="username">
            <input type="text" name="username" id="username" placeholder="enter username" />
          </label>
          <label className="email">
            <input type="email" name="email" id="email" placeholder="your@email.here" />
          </label>
          <label className="password">
            <input type="password" name="password" id="password" placeholder="enter password" />
          </label>
          <label className="passwordConfirm">
            <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="confirm password" />
          </label>
          {failedSignUp}
          <button className="link" role="signup" id="submitBtn" type="submit">
            Sign Up
          </button>
          <button className="link needAccount" onClick={() => navigate('/login')}>
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );

  

});

export default SignUp;
