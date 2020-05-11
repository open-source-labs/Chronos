import React from 'react';

const Extras = (props) => {
  const { AddClick, DeleteClick, RefreshClick } = props;
  return (
    <>
      <div className="left-bottom">
        <button
          className="overviewSubmitBtn"
          type="submit"
          key="BackToStart"
          onClick={AddClick}
        >
          Add Database
        </button>
        <button
          className="overviewSubmitBtn"
          type="submit"
          key="goToDeletePage"
          onClick={DeleteClick}
        >
          Delete Database
        </button>
      </div>
      <div className="left-bottom">
        <button
          className="overviewSubmitBtn"
          type="submit"
          onClick={RefreshClick}
        >
          Refresh overview
        </button>
      </div>
    </>
  );
};

export default Extras;
