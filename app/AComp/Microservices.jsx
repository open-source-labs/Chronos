import React from 'react';
import '../stylesheets/Microservices.css';


const Microservices = (props) => {
  const { context, Click, isclicked } = props;
  const buttonStore = [];
  for (let i = 0; i < context.length; i += 1) {
    buttonStore.push(
      <button
        className="microserviceBtn"
        id={i}
        type="button"
        key={`${i}${context[i]}`}
        onClick={Click}
        isclicked={isclicked}
      >
        {context[i]}
      </button>
    );
  }
  return (
    buttonStore
  );
};

export default Microservices;
