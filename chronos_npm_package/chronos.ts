// // import hpropagate from 'hpropagate';  
// // import postgres from './controllers/postgres';  
// // import mongo from './controllers/mongo';  
// // import MongoClientWrapper from './wrappers/MongoClientWrapper';  
// // import MongoServerWrapper from './wrappers/MongoServerWrapper';  
// // import PostgresClientWrapper from './wrappers/PostgresClientWrapper';  
// // import PostgresServerWrapper from './wrappers/PostgresServerWrapper';  
// // import utilities from './controllers/utilities';

// // /**
// //  * **********************************
// //  * CMD CONFIG FILE SETUP
// //  *
// //  * @field microservice {string} REQUIRED
// //  *    The user specified name for the microservice being tracked
// //  *
// //  * @field interval {number} DEFAULT 60000
// //  *    The interval for every microservice health check in milliseconds
// //  *    This defaults to 60000 ms or 1 minute
// //  *
// //  * @field database {Object}
// //  *    Takes two properties
// //  *    - type {string} Either PostgreSQL or MongoDB
// //  *    - URI {string} Database uri
// //  *
// //  * @field notifications {array} OPTIONAL
// //  *    Varies per notification method
// //  * **********************************
// //  */

// // class Chronos {
// //   constructor(config) {
// //     if (config === undefined) {
// //       throw new Error('Chronos config is undefined');
// //     }

// //     // Validate all input fields exist and setup notifications
// //     config = utilities.validateInput(config);
// //     config = utilities.addNotifications(config);
// //     this.config = config;
// //   }

// //   propagate() {
// //     /**
// //      * Places an unique x-correlating-id into the headers of each request/response.
// //      * This is used for tracking the life cycle of the request until the response
// //      */
// //     hpropagate({ propagateInResponses: true });
// //   }

// //   track() {
// //     /**
// //      * **********************************************
// //      *              MAIN CONTROLLER
// //      * Only supports MongoDB and PostgreSQL for now!
// //      * **********************************************
// //      */
// //     const { database, dockerized } = this.config;

// //     /**
// //      * If the provided database is Mongo
// //      * - Connection is made to MongoDB via the provided URI by the user.
// //      *
// //      * - 'services' collection will be created if not already and stores every microservice
// //      * that is apart of the application.
// //      *
// //      * - Information is collected if the microservice is containerized
// //      *
// //      * - 'communications' collection will be created which creates a new document for every
// //      * endpoint that the user Request travels through (tracked with hpropograte) for express routes
// //      */
// //     if (database.type === 'MongoDB') {
// //       //mongo is referring to controller function defined locally, not the actual mongodb object
// //       mongo.connect(this.config);
// //       mongo.services(this.config);
// //       dockerized ? mongo.docker(this.config) : mongo.health(this.config);
      
// //       if (database.connection === 'REST') {
// //         return mongo.communications(this.config);
// //       }
// //     } else if (database.type === 'PostgreSQL') {
// //       /**
// //        * If the provided database is PostgreSQL
// //        * - Connection is made to the postgres client via the provided URI by the user.
// //        *
// //        * - 'services' table will be created if not already and stores every microservice
// //        * that is apart of the application.
// //        *
// //        * - Information is collected if the microservice is containerized
// //        *
// //        * - 'communications' table will be created which creates a new row entry for every
// //        * endpoint that the user Request travels through (tracked with hpropograte)
// //        */
// //       postgres.connect(this.config);
// //       postgres.services(this.config);
// //       dockerized ? postgres.docker(this.config) : postgres.health(this.config);
// //       if (database.connection === 'REST') {
// //         return postgres.communications(this.config);
// //       }
// //     } else {
// //       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
// //     }
// //   }

// //   async kafka() {
// //     // Test metrics server connection
// //     await utilities.testMetricsQuery(this.config);

// //     if (this.config.database.type === 'MongoDB') {
// //       mongo.connect(this.config);
// //       mongo.serverQuery(this.config);
// //     }

// //     else if (this.config.database.type === 'PostgreSQL') {
// //       postgres.connect(this.config);
// //       postgres.serverQuery(this.config);
// //     } else {
// //       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
// //     }
// //   }

