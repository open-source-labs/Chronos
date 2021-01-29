const hpropagate = require('hpropagate');
const postgres = require('./controllers/postgres.js')
const postgresGRPC = require('./controllers/postgresGRPC.js')
const mongo = require('./controllers/mongo.js')
const mongoGRPC = require('./controllers/mongoGRPC.js')
const ClientWrapper = require('./wrappers/ClientWrapper.js')
const ServerWrapper = require('./wrappers/ServerWrapper.js')
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
 * @field interval {number} DEFAULT 60000
 *    The interval for every microservice health check in milliseconds
 *    This defaults to 60000 ms or 1 minute
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
  if (database.type === 'MongoDB' ** database.connection === 'REST') {
    mongo.connect(userConfig);
    mongo.services(userConfig);
    mongo.docker(userConfig);
    mongo.health(userConfig);
    return mongo.communications(userConfig)
  }
  if (database.type === 'MongoDB' && database.connection === 'gRPC') {
    mongoGRPC.connect(userConfig);
    mongoGRPC.services(userConfig);
    mongoGRPC.docker(userConfig);
    mongoGRPC.health(userConfig);
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
  if (database.type === 'PostgreSQL' && database.connect === 'REST') {
    postgres.connect(userConfig);
    postgres.services(userConfig);
    postgres.docker(userConfig);
    postgres.health(userConfig);
    return postgres.communications(userConfig)
  }
  if (database.type === 'PostgreSQL' && database.connection === 'gRPC') {
    postgresGRPC.connect(userConfig);
    postgresGRPC.services(userConfig);
    postgresGRPC.docker(userConfig);
    postgresGRPC.health(userConfig);
  }
};
chronos.ServerWrapper = (server, proto, methods) => {
   return new ServerWrapper(server, proto, methods)
}
chronos.ClientWrapper = (client, service) => {
  return new ClientWrapper(client, service)
}

module.exports = chronos;
