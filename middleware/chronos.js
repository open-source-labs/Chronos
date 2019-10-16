const mongoMiddleware = require('./mwMongo.js/index.js')
const sqlMiddleware = require('./mwSQL.js/index.js')

const chronos = {}
  chronos.microHealth = (microserviceName, databaseType, userOwnedDB) => {
    microserviceName.toLowerCase();
    databaseType.toLowerCase();

    if (!microserviceName || !databaseType || !userOwnedDB) {
      throw new Error(
        "Please verify that you have provided all three required parameters"
      );
    }

    if (
      typeof microserviceName !== "string" ||
      typeof databaseType !== "string" ||
      typeof userOwnedDB !== "string"
    ) {
      throw new Error(
        "Please verify that the parameters you entered are all strings"
      );
    }

    if (databaseType === "mongo" || databaseType === "mongodb") {
      return mongoMiddleware.microHealth(userOwnedDB, microserviceName);
    } else if (databaseType === "sql" || databaseType === "postgresql") {
      return sqlMiddleware.microHealth(userOwnedDB, microserviceName);
    } else {
      throw new Error (
        'Chronos currently only supports Mongo and SQL/PostgresQL databases. Please enter "mongo" or "sql'
      );
    }
  },
    chronos.microCom = (microserviceName, databaseType, userOwnedDB, req, res, next) => {
      microserviceName.toLowerCase();
      databaseType.toLowerCase();

      if (!microserviceName || !databaseType || !userOwnedDB) {
        throw new Error(
          "Please verify that you have provided all three required parameters"
        );
      }

      if (
        typeof microserviceName !== "string" ||
        typeof databaseType !== "string" ||
        typeof userOwnedDB !== "string"
      ) {
        throw new Error(
          "Please verify that the parameters you entered are all strings"
        );
      }

      if (databaseType === "mongo" || databaseType === "mongodb") {
        return mongoMiddleware.microCom(userOwnedDB, microserviceName);
      } else if (databaseType === "sql" || databaseType === "postgresql") {
        return sqlMiddleware.microCom(userOwnedDB, microserviceName);
      } else {
        throw new Error(
          'Chronos currently only supports Mongo and SQL/PostgresQL databases. Please enter "mongo" or "sql'
        );
      }
};


module.exports = chronos;




