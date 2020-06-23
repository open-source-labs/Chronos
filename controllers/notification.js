const axios = require('axios');
const nodemailer = require('nodemailer');

const notifications = {};

// notification to slack
// url param is inpovided by the user microservice side
notifications.sendSlack = (data, url) => {
  const config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // data param is provided from the DBmiddlewares
  return axios
    .post(url, data, config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log('test------>', error.message);
    });
};

//email notification settings
// message object is in the DBmiddlewares and recipient emails is provided from microservice
//config object is in the DBmiddlewares and the object values are provided by the microservice user
notifications.sendEmail = (message, config) => {
  let transport = nodemailer.createTransport(config);
  console.log('slack test--------->');

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = notifications;
