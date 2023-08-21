const hpropagate = require('hpropagate');
const postgres = require('./controllers/postgres.js');
const mongo = require('./controllers/mongo.js');
const MongoClientWrapper = require('./wrappers/MongoClientWrapper.js');
const MongoServerWrapper = require('./wrappers/MongoServerWrapper.js');
const PostgresClientWrapper = require('./wrappers/PostgresClientWrapper.js');
const PostgresServerWrapper = require('./wrappers/PostgresServerWrapper.js');
const utilities = require('./controllers/utilities');

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

class Chronos {
  constructor(config) {
    if (config === undefined) {
      throw new Error('Chronos config is undefined');
    }

    // Validate all input fields exist and setup notifications
    config = utilities.validateInput(config);
    config = utilities.addNotifications(config);
    this.config = config;
  }

  propagate() {
    /**
     * Places an unique x-correlating-id into the headers of each request/response.
     * This is used for tracking the life cycle of the request until the response
     */
    hpropagate({ propagateInResponses: true });
  }

  track() {
    /**
     * **********************************************
     *              MAIN CONTROLLER
     * Only supports MongoDB and PostgreSQL for now!
     * **********************************************
     */
    const { database, dockerized } = this.config;

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
      mongo.connect(this.config);
      mongo.services(this.config);
      console.log('dockerized really? chronos.js LN 75', dockerized, this.config)
      dockerized ? mongo.docker(this.config) : mongo.health(this.config);
      if (database.connection === 'REST') {
        return mongo.communications(this.config);
      }
    } else if (database.type === 'PostgreSQL') {
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
      postgres.connect(this.config);
      postgres.services(this.config);
      dockerized ? postgres.docker(this.config) : postgres.health(this.config);
      if (database.connection === 'REST') {
        return postgres.communications(this.config);
      }
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  async kafka() {
    // Test metrics server connection
    await utilities.testMetricsQuery(this.config);

    if (this.config.database.type === 'MongoDB') {
      mongo.connect(this.config);
      mongo.serverQuery(this.config);
    }

    else if (this.config.database.type === 'PostgreSQL') {
      postgres.connect(this.config);
      postgres.serverQuery(this.config);
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  async kubernetes() {
    // Test metrics server connection
    await utilities.testMetricsQuery(this.config);

    if (this.config.database.type === 'MongoDB') {
      await mongo.connect(this.config);
      await mongo.storeGrafanaAPIKey(this.config);
      //await mongo.createGrafanaDashboards(this.config);
      mongo.serverQuery(this.config);
      // return mongo.modifyMetrics(this.config);
    }

    else if (this.config.database.type === 'PostgreSQL') {
      postgres.connect(this.config);
      postgres.serverQuery(this.config);
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  async docker () {
    await utilities.testMetricsQuery(this.config);
    if (this.config.database.type === 'MongoDB') {
      mongo.connect(this.config);
      mongo.serverQuery(this.config);
      // return mongo.modifyMetrics(this.config);
    } else if (this.config.database.type === 'PostgreSQL') {
      postgres.connect(this.config);
      postgres.serverQuery(this.config);
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  ServerWrapper(server, proto, methods) {
    /**
     * Wraps the gRPC server object to automatically write logs to provided DB
     * @param {*} server
     * @param {*} proto
     * @param {*} methods
     */
    const { database } = this.config;
    if (database.type === 'MongoDB') {
      return new MongoServerWrapper(server, proto, methods, this.config);
    }
    if (database.type === 'PostgreSQL') {
      return new PostgresServerWrapper(server, proto, methods, this.config);
    }
    return null;
  }

  ClientWrapper(client, service) {
    /**
     * Wraps the gRPC client to automatically write logs to provided DB
     *
     * @param {*} client
     * @param {*} service
     */
    const { database } = this.config;
    if (database.type === 'MongoDB') {
      return new MongoClientWrapper(client, service, this.config);
    }
    if (database.type === 'PostgreSQL') {
      return new PostgresClientWrapper(client, service, this.config);
    }
    return null;
  }

  link(client, server) {
    /**
     * Allows the passthrough of metadata from gRPC server to gRPC client
     *
     * @param {*} client
     * @param {*} servere
     */
    client.metadata = server.metadataHolder;
  }
}

module.exports = Chronos;
