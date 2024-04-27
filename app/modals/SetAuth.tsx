import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { TModalSetter } from '../components/Occupied/types/Occupied';

const SetAuthModal: React.FC<TModalSetter> = React.memo(({ setModal }) => {
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
          <button 
            onClick={() => setModal({isOpen:false,type:''})}
          >
            Cancel
          </button>
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
