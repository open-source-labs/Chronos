import React from 'react';
import '../stylesheets/Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact">
      <div className="contact-border">
        <div className="contact-container">
          <div className="contact-blurb">
            <h1>Contact Us!</h1>
            <br />
            <p>The Chronos Team is always looking for any feedback or suggestions for Chronos.</p>
            <p>
              You can find issues the team is currently working on&nbsp;
              <a href="https://github.com/open-source-labs/Chronos/issues" target="_blank">
                here
              </a>
              .
            </p>
            <p>
              If you would like your voice heard, fill out the form and we will get back to you
              ASAP!
            </p>
          </div>
          <div className="chronos-contact-container">
            <img src={'../assets/chronos-v4.png'} alt="Chronos logo" />
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
            <label htmlFor="message">Message: </label>
            <br />
            <textarea
              id="message"
              name="message"
              placeholder="Write something.." /*style="height:200px"*/
            ></textarea>
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
