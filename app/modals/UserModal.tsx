/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import { DashboardContext } from '../context/DashboardContext';
import { guestUser } from '../context/helpers';
import '../stylesheets/UserModal.scss';
import { Button } from '@material-ui/core';

const { ipcRenderer } = window.require('electron');

interface UserModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal: React.FC<UserModalProps> = React.memo(({ setOpen }) => {
  const { user, setUser } = useContext(DashboardContext);

  const navigate = useNavigate();
  
  return (
    <div className="add-container">
      <div className="add-header">
        <div>
          <h2>Hello {user.username}</h2> <PersonIcon className="navIcon" id="personIcon" />
        </div>
        {user.username === 'guest' ?
        <>
          <Button variant="contained" onClick={() => navigate('/login')}>Log In</Button>
          <br></br><br></br>
          <Button variant="contained" onClick={() => navigate('/signup')}>Sign Up</Button>
          <br></br><br></br>
        </>
        :
        <>
          <Button variant="contained" onClick={handleSignout}>Log Out</Button>
          <br></br><br></br>
        </>

        }
        <Button variant="contained" onClick={() => setOpen(false)}>Exit</Button>
      </div>
    </div>
  );

  function handleSignout() {
    setUser(guestUser);
    ipcRenderer.sendSync('signOut');
    setOpen(false);
  }
});

export default UserModal;
