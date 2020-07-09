const hpropagate = require('hpropagate');
const mongo = require('./controllers/mongo.js');
const postgres = require('./controllers/postgres.js');
const { validateInput, addNotifications } = require('./controllers/helpers');

let userConfig = {};
const chronos = {};

/**
 * **********************************
 * CMD CONFIG FILE SETUP
 *
 * @field microservice {string} REQUIRED
 *    The user specified name for the microservice being tracked
 *
 * @field interval {number} DEFAULT 10000
 *    The interval for every microservice health check in milliseconds
 *    This defaults to 10000 ms
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
 * **********************************
 */
chronos.use = config => {
  // Validate all input fields exist and setup notifications
  validateInput(config);
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

/**
 * **********************************************
 *              MAIN CONTROLLER
 * Only supports MongoDB and PostgreSQL for now!
 * **********************************************
 */
chronos.track = () => {
  const { database, dockerized } = userConfig;

  /**
   * If the provided database is Mongo
   * - Connection is made to MongoDB via the provided URI by the user.
   *
   * - 'services' collection will be created if not already and stores every microservice
   * that is apart of the application.
   *
   * - Information is collected if the microservice is containerized
   *
   * - 'communications' collection will be created which creates a new document for every
   * endpoint that the user Request travels through (tracked with hpropograte)
   */
  if (database.type === 'MongoDB') {
    mongo.connect(userConfig);
    mongo.services(userConfig);
    if (dockerized) mongo.docker(userConfig);
    mongo.health(userConfig);
    return mongo.communications(userConfig);
  }

  /**
   * If the provided database is PostgreSQL
   * - Connection is made to the postgres client via the provided URI by the user.
   *
   * - 'services' table will be created if not already and stores every microservice
   * that is apart of the application.
   *
   * - Information is collected if the microservice is containerized
   *
   * - 'communications' table will be created which creates a new row entry for every
   * endpoint that the user Request travels through (tracked with hpropograte)
   */
  if (database.type === 'PostgreSQL') {
    postgres.connect(userConfig);
    postgres.services(userConfig);
    if (dockerized) postgres.docker(userConfig);
    postgres.health(userConfig);
    return postgres.communications(userConfig);
  }
};

module.exports = chronos;
