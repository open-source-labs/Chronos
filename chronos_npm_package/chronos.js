const hpropagate = require('hpropagate');
const postgres = require('./controllers/postgres.js');
const mongo = require('./controllers/mongo.js');
const MongoClientWrapper = require('./wrappers/MongoClientWrapper.js');
const MongoServerWrapper = require('./wrappers/MongoServerWrapper.js');
const PostgresClientWrapper = require('./wrappers/PostgresClientWrapper.js');
const PostgresServerWrapper = require('./wrappers/PostgresServerWrapper.js');
const { validateInput, addNotifications } = require('./controllers/helpers');
const { initialFetch } = require('./controllers/kafkaHelpers');

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
   * endpoint that the user Request travels through (tracked with hpropograte) for express routes
   */
  if (database.type === 'MongoDB') {
    mongo.connect(userConfig);
    mongo.services(userConfig);
    mongo.docker(userConfig);
    mongo.health(userConfig);
    if (database.connection === 'REST') {
      return mongo.communications(userConfig);
    }
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
    postgres.docker(userConfig);
    postgres.health(userConfig);
    if (database.connection === 'REST') {
      return postgres.communications(userConfig);
    }
  }
  return null;
};

  /**
 * **********************************************
 *              COLLECT KAFKA METRICS
 * Only supports MongoDB and PostgreSQL for now!
 * **********************************************
 */

chronos.kafka = function () {
  const { database, jmxuri } = userConfig;
  if (jmxuri === undefined){
    console.log('No specified URI for a JMX Exporter');
    return;
  }

  // Ensures that the provided URI returns correctly formatted data.
  initialFetch(jmxuri);

  if (database.type === 'MongoDB') {
    // mongo.connect(userConfig);
    mongo.kafka(userConfig);
  }

  if (database.type === 'PostgresQL') {
    postgres.kafka(userConfig);
  }
};

/**
 * Wraps the gRPC server object to automatically write logs to user configed DB
 *
 * If the provided database is MongoDB, connection will be made to the Mongodb Atlas
 *
 * If the provided database is PostgreSQL, connection will be made to PostgreSQL client
 * @param {*} server
 * @param {*} proto
 * @param {*} methods
 */
chronos.ServerWrapper = (server, proto, methods) => {
  const { database } = userConfig;
  if (database.type === 'MongoDB') {
    return new MongoServerWrapper(server, proto, methods, userConfig);
  }
  if (database.type === 'PostgreSQL') {
    return new PostgresServerWrapper(server, proto, methods, userConfig);
  }
  return null;
};
/**
 * Wraps the gRPC client to automatically write logs to user configed DB
 *
 * If the provided database is MongoDB, connection will be made to the Mongodb Atlas
 *
 * If the provided database is PostgreSQL, connection will be made to PostgreSQL client
 *
 * @param {*} client
 * @param {*} service
 */
chronos.ClientWrapper = (client, service) => {
  const { database } = userConfig;
  if (database.type === 'MongoDB') {
    return new MongoClientWrapper(client, service, userConfig);
  }
  if (database.type === 'PostgreSQL') {
    return new PostgresClientWrapper(client, service, userConfig);
  }
  return null;
};

/**
 * Allows the passthrough of metadata from gRPC server to gRPC client
 *
 * @param {*} client
 * @param {*} servere
 */
chronos.link = (client, server) => {
  client.metadata = server.metadataHolder;
};

module.exports = chronos;
