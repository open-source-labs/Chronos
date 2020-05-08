import React, {useState} from 'react';
import ServiceOverview from '../components/ServiceOverview.jsx';
import Adr from '../newcomp/adrBut.jsx';

const Services = (context) => {
  // Used to hold the buttons created for each database found in context.
  const [serviceSelected, setSelection] = useState();
  const buttonStore = [];
  for (let i = 0; i < context.length; i += 1) {
      buttonStore.push(
        <button
          className="microserviceBtn"
          type="button"
          key={`${i}${context[i]}`}
          onClick={() => {
            setSelection(<ServiceOverview index={i} />);
          }}
        >
          {context[i]}
        </button>,
      );
    }
    return buttonStore;
}

export default Services;