import React from 'react';
import '../stylesheets/overviewSubmit.css';


const Extras = (props) => {
  const { AddClick, DeleteClick, RefreshClick } = props;
  return (
    <div className="left-bottom">
      <button
        className="overviewSubmitBtn"
        type="submit"
        key="BackToStart"
        onClick={AddClick}
      >
        +
      </button>
      <button
        className="overviewSubmitBtn"
        type="submit"
        key="goToDeletePage"
        onClick={DeleteClick}
      >
        -
      </button>
      <button
        className="overviewSubmitBtn"
        type="submit"
        onClick={RefreshClick}
      >
        Refresh
      </button>
    </div>
  );
};

export default Extras;
