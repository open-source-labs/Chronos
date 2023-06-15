const mongoose = require('mongoose');
const alert = require('./alert.js');
const CommunicationModel = require('../models/CommunicationModel');
const ServicesModel = require('../models/ServicesModel');
const HealthModelFunc = require('../models/HealthModel');
const ContainerInfoFunc = require('../models/ContainerInfo');
const KafkaModel = require('../models/KafkaModel');
const KubernetesModel = require('../models/KubernetesModel.js');
const { collectHealthData } = require('./healthHelpers.js');
const MetricsModel = require('../models/MetricsModel');
const dockerHelper = require('./dockerHelper');
const utilities = require('./utilities');
require('../models/ContainerInfo');

mongoose.set('strictQuery', true);

const mongo = {};

// This object is used to determine if metrics that are received from setInterval queries should be saved to the db or not.

/**
 * Initializes connection to MongoDB database using provided URI
 * @param {Object} database Contains DB type and DB URI
 */
mongo.connect = async ({ database }) => {
  console.log('Attemping to connect to database...');
  try {
    await mongoose.connect(`${database.URI}`);
    // Print success message
    console.log(`MongoDB database connected at ${database.URI.slice(0, 20)}...`);
  } catch ({ message }) {
    // Print error message
    console.log('Error connecting to MongoDB:', message);
  }
};

/**
 * Create services collection with each entry representing a microservice
 * @param {string} microservice Microservice name
 * @param {number} interval Interval to collect data
 */
mongo.services = ({ microservice, interval }) => {
  console.log(`Saving "${microservice}" to services...`);
  // Create newService object to store microservice information
  const newService = { microservice, interval };

  // Create MongoDB document from newService
  const service = new ServicesModel(newService);

  service
    .save()
    .then(() => console.log(`Added new service "${microservice}"`))
    .catch(err => console.log(`Error saving service "${microservice}": `, err.message));
};

/**
 * Creates a communications collection if one does not yet exist and
 * traces the request throughout its life cycle. Will send a notification
 * to the user if contact information is provided
 * @param {string} microservice Microservice name
 * @param {Object|undefined} slack Slack settings
 * @param {Object|undefined} email Email settings
 */
mongo.communications = ({ microservice, slack, email }) => {
  console.log('Recording request cycle...');

  return function (req, res, next) {
    // Setup newComms object to store data from each request
    const newComms = {
      microservice: microservice,
      endpoint: req.originalUrl,
      request: req.method,
      correlatingid: res.getHeaders()['x-correlation-id'],
    };

    res.on('finish', () => {
      /**
       * OPTIONAL FEATURE
       * If user provides contact information, send an alert if the
       * status code is over or equal to 400
       */
      if (res.statusCode >= 400) {
        if (slack) alert.sendSlack(res.statusCode, res.statusMessage, slack);
        if (email) alert.sendEmail(res.statusCode, res.statusMessage, email);
      }

      // Add status code and message to newComms
      newComms.responsestatus = res.statusCode;
      newComms.responsemessage = res.statusMessage;

      // Create MongoDB document from newComms
      const communication = new CommunicationModel(newComms);
      communication
        .save()
        .then(() => {
          console.log('Request cycle saved');
        })
        .catch(err => console.log(`Error saving communications: `, err.message));
    });

    // Call next middleware
    next();
  };
};

/**
 * Creates a new table per microservice which records all health data
 * @param {string} microservice Microservice name
 * @param {number} interval Interval for continuous data collection
 */
mongo.health = async ({ microservice, interval, mode }) => {
  let l = 0;
  const currentMetricNames = {};

  l = await mongo.getSavedMetricsLength(mode, currentMetricNames);

  setInterval(() => {
    collectHealthData()
      .then(async (healthMetrics) => {
        if (l !== healthMetrics.length) {
          l = await mongo.addMetrics(healthMetrics, mode, currentMetricNames);
        }
        const HealthModel = HealthModelFunc(`${microservice}`);
        return HealthModel.insertMany(healthMetrics);
      })
      .then(() => {
        console.log('Health data recorded in MongoDB');
      })
      .catch(err => console.log('Error inserting health documents: ', err));
  }, interval);
};

/**
 * !Runs instead of health if dockerized is true
 * Collects information on the docker container
 */
mongo.docker = ({ microservice, interval, mode }) => {

  // Create collection using name of microservice
  const containerInfo = ContainerInfoFunc(`${microservice}-containerinfo`);
  dockerHelper.getDockerContainer(microservice)
    .then((containerData) => {
      setInterval(() => {
        dockerHelper.readDockerContainer(containerData)
          .then((data) => {
            return containerInfo.create(data);
          })
          .then((_) => console.log(`Docker data recorded in MongoDB collection ${microservice}-containerinfo`))
          .catch((err) => {
            throw new Error(err)
          });
      }, interval) 
  })
  
  .catch((error) => {
    if (error.constructor.name === 'Error') throw error
    else throw new Error(error);
  })
};

