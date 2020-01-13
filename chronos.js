const hpropagate = require('hpropagate');
const mongoMiddleware = require('./mwMongo.js');
const sqlMiddleware = require('./mwSQL.js');


const chronos = {};

/*propagate places an unique x-correlating-id into the headers of 
each request/response. The same id persist thru the whole life cycle of the 
request.
*/
chronos.propagate = () => {
  hpropagate({ propagateInResponses: true });
};

// microCom logs all microservice-microservice and microservice-client communication into the user-owned database.

/*
    * microserviceName: what the user wants current microservice to be called
    * databaseType: type of database user is providing: Mongo or PostgreSQL
    * userOwnedDB: URL to user database
    * queryFreq: Not necessary for microCom as microCom monitors only when an endpoint is hit
 */
chronos.microCom = (microserviceName, databaseType, userOwnedDB, wantMicroHealth, queryFreq = 'm', req, res, next) => {
  // Handles if user inputs an array. Grabs information and assigns to correct parameters
  if (Array.isArray(microserviceName) === true && microserviceName.length >= 4) {
    userOwnedDB = microserviceName[2];
    databaseType = microserviceName[1];
    wantMicroHealth = microserviceName[3];
    queryFreq = microserviceName[4] || 'm';
    microserviceName = microserviceName[0];
  }
  // Changes user inputs to lowercase to account for any capitalization errors
  databaseType = databaseType.toLowerCase();
  wantMicroHealth = wantMicroHealth.toLowerCase();
  queryFreq = queryFreq.toLowerCase();

  // Ensures that the required parameters are entered, errors out otherwise
  if (!microserviceName || !databaseType || !userOwnedDB || !wantMicroHealth) {
    throw new Error(
      'Please verify that you have provided all four required parameters',
    );
  }

  // Verifies that the user has enteres strings, throws error otherwise
  if (
    typeof microserviceName !== 'string'
      || typeof databaseType !== 'string'
      || typeof userOwnedDB !== 'string'
      || typeof wantMicroHealth !== 'string'
      || typeof queryFreq !== 'string'
  ) {
    throw new Error(
      'Please verify that the parameters you entered are all strings',
    );
  }

  // Checks the type of database provided by the user and uses appropriate middleware files. Throws error if input db type is not supported
  if (databaseType === 'mongo' || databaseType === 'mongodb') {
    return mongoMiddleware.microCom(userOwnedDB, microserviceName, wantMicroHealth,queryFreq);
  } if (databaseType === 'sql' || databaseType === 'postgresql') {
    return sqlMiddleware.microCom(userOwnedDB, microserviceName, wantMicroHealth,queryFreq);
  }
  throw new Error(
    'Chronos currently only supports Mongo and PostgreSQL databases. Please enter "mongo" or "sql"',
  );
};

module.exports = chronos;
