"use strict";
// import * as axios from 'axios';
// import * as nodemailer from 'nodemailer';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // const alert = {};
// interface SlackSettings {
//   webhook: any; // possibly 'string'?
// }
// interface EmailSettings {
//   emails: string;
//   emailHost: string;
//   emailPort: string | number;
//   user: string;
//   password: string;
// }
// interface Alert {
//   sendSlack: (code: number, message: string, slackSettings: SlackSettings) => void;
//   sendEmail: (code: number, message: string, emailSettings: EmailSettings) => void;
// }
// const alert: Alert = {
// /**
//  * Sends slack notifications to the provided slackurl with the status code
//  * and message via an axios POST request
// //  * @param {integer} code Response status code
// //  * @param {string} message Response message
// //  * @param {Object} slackSettings User provided slack settings
//  */
// sendSlack : (code: number, message: string, slackSettings: any) => {
//   const { webhook } = slackSettings;
//   // Data for POST request
//   const data = { text: `${code}, ${message}, ${Date.now()}` };
//   // Options for POST request
//   const config = {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   axios
//     .post(webhook, data, config)
//     .then(res => console.log('Status Code >= 400...\nError message sent'))
//     .catch(error => console.log('test------>', error.message));
// },
// /**
//  * Sends email notifications using the provided email information with the
//  * status code and message via an axios POST request
// //  * @param {integer} code Response status code
// //  * @param {string} message Response message
// //  * @param {Object} emailSettings User provided email settings
// //  */
// sendEmail : (code: number, message: string, emailSettings: any) => {
//   const { emails, emailHost, emailPort, user, password } = emailSettings;
//   // Message object contains recipient email list and email text body
//   const data = {
//     to: `${emails}`,
//     subject: 'Error from Middleware',
//     text: `${code}, ${message}`,
//   };
//   // Configuration settings for email notifications
//   const config = {
//     host: `${emailHost}`,
//     port: `${emailPort}`,
//     auth: {
//       user: `${user}`,
//       pass: `${password}`,
//     },
//   };
//   const transport = nodemailer.createTransport(config);
//   transport.sendMail(data, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// },
// };
// export default alert
// alert.ts
// Option A: Preferred if your tsconfig.json has "esModuleInterop": true
const axios_1 = __importDefault(require("axios"));
// Option B (if you can’t enable esModuleInterop):
// import * as axiosImport from 'axios';
// const axios = axiosImport.default;
const nodemailer_1 = __importDefault(require("nodemailer"));
const alert = {
    /**
     * Sends slack notifications to the provided slack webhook URL with the status code
     * and message via an Axios POST request.
     *
     * @param code Response status code
     * @param message Response message
     * @param slackSettings User provided slack settings
     */
    sendSlack: (code, message, slackSettings) => {
        const { webhook } = slackSettings;
        // Data for POST request
        const data = { text: `${code}, ${message}, ${Date.now()}` };
        // Options for POST request
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios_1.default
            .post(webhook, data, config)
            .then((res) => console.log('Status Code >= 400...\nError message sent'))
            .catch((error) => console.log('Error sending Slack message:', error.message));
    },
    /**
     * Sends email notifications using the provided email information with the
     * status code and message via Nodemailer.
     *
     * @param code Response status code
     * @param message Response message
     * @param emailSettings User provided email settings
     */
    sendEmail: (code, message, emailSettings) => {
        const { emails, emailHost, emailPort, user, password } = emailSettings;
        // Message object for the email
        const mailOptions = {
            to: emails,
            subject: 'Error from Middleware',
            text: `${code}, ${message}`,
        };
        // Convert port to number if necessary
        const portNumber = typeof emailPort === 'string' ? parseInt(emailPort, 10) : emailPort;
        // Configuration settings for Nodemailer
        const transportConfig = {
            host: emailHost,
            port: portNumber,
            auth: {
                user: user,
                pass: password,
            },
        };
        const transport = nodemailer_1.default.createTransport(transportConfig);
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Error sending email:', err);
            }
            else {
                console.log('Email sent:', info);
            }
        });
    },
};
exports.default = alert;
//# sourceMappingURL=alert.js.map