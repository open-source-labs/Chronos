import nodemailer from 'nodemailer'; // Importing nodemailer for sending emails
import axios from 'axios';
// Defined a interface for Slack settings
// This describes the structure of the `slackSettings` object.
//  There is a property of `webhook` with a string value, which is the URL to send Slack messages.
interface SlackSettings {
  webhook: string; // The Slack webhook URL 
}

// Defined a TypeScript interface for Email settings
// This describes the structure of `emailSettings` used for sending emails.
interface EmailSettings {
  emails: string; // A comma-separated list of email addresses
  emailHost: string; // SMTP server (e.g., "smtp.gmail.com")
  emailPort: string | number; // SMTP port 
  user: string; // Email username (e.g., your email address)
  password: string; // Email password 
}

// Defined an interface for the Alert object
// This helps TypeScript make sure  our `alert` object has two methods: sendSlack &  sendEmail.
interface Alert {
  sendSlack: (code: number, message: string, slackSettings: SlackSettings) => void;
  sendEmail: (code: number, message: string, emailSettings: EmailSettings) => void;
}

// Creates an Alert object with 2 functions
const alert: Alert = {
  /**
   * Sends a notification to a Slack channel when an error occurs.
   * This function makes an HTTP POST request to the Slack webhook URL.
   *
   * @param code - The HTTP status code 
   * @param message - The error message to send
   * @param slackSettings - The Slack webhook URL provided by the user
   */
  sendSlack: (code: number, message: string, slackSettings: SlackSettings) => {
    const { webhook } = slackSettings; // Declare a const destructuring slackSettings for  the webhook URL

    //Prepares the message payload
    const data = { text: `${code}, ${message}, ${Date.now()}` };

    // Sets up the request headers
    const config = {
      headers: {
        'Content-Type': 'application/json', // Ensures proper formatting for Slack
      },
    };

    // Send the POST request using axios
    axios
      .post(webhook, data, config)
      .then(() => console.log('✅ Slack alert sent successfully!'))
      .catch(error => console.log('❌ Error sending Slack message:', error.message));
  },

  /**
   * Sends an email notification when an error occurs.
   * Uses nodemailer to send the email through an SMTP server.
   *
   * @param code - The HTTP status code 
   * @param message - The error message to send
   * @param emailSettings - The SMTP configuration and recipient emails
   */
  sendEmail: (code: number, message: string, emailSettings: EmailSettings) => {
    const { emails, emailHost, emailPort, user, password } = emailSettings; // Extract email settings

    // Format  for the email message
    const mailOptions = {
      to: emails, // Recipient(s)
      subject: '🚨 Error Alert from Middleware',
      text: `${code}, ${message}`, // Email content
    };

    // Ensure emailPort is always a number 
    const portNumber = typeof emailPort === 'string' ? parseInt(emailPort, 10) : emailPort;

    // Set up the SMTP transport configuration
    const transportConfig = {
      host: emailHost, // SMTP server (e.g., "smtp.gmail.com")
      port: portNumber, // Convert to number if needed
      auth: {
        user: user, // Email username
        pass: password, // Email password or app password
      },
    };

    // Create an email transporter using nodemailer
    const transport = nodemailer.createTransport(transportConfig);

    // Send the email
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('❌ Error sending email:', err);
      } else {
        console.log('✅ Email sent successfully:', info);
      }
    });
  },
};

// Export the alert object for use in other files
export default alert;
