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
      <div className="contact-border">
        <div className="contact-container">
          <div className="contact-blurb">
            <h1 style={currentMode}>Contact Us</h1>
            <br />
            <p style={currentMode}>
              Please feel free to provide any feedback, concerns, or comments.
            </p>
            <p style={currentMode}>
              You can find issues the team is currently working on&nbsp;
              <a
                style={currentMode}
                id="issueLink"
                href="https://github.com/open-source-labs/Chronos/issues"
                target="_blank"
                // added rel="noreferrer", security risk if using target="_blank" without rel="noreferrer"
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
              First Name: &nbsp;
            </label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.." />
            <br />
            <label style={currentMode} htmlFor="lname">
              Last Name: &nbsp;
            </label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
            <br />
            <label style={currentMode} htmlFor="email">
              E-mail: &nbsp;
            </label>
            <input type="text" id="email" name="email" placeholder="Your e-mail address.." />
            <br />
            <label style={currentMode} htmlFor="subject">
              Subject: &nbsp;
            </label>
            <input type="text" id="subject" name="subject" placeholder="Subject" />
            <br />
            <label style={currentMode} id="messageLabel" htmlFor="message">
              Message:{' '}
              <span>
                <textarea id="message" name="message" placeholder="Write something.." />
              </span>
            </label>

            <br />
            <label style={currentMode} htmlFor="myfile">
              Select a file:{' '}
            </label>
            <input style={currentMode} type="file" id="myfile" name="myfile" accept="image/*" />
            <br />
            <input style={currentMode} id="contact-submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
});

export default Contact;
