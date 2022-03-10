/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import '../stylesheets/Contact.scss';
import { DashboardContext } from '../context/DashboardContext';
import lightAndDark from './Styling';

const Contact = React.memo(() => {
  const { mode } = useContext(DashboardContext);

  const currentMode =
    mode === 'light mode' ? lightAndDark.lightModeText : lightAndDark.darkModeText;

  return (
    <div className="contact">
      <div className="contact-border" data-testid="contactPage">
        <div className="contact-container">
          <div className="contact-blurb">
            <h1 style={currentMode}>Contact Us</h1>
            <br />
            <p style={currentMode}>
              Please feel free to provide any feedback, concerns, or comments.
            </p>
            <p style={currentMode}>
              You can find issues the team is currently working on{' '}
              <a
                style={currentMode}
                id="issueLink"
                href="https://github.com/open-source-labs/Chronos/issues"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="email-container">
          <form>
            <label style={currentMode} htmlFor="fname">
              First Name:
              <input type="text" id="fname" name="firstname" placeholder="Your name.." />
            </label>
            <label style={currentMode} htmlFor="lname">
              Last Name:{' '}
              <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
            </label>
            <label style={currentMode} htmlFor="email">
              E-mail:
              <input type="text" id="email" name="email" placeholder="Your e-mail address.." />
            </label>
            <label style={currentMode} htmlFor="subject">
              Subject:
              <input type="text" id="subject" name="subject" placeholder="Subject" />
            </label>
            <label style={currentMode} id="messageLabel" htmlFor="message">
              Message:{' '}
              <span>
                <textarea id="message" name="message" placeholder="Write something.." />
              </span>
            </label>

            <label style={currentMode} htmlFor="myfile">
              Select a file:{' '}
              <input style={currentMode} type="file" id="myfile" name="myfile" accept="image/*" />
            </label>
            <input style={currentMode} id="contact-submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
});

export default Contact;
