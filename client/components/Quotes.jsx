import React from 'react';

import '../stylesheets/Quotes.scss';
import Dave from '../assets/Dave.jpg';

const Quotes = () => (
  <div className="section-quotes">
    <div className="quote-container">
      <img id="dave-img" alt="none" src={Dave} />
      <div className="quote-content">
      <p>
        <em>"The application is incredibly responsive. Wonderful stuff, a lot of work has been done
        here."</em>
      </p>
      <p>- Dave O'Sullivan</p>
      </div>
    </div>
  </div>
);

export default Quotes;