// //   async kubernetes() {
// //     // Test metrics server connection
// //     await utilities.testMetricsQuery(this.config);

// //     if (this.config.database.type === 'MongoDB') {
// //       await mongo.connect(this.config);
// //       await mongo.storeGrafanaAPIKey(this.config);
// //       //await mongo.createGrafanaDashboards(this.config);
// //       mongo.serverQuery(this.config);
// //       // return mongo.modifyMetrics(this.config);
// //     }

// //     else if (this.config.database.type === 'PostgreSQL') {
// //       postgres.connect(this.config);
// //       postgres.serverQuery(this.config);
// //     } else {
// //       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
// //     }
// //   }

// //   async docker () {
// //     await utilities.testMetricsQuery(this.config);
// //     if (this.config.database.type === 'MongoDB') {
// //       await mongo.connect(this.config);
// //       await mongo.storeGrafanaAPIKey(this.config);
// //       mongo.serverQuery(this.config);
// //       // return mongo.modifyMetrics(this.config);
// //     } else if (this.config.database.type === 'PostgreSQL') {
// //       postgres.connect(this.config);
// //       postgres.serverQuery(this.config);
// //     } else {
// //       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
// //     }
// //   }

// //   ServerWrapper(server, proto, methods) {
// //     /**
// //      * Wraps the gRPC server object to automatically write logs to provided DB
// //      * @param {*} server
// //      * @param {*} proto
// //      * @param {*} methods
// //      */
// //     const { database } = this.config;
// //     if (database.type === 'MongoDB') {
// //       return new MongoServerWrapper(server, proto, methods, this.config);
// //     }
// //     if (database.type === 'PostgreSQL') {
// //       return new PostgresServerWrapper(server, proto, methods, this.config);
// //     }
// //     return null;
// //   }

// //   ClientWrapper(client, service) {
// //     /**
// //      * Wraps the gRPC client to automatically write logs to provided DB
// //      *
// //      * @param {*} client
// //      * @param {*} service
// //      */
// //     const { database } = this.config;
// //     if (database.type === 'MongoDB') {
// //       return new MongoClientWrapper(client, service, this.config);
// //     }
// //     if (database.type === 'PostgreSQL') {
// //       return new PostgresClientWrapper(client, service, this.config);
// //     }
// //     return null;
// //   }

// //   link(client, server) {
// //     /**
// //      * Allows the passthrough of metadata from gRPC server to gRPC client
// //      *
// //      * @param {*} client
// //      * @param {*} servere
// //      */
// //     client.metadata = server.metadataHolder;
// //   }
// // }

// // export default Chronos;
// // chronos.ts

// import hpropagate from 'hpropagate';
// import postgres from './controllers/postgres';
// import mongo from './controllers/mongo';
// import MongoClientWrapper from './wrappers/MongoClientWrapper';
// import MongoServerWrapper from './wrappers/MongoServerWrapper';
// import PostgresClientWrapper from './wrappers/PostgresClientWrapper';
// import PostgresServerWrapper from './wrappers/PostgresServerWrapper';
// import utilities from './controllers/utilities';

// // Optional: Define interfaces for your configuration.
// interface DatabaseConfig {
//   type: 'MongoDB' | 'PostgreSQL';
//   URI: string;
//   connection?: string;
// }

// interface ChronosConfig {
//   microservice: string;
//   interval: number;
//   dockerized?: boolean;
//   database: DatabaseConfig;
//   notifications?: any; // Update this type as needed.
// }

// class Chronos {
//   public config: ChronosConfig;

//   constructor(config: ChronosConfig) {
//     if (!config) {
//       throw new Error('Chronos config is undefined');
//     }
//     // Validate all input fields exist and setup notifications.
//     config = utilities.validateInput(config);
//     config = utilities.addNotifications(config);
//     this.config = config;
//   }

//   /**
//    * Inserts a unique x-correlating-id into the headers of each request/response.
//    */
//   propagate(): void {
//     hpropagate({ propagateInResponses: true });
//   }

