import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="home">
      <div>
        <h1>Contact Us!</h1>
        <p>The Chronos Team is always looking for any feedback or suggestions for Chronos.</p>
        <p>
          You can find issues the team is currently working on&nbsp;
          <a href="https://github.com/open-source-labs/Chronos/issues" target="_blank">
            here
          </a>
          .
        </p>
        <p>
          If you would like your voice heard, fill out the form and we will get back to you ASAP!
        </p>
      </div>
      <div>
        <form>
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="firstname" placeholder="Your name.." />
          <br />
          <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
          <br />
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" name="email" placeholder="Your e-mail address.." />
          <br />
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="Subject" />
          <br />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write something.." /*style="height:200px"*/
          ></textarea>
          <br />
          <label htmlFor="myfile">Select a file: </label>
          <input type="file" id="myfile" name="myfile" accept="image/*"></input>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
