const fetch = require('node-fetch');

const kafkaHelpers = {};

// Creates an array full of objects that store values for various Kafka metrics
kafkaHelpers.extractWord = function (str) {
  const res = [];
  const arr = str.split('\n'); // `/\n/`
  for (const element of arr) {
    if (
      element &&
      element.length !== 0 &&
      element[0] !== '#' &&
      element.substring(0, 3) !== 'jmx' &&
      element.substring(0, 4) !== "'jmx"
    ) {
      const metric = element.split(' ')[0];
      const value = Number(element.split(' ')[1]);
      const time = Date.now();
      const category = 'Event';
      res.push({ metric, value, time, category });
    }
  }
  return res;
};

// executes first to ensure that the provided jmxuri provides legitimate data.
// if it doesnt then an error is thrown
kafkaHelpers.initialFetch = function (jmxuri) {
  fetch(jmxuri)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Error: The provided URI for the JMX exporter is invalid`);
      } else {
        console.log('Initial fetch to JMX Exporter was successful.');
      }
      return response.text();
    })
    .then(text => {
      console.log('\nInitial Fetch Response Text:\n', text);
    });
};

// fetches kafka metrics from the user-specified location of JMX prometheus and returns the processed result
kafkaHelpers.kafkaFetch = function (config) {
  return fetch(config.jmxuri)
    .then(data => data.text())
    .then(data => kafkaHelpers.extractWord(data))
    .catch(err => console.log(err));
};

module.exports = kafkaHelpers;
