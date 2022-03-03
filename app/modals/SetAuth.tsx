import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetAuthModal: React.FC<Props> = React.memo(({ setOpen }) => {
  const { updateLandingPage } = useContext(DashboardContext);
  const handleClick = () => {
    updateLandingPage('createAdmin');
    location.replace('/');
  };

  return (
    <div className="add-container">
      <div className="add-header">
        <div>
          <h2>Welcome Back</h2>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <br />
          <div />
          <button onClick={() => setOpen(false)}>Cancel</button>
          <br />
          <button className="link" onClick={handleClick}>
            Add Authentication
          </button>
        </form>
      </div>
    </div>
  );
});

export default SetAuthModal;
