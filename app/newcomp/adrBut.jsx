import React from 'react';
import AddService from '../components/AddService.jsx';
import DeleteService from '../components/DeleteService.jsx';

const Adr = (props) => {
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  return (
    <div className="left-bottom">
      <button
        className="overviewSubmitBtn"
        type="submit"
        key="BackToStart"
        onClick={() => {
          setup.setupRequired = setup.toggleSetup(false);
          setSelection(<AddService />);
        }}
      >
        Add Database
      </button>
      <button
        className="overviewSubmitBtn"
        type="submit"
        key="goToDeletePage"
        onClick={() => {
          setSelection(<DeleteService />);
        }}
      >
        Delete Database
      </button>
      <div className="left-bottom">
        <button
          className="overviewSubmitBtn"
          type="submit"
          onClick={() => {
            location.reload();
          }}
        >
          Refresh overview
        </button>
      </div>
    </div>
  );
};

export default Adr;
