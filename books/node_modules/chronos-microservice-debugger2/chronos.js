const hpropagate = require('hpropagate');
const mongoMiddleware = require('./mwMongo.js');
const sqlMiddleware = require('./mwSQL.js');

const chronos = {};
// microHealth gathers health information about the microservices using the system information npm package.

/*
 * microserviceName: what the user wants current microservice to be called
 * databaseType: type of database user is providing: Mongo or PostgreSQL
 * userOwnedDB: URL to user database
 * queryFreq: How often user wants microservice health checked, default every second. Can be minute, hour, daily, or weekly.
 */

chronos.propagate = () => {
  hpropagate({ propagateInResponses: true });
};

chronos.microHealth = (microserviceName, databaseType, userOwnedDB, queryFreq = 's') => {
  // Handles if user inputs an array. Grabs information and assigns to correct parameters
  if (Array.isArray(microserviceName) === true && microserviceName.length >= 3) {
    userOwnedDB = microserviceName[2];
    databaseType = microserviceName[1];
    microserviceName = microserviceName[0];
    queryFreq = microserviceName[3];
  }
  // Changes user inputs to lowercase to account for any capitalization errors
  microserviceName.toLowerCase();
  databaseType.toLowerCase();
  queryFreq.toLowerCase();

  // Ensures that the required parameters are entered, errors out otherwise
  if (!microserviceName || !databaseType || !userOwnedDB) {
    throw new Error(
      'Please verify that you have provided all three required parameters',
    );
  }

  // Verifies that the user has enteres strings, throws error otherwise
  if (
    typeof microserviceName !== 'string'
    || typeof databaseType !== 'string'
    || typeof userOwnedDB !== 'string'
    || typeof queryFreq !== 'string'
  ) {
    throw new Error(
      'Please verify that the parameters you entered are all strings',
    );
  }

  // Checks the type of database provided by the user and uses appropriate middleware files. Throws error if input db type is not supported
  if (databaseType === 'mongo' || databaseType === 'mongodb') {
    return mongoMiddleware.microHealth(userOwnedDB, microserviceName, queryFreq);
  } if (databaseType === 'sql' || databaseType === 'postgresql') {
    return sqlMiddleware.microHealth(userOwnedDB, microserviceName, queryFreq);
  }
  throw new Error(
    'Chronos currently only supports Mongo and PostgreSQL databases. Please enter "mongo" or "sql',
  );
},
// microCom logs all microservice-microservice and microservice-client communication into the user-owned database.

/*
    * microserviceName: what the user wants current microservice to be called
    * databaseType: type of database user is providing: Mongo or PostgreSQL
    * userOwnedDB: URL to user database
    * queryFreq: Not necessary for microCom as microCom monitors only when an endpoint is hit
 */
chronos.microCom = (microserviceName, databaseType, userOwnedDB, req, res, next) => {
  // Handles if user inputs an array. Grabs information and assigns to correct parameters
  if (Array.isArray(microserviceName) === true && microserviceName.length >= 3) {
    userOwnedDB = microserviceName[2];
    databaseType = microserviceName[1];
    microserviceName = microserviceName[0];
  }
  // Changes user inputs to lowercase to account for any capitalization errors
  microserviceName.toLowerCase();
  databaseType.toLowerCase();
  // queryFreq.toLowerCase();

  // Ensures that the required parameters are entered, errors out otherwise
  if (!microserviceName || !databaseType || !userOwnedDB) {
    throw new Error(
      'Please verify that you have provided all three required parameters',
    );
  }

  // Verifies that the user has enteres strings, throws error otherwise
  if (
    typeof microserviceName !== 'string'
      || typeof databaseType !== 'string'
      || typeof userOwnedDB !== 'string'
  ) {
    throw new Error(
      'Please verify that the parameters you entered are all strings',
    );
  }

  // Checks the type of database provided by the user and uses appropriate middleware files. Throws error if input db type is not supported
  if (databaseType === 'mongo' || databaseType === 'mongodb') {
    return mongoMiddleware.microCom(userOwnedDB, microserviceName);
  } if (databaseType === 'sql' || databaseType === 'postgresql') {
    return sqlMiddleware.microCom(userOwnedDB, microserviceName);
  }
  throw new Error(
    'Chronos currently only supports Mongo and PostgreSQL databases. Please enter "mongo" or "sql"',
  );
};

module.exports = chronos;
