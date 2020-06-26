const hpropagate = require('hpropagate');
const mongo = require('./controllers/mongo.js');
const postgres = require('./controllers/postgres.js');
const { validateInput, addNotifications } = require('./controllers/helpers');

let userConfig = {};
const chronos = {};

/**
 * CMD CONFIG FILE SETUP
 *
 * @field name {string} REQUIRED
 *    The user specified name for the microservice being diagnosed
 *
 * @field interval {number} DEFAULT 60000
 *    The interval for every microservice health check in milliseconds
 *    This defaults to 60000 ms or 1 minute
 *
 * @field dockerized {boolean} DEFAULT False
 *    True if the microservice is containerized. False otherwise
 *
 * @field database {Object}
 *    Takes two properties
 *    - type {string} Either PostgreSQL or MongoDB
 *    - URI {string} Database uri
 *
 * @field notifications {array} OPTIONAL
 *    Varies per notification method
 */
chronos.use = config => {
  // Validate all input fields exist
  validateInput(config);

  // Add notifications
  addNotifications(config);

  // Save config globally
  userConfig = config;
};

/**
 * Places an unique x-correlating-id into the headers of each request/response.
 * This is used for tracking the life cycle of the request until the response
 */
chronos.propagate = () => {
  hpropagate({ propagateInResponses: true });
};

chronos.diagnose = () => {
  const { database, dockerized } = userConfig;

  if (database.type === 'MongoDB') {
    mongo.communications(userConfig);
  }
  if (database.type === 'PostgreSQL') {
    // Connect to PostgreSQL Database
    postgres.connect(userConfig);

    /**
     * Creates a services table if one does not already exist
     * Adds this microservice as one of the entries on that service table
     */
    postgres.services(userConfig);

    // Save docker information if dockerized
    if (dockerized) postgres.docker(userConfig);

    /**
     * Every microservice creates a table to record their health information
     * Entries are added per interval specified by the user
     */
    postgres.health(userConfig);

    // Save communications information
    return postgres.communications(userConfig);
  }
  throw new Error(
    'Chronos currently only supports Mongo and PostgreSQL databases. Please enter "mongo" or "sql"'
  );
};

module.exports = chronos;
