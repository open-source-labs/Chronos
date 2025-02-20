import hpropagate from 'hpropagate';
import postgres from './controllers/postgres.js';
import mongo from './controllers/mongo.js';
import MongoClientWrapper from './wrappers/MongoClientWrapper.js';
import MongoServerWrapper from './wrappers/MongoServerWrapper.js';
import PostgresClientWrapper from './wrappers/PostgresClientWrapper.js';
import PostgresServerWrapper from './wrappers/PostgresServerWrapper.js';
import utilities from './controllers/utilities.js';

// Define interfaces for your configuration.
interface DatabaseConfig {
  type: 'MongoDB' | 'PostgreSQL';
  URI: string;
  connection?: 'REST' | 'gRPC';
}

interface ChronosConfig {
  microservice: string;
  interval: number;
  mode: 'kubernetes' | 'kafka' | 'microservices' | 'docker'; // <-- Added mode property
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
  ServerWrapper(
    server: any,
    proto: any,
    methods: any
  ): MongoServerWrapper | PostgresServerWrapper | null {
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
