import React, { useContext } from 'react';
import './styles.scss';
import { DashboardContext } from '../../context/DashboardContext';
import lightAndDark from '../Styling';
import ContactForm from './ContactForm';

const Contact: React.FC = React.memo(() => {
  const { mode } = useContext(DashboardContext);

  const currentMode = mode === 'light' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  return (
    <div className="contact" style={currentMode}>
      <div className="contact-border" data-testid="contactPage">
        <div className="contact-container">
          <div className="contact-blurb">
            <h1>Contact Us</h1>
            <br />
            <p>Please feel free to provide any feedback, concerns, or comments.</p>
            <p>You can find issues the team is currently working on  <span></span>
              <a id="issueLink" href="https://github.com/open-source-labs/Chronos/issues" target="_blank" rel="noreferrer">
                here
              </a>.
            </p>
          </div>
        </div>
        <ContactForm currentMode={currentMode}/>
      </div>
    </div>
  );
});

export default Contact;