//   /**
//    * Main controller for tracking the microservice.
//    */
//   track(): any {
//     const { database, dockerized } = this.config;

//     if (database.type === 'MongoDB') {
//       mongo.connect(this.config);
//       mongo.services(this.config);
//       dockerized ? mongo.docker(this.config) : mongo.health(this.config);

//       if (database.connection === 'REST') {
//         return mongo.communications(this.config);
//       }
//     } else if (database.type === 'PostgreSQL') {
//       postgres.connect(this.config);
//       postgres.services(this.config);
//       dockerized ? postgres.docker(this.config) : postgres.health(this.config);

//       if (database.connection === 'REST') {
//         return postgres.communications(this.config);
//       }
//     } else {
//       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
//     }
//   }

//   /**
//    * Kafka-related tasks.
//    */
//   async kafka(): Promise<void> {
//     // If testMetricsQuery is nested under helpers, use utilities.helpers.testMetricsQuery.
//     await utilities.helpers.testMetricsQuery(this.config);

//     if (this.config.database.type === 'MongoDB') {
//       mongo.connect(this.config);
//       mongo.serverQuery(this.config);
//     } else if (this.config.database.type === 'PostgreSQL') {
//       postgres.connect(this.config);
//       postgres.serverQuery(this.config);
//     } else {
//       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
//     }
//   }

//   /**
//    * Kubernetes-related tasks.
//    */
//   async kubernetes(): Promise<void> {
//     await utilities.helpers.testMetricsQuery(this.config);

//     if (this.config.database.type === 'MongoDB') {
//       await mongo.connect(this.config);
//       await mongo.storeGrafanaAPIKey(this.config);
//       mongo.serverQuery(this.config);
//     } else if (this.config.database.type === 'PostgreSQL') {
//       postgres.connect(this.config);
//       postgres.serverQuery(this.config);
//     } else {
//       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
//     }
//   }

//   /**
//    * Docker-related tasks.
//    */
//   async docker(): Promise<void> {
//     await utilities.helpers.testMetricsQuery(this.config);

//     if (this.config.database.type === 'MongoDB') {
//       await mongo.connect(this.config);
//       await mongo.storeGrafanaAPIKey(this.config);
//       mongo.serverQuery(this.config);
//     } else if (this.config.database.type === 'PostgreSQL') {
//       postgres.connect(this.config);
//       postgres.serverQuery(this.config);
//     } else {
//       throw new Error('The only allowed database types are MongoDB and PostgreSQL');
//     }
//   }

//   /**
//    * Wraps the gRPC server to automatically write logs to the provided DB.
//    */
//   ServerWrapper(server: any, proto: any, methods: any): MongoServerWrapper | PostgresServerWrapper | null {
//     const { database } = this.config;
//     if (database.type === 'MongoDB') {
//       return new MongoServerWrapper(server, proto, methods, this.config);
//     }
//     if (database.type === 'PostgreSQL') {
//       return new PostgresServerWrapper(server, proto, methods, this.config);
//     }
//     return null;
//   }

//   /**
//    * Wraps the gRPC client to automatically write logs to the provided DB.
//    */
//   ClientWrapper(client: any, service: any): MongoClientWrapper | PostgresClientWrapper | null {
//     const { database } = this.config;
//     if (database.type === 'MongoDB') {
//       return new MongoClientWrapper(client, service, this.config);
//     }
//     if (database.type === 'PostgreSQL') {
//       return new PostgresClientWrapper(client, service, this.config);
//     }
//     return null;
//   }

//   /**
//    * Links gRPC client and server metadata.
//    */
//   link(client: any, server: any): void {
//     client.metadata = server.metadataHolder;
//   }
// }

// export default Chronos;
// chronos.ts

// 
import hpropagate from 'hpropagate';

import postgres from './controllers/postgres';
import mongo from './controllers/mongo';
import MongoClientWrapper from './wrappers/MongoClientWrapper';
import MongoServerWrapper from './wrappers/MongoServerWrapper';
import PostgresClientWrapper from './wrappers/PostgresClientWrapper';
import PostgresServerWrapper from './wrappers/PostgresServerWrapper';
import utilities from './controllers/utilities';

