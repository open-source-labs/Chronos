import * as axios from 'axios';
import * as nodemailer from 'nodemailer';

// const alert = {};

interface SlackSettings {
  webhook: any; // possibly 'string'?
}

interface EmailSettings {
  emails: string;
  emailHost: string;
  emailPort: string | number;
  user: string;
  password: string;
}

interface Alert {
  sendSlack: (code: number, message: string, slackSettings: SlackSettings) => void;
  sendEmail: (code: number, message: string, emailSettings: EmailSettings) => void;
}

const alert: Alert = {
/**
 * Sends slack notifications to the provided slackurl with the status code
 * and message via an axios POST request
//  * @param {integer} code Response status code
//  * @param {string} message Response message
//  * @param {Object} slackSettings User provided slack settings
 */

sendSlack : (code: number, message: string, slackSettings: any) => {
  const { webhook } = slackSettings;

  // Data for POST request
  const data = { text: `${code}, ${message}, ${Date.now()}` };

  // Options for POST request
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios
    .post(webhook, data, config)
    .then(res => console.log('Status Code >= 400...\nError message sent'))
    .catch(error => console.log('test------>', error.message));
},

/**
 * Sends email notifications using the provided email information with the
 * status code and message via an axios POST request
//  * @param {integer} code Response status code
//  * @param {string} message Response message
//  * @param {Object} emailSettings User provided email settings
//  */

sendEmail : (code: number, message: string, emailSettings: any) => {
  const { emails, emailHost, emailPort, user, password } = emailSettings;

  // Message object contains recipient email list and email text body
  const data = {
    to: `${emails}`,
    subject: 'Error from Middleware',
    text: `${code}, ${message}`,
  };

  // Configuration settings for email notifications
  const config = {
    host: `${emailHost}`,
    port: `${emailPort}`,
    auth: {
      user: `${user}`,
      pass: `${password}`,
    },
  };
  const transport = nodemailer.createTransport(config);

  transport.sendMail(data, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
},
};

export default alert
