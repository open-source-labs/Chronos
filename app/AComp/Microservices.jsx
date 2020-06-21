import React from 'react';
import '../stylesheets/Microservices.css';

const Microservices = ({ context, Click }) => {
  // const { context, Click, clicked } = props;
  const buttonStore = [];
  for (let i = 0; i < context.length; i += 1) {
    buttonStore.push(
      <button
        className="microserviceBtn"
        id={i}
        type="button"
        key={`${i}${context[i]}`}
        onClick={Click}
      >
        {context[i]}
      </button>
    );
  }
  return buttonStore;
};

export default Microservices;
