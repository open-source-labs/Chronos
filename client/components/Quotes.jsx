import React from 'react';

import '../stylesheets/Quotes.scss';
import Dave from '../assets/Dave.jpg';

const Quotes = () => (
  <div className="quote-container">
    <img id="dave-img" alt="none" src={Dave} />
    <p>
      "The application is incredibly responsive. Wonderful stuff, a lot of work
      has been done here."
    </p>
  </div>
);

export default Quotes;