// Define interfaces for your configuration.
interface DatabaseConfig {
  type: 'MongoDB' | 'PostgreSQL';
  URI: string;
  connection?:'REST' | 'gRPC';

}

interface ChronosConfig {
  microservice: string;
  interval: number;
  mode:'kubernetes' | 'kafka' | 'microservices' | 'docker'; // <-- Added mode property
  dockerized?: boolean;
  database: DatabaseConfig;
  notifications?: any; // Update this type as needed.
}

class Chronos {
  public config: ChronosConfig;

  constructor(config: ChronosConfig) {
    if (!config) {
      throw new Error('Chronos config is undefined');
    }
    // Use the helpers functions from utilities
    config = utilities.helpers.validateInput(config);
    config = utilities.helpers.addNotifications(config);
    this.config = config;
  }

  /**
   * Inserts a unique x-correlating-id into the headers of each request/response.
   */
  propagate(): void {
    hpropagate({ propagateInResponses: true });
  }

  /**
   * Main controller for tracking the microservice.
   */
  track(): any {
    const { database, dockerized } = this.config;

    if (database.type === 'MongoDB') {
      mongo.connect(this.config);
      mongo.services(this.config);
      dockerized ? mongo.docker(this.config) : mongo.health(this.config);

      if (database.connection === 'REST') {
        return mongo.communications(this.config);
      }
    } else if (database.type === 'PostgreSQL') {
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

  /**
   * Kafka-related tasks.
   */
  async kafka(): Promise<void> {
    // Call testMetricsQuery from the helpers object
    await utilities.helpers.testMetricsQuery(this.config);

    if (this.config.database.type === 'MongoDB') {
      mongo.connect(this.config);
      mongo.serverQuery(this.config);
    } else if (this.config.database.type === 'PostgreSQL') {
      postgres.connect(this.config);
      postgres.serverQuery(this.config);
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  /**
   * Kubernetes-related tasks.
   */
  async kubernetes(): Promise<void> {
    await utilities.helpers.testMetricsQuery(this.config);

    if (this.config.database.type === 'MongoDB') {
      await mongo.connect(this.config);
      await mongo.storeGrafanaAPIKey(this.config);
      mongo.serverQuery(this.config);
    } else if (this.config.database.type === 'PostgreSQL') {
      postgres.connect(this.config);
      postgres.serverQuery(this.config);
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  /**
   * Docker-related tasks.
   */
  async docker(): Promise<void> {
    await utilities.helpers.testMetricsQuery(this.config);

    if (this.config.database.type === 'MongoDB') {
      await mongo.connect(this.config);
      await mongo.storeGrafanaAPIKey(this.config);
      mongo.serverQuery(this.config);
    } else if (this.config.database.type === 'PostgreSQL') {
      postgres.connect(this.config);
      postgres.serverQuery(this.config);
    } else {
      throw new Error('The only allowed database types are MongoDB and PostgreSQL');
    }
  }

  /**
   * Wraps the gRPC server to automatically write logs to the provided DB.
   */
  ServerWrapper(server: any, proto: any, methods: any): MongoServerWrapper | PostgresServerWrapper | null {
    const { database } = this.config;
    if (database.type === 'MongoDB') {
      return new MongoServerWrapper(server, proto, methods, this.config);
    }
    if (database.type === 'PostgreSQL') {
      return new PostgresServerWrapper(server, proto, methods, this.config);
    }
    return null;
  }

  /**
   * Wraps the gRPC client to automatically write logs to the provided DB.
   */
  ClientWrapper(client: any, service: any): MongoClientWrapper | PostgresClientWrapper | null {
    const { database } = this.config;
    if (database.type === 'MongoDB') {
      return new MongoClientWrapper(client, service, this.config);
    }
    if (database.type === 'PostgreSQL') {
      return new PostgresClientWrapper(client, service, this.config);
    }
    return null;
  }

  /**
   * Links gRPC client and server metadata.
   */
  link(client: any, server: any): void {
    client.metadata = server.metadataHolder;
  }
}

export default Chronos;
