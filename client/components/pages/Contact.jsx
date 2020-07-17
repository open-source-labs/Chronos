import React from 'react';
import Logo from '../../assets/chronos-v4.png';
import '../../stylesheets/Contact.scss';

const Contact = () => (
  <div className="contact">
    <div className="contact-border">
      <div className="contact-container">
        <h3>
          The Chronos Team is always looking for any feedback or suggestions for
          Chronos.
        </h3>
        <p>
          If you would like your voice heard, send us an e-mail at
          teamchronosla@gmail.com!
        </p>
      </div>
    </div>
  </div>
);

const ContactWIP = () => (
  <div className="contact">
    <div className="contact-border">
      <div className="contact-container">
        <div className="contact-blurb">
          <h1>Contact Us!</h1>
          <br />
          <p>
            The Chronos Team is always looking for any feedback or suggestions
            for Chronos.
          </p>
          <p>
            You can find issues the team is currently working on&nbsp;
            <a
              href="https://github.com/open-source-labs/Chronos/issues"
              target="_blank"
            >
              here
            </a>
            .
          </p>
          <p>
            If you would like your voice heard, fill out the form and we will
            get back to you ASAP!
          </p>
        </div>
        <div className="chronos-contact-container">
          <img src={Logo} alt="Chronos logo" />
        </div>
      </div>
      <div className="email-container">
        <form>
          <label htmlFor="fname">First Name: &nbsp;</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          />
          <br />
          <label htmlFor="lname">Last Name: &nbsp;</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
          />
          <br />
          <label htmlFor="email">E-mail: &nbsp;</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your e-mail address.."
          />
          <br />
          <label htmlFor="subject">Subject: &nbsp;</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
          />
          <br />
          <label htmlFor="message">Message: </label>
          <br />
          <textarea
            id="message"
            name="message"
            placeholder="Write something.."
          />
          <br />
          <label htmlFor="myfile">Select a file: </label>
          <input type="file" id="myfile" name="myfile" accept="image/*" />
          <br />
          <input id="contact-submit" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  </div>
);

export default Contact;
