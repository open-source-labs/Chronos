/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState, useCallback } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/AddsModal.scss';

const { ipcRenderer } = window.require('electron');

interface AddsModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddsModal: React.FC<AddsModalProps> = React.memo(({ setOpen }) => {
  const { user } = useContext(DashboardContext);
  const [, setState] = useState<{}>();

  // Handle form changes
  const forceUpdate = useCallback(() => setState({}), []);
  const getAccessLevel = () => {
    if (user.admin) return 'ACCESS LEVEL: ADMIN';
    return 'ACCESS LEVEL: OBSERVER';
  };

  const approveAccount = (userEmail: string) => {
    const success = ipcRenderer.sendSync('approveAccount', userEmail);
    if (success) forceUpdate();
    else window.alert('Error in AddsModal approveAccount');
  };

  const accountsAwaitingApproval = () => {
    if (!user.admin) return <></>;
    if (!user.admin) return <br />;
    const usersObj = ipcRenderer.sendSync('getUsersAwaitingApproval');
    const listItems: Array<JSX.Element> = [];
    for (const pleb in usersObj) {
      listItems.push(
        <li key={pleb}>
          <span>
            <div>
              <span className="label">Email:</span> {usersObj[pleb].email}{' '}
            </div>
            <div>
              <span className="label">Username:</span> {usersObj[pleb].username}
            </div>
          </span>
          <button onClick={() => approveAccount(pleb)}>Approve</button>
        </li>
      );
    }
    if (!listItems.length) listItems.push(<h3>NO CURRENT REQUESTS</h3>);
    return (
      <div id="approvalList">
        <h3>ACCOUNTS AWAITING APPROVAL:</h3>
        <ul>{listItems}</ul>
      </div>
    );
  };

  return (
    <div className="add-container">
      <div className="add-header">
        <div>
          <h2>Welcome Back {user.username}</h2> <PersonIcon className="navIcon" id="personIcon" />
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <label htmlFor="db-uri">
              <span />
            </label>
          </div>
          <label htmlFor="db-name">
            <h3>{getAccessLevel()}</h3>
          </label>
          <br />
          <label htmlFor="db-name">{accountsAwaitingApproval()}</label>
          <div />
          <button onClick={() => setOpen(false)}>Cancel</button>
          <br />
          <button className="link" onClick={() => location.replace('/')}>
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
});

export default AddsModal;