/*
 This function takes as a parameter the promise returned from the kafkaFetch().
 It then takes the returned array of metrics, turns them into documents based on
 KafkaModel.js, and inserts them into the db at the provided uri with insertMany()
*/
mongo.serverQuery = (config) => {
  mongo.saveService(config);
  mongo.setQueryOnInterval(config);
}

mongo.saveService = (config) => {
  let microservice;
  if (config.mode === 'kafka') {
    microservice = 'kafkametrics';
  } else if (config.mode === 'kubernetes') {
    microservice = 'kubernetesmetrics';
  } else {
    throw new Error('Unrecongnized mode');
  }

  const service = new ServicesModel({
    microservice: microservice,
    interval: config.interval,
  });

  service.save()
    .then(() => console.log(`Adding "${microservice}" to the services table`))
    .catch(err => console.log(`Error saving "${microservice}" to the services table: `, err.message));
}

mongo.setQueryOnInterval = async (config) => {
  let model;
  let metricsQuery;

  let l = 0;
  const currentMetricNames = {};

  if (config.mode === 'kafka') {
    model = KafkaModel;
    metricsQuery = utilities.kafkaMetricsQuery;
  } else if (config.mode === 'kubernetes') {
    model = KubernetesModel;
    metricsQuery = utilities.promMetricsQuery;
  } else {
    throw new Error('Unrecognized mode');
  }
  // When querying for currentMetrics, we narrow down the result to only include metrics for the current service being used.
  // This way, when we go to compare parsedArray to currentMetricNames, the length of the arrays should match up unless there are new metrics available to view

  l = await mongo.getSavedMetricsLength(config.mode, currentMetricNames);

  console.log('currentMetricNames is: ', Object.keys(currentMetricNames).length)
  // Use setInterval to send queries to metrics server and then pipe responses to database
  setInterval(() => {
    metricsQuery(config)
      // This updates the Metrics Model with all chosen metrics. If there are no chosen metrics it sets all available metrics as chosen metrics within the metrics model.
      .then(async (parsedArray) => {
        // This conditional would be used if new metrics are available to be tracked.
        if (l !== parsedArray.length) {
          l = await mongo.addMetrics(parsedArray, config.mode, currentMetricNames);
        }
        const documents = [];
        for (const metric of parsedArray) {
          // This will check if the current metric in the parsed array evaluates to true within the currentMetricNames object.
          // The currentMetricNames object is updated by the user when they select/deselect metrics on the electron app, so only the
          // requested metrics will actually be populated in the database, which helps to avoid overloading the db with unnecessary data.
          if (currentMetricNames[metric.metric]) documents.push(model(metric));
        }
        return model.insertMany(documents, (err) => {
          if (err) console.error(err);
        })
      })
      .then(() => console.log(`${config.mode} metrics recorded in MongoDB`))
      .catch(err => console.log(`Error inserting ${config.mode} documents in MongoDB: `, err));
  }, config.interval);
}

mongo.getSavedMetricsLength = async (mode, currentMetricNames) => {
  let currentMetrics = await MetricsModel.find({mode: mode});
  if (currentMetrics.length > 0) {
    currentMetrics.forEach(el => {
    const { metric, selected } = el;
    currentMetricNames[metric] = selected;
    })
  }
  return currentMetrics.length ? currentMetrics.length : 0;
}

mongo.addMetrics = async (arr, mode, obj) => {
    const newMets = [];
    arr.forEach(el => {
      if (!(el.metric in obj)) {
        const { metric } = el;
        newMets.push({metric: metric, mode: mode})
        obj[el.metric] = true;
      }
    })
    await MetricsModel.insertMany(newMets, (err) => {
      if (err) console.error(err)
    })
    return arr.length;
}

// This middleware could be used if the user would like to update their chronos data in real time (immediately after updating saved metrics on the Chronos desktop app), but they would have to expose a URL/port to be queried for the Electron front end.
//
// mongo.modifyMetrics = (config) => {
//   return function (req, res, next) {
//     res.on('finish', () => {
//       if (req.body.URI === URI && req.body.mode === config.mode) {
//         currentMetricNames = req.body.metrics;
//       }
//       else return next({err: 'Modified metrics passed in to the modifyMetrics route cannot be added', log: 'It is possible that the URI is incorrect, or that you are attempting to add metrics for the incorrect mode type'})
//     });
//     return next();
//   };
// }

module.exports = mongo;
