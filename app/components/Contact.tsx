import React from 'react';
import '../stylesheets/Contact.scss';

const Contact: React.FC = () => {
  return (
    <div className="contact">
      <div className="contact-border">
        <div className="contact-container">
          <div className="contact-blurb">
            <h1>Contact Us</h1>
            <br />
            <p>Please feel free to provide any feedback, concerns, or comments.</p>
            <p>
              You can find issues the team is currently working on&nbsp;
              <a id="issueLink" href="https://github.com/open-source-labs/Chronos/issues" target="_blank">
                here
              </a>
              .
            </p>
          </div>
        </div>
        <div className="email-container">
          <form>
            <label htmlFor="fname">First Name: &nbsp;</label>
            <input type="text" id="fname" name="firstname" placeholder="Your name.." />
            <br />
            <label htmlFor="lname">Last Name: &nbsp;</label>
            <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
            <br />
            <label htmlFor="email">E-mail: &nbsp;</label>
            <input type="text" id="email" name="email" placeholder="Your e-mail address.." />
            <br />
            <label htmlFor="subject">Subject: &nbsp;</label>
            <input type="text" id="subject" name="subject" placeholder="Subject" />
            <br />
            <label id="messageLabel" htmlFor="message">Message: <span>
                <textarea id="message" name="message" placeholder="Write something.."></textarea>
              </span>
            </label>
            
            <br />
            <label htmlFor="myfile">Select a file: </label>
            <input type="file" id="myfile" name="myfile" accept="image/*"></input>
            <br />
            <input id="contact-submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
