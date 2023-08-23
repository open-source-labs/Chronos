const { EcoTwoTone } = require('@material-ui/icons');
const Chronos = require('../chronos_npm_package/chronos.js');
const helpers = require('../chronos_npm_package/controllers/utilities.js');
const hpropagate = require('hpropagate');
const mongo = require('../chronos_npm_package/controllers/mongo.js');
const postgres = require('../chronos_npm_package/controllers/postgres.js');

// Mock the utilities module functions
jest.mock('../chronos_npm_package/controllers/utilities.js', () => ({
  validateInput: jest.fn(config => config),
  addNotifications: jest.fn(config => config),
  testMetricsQuery: jest.fn(config => config),
  getMetricsURI: jest.fn(config => config),
}));

// mock propogate from Chronos
jest.mock('hpropagate');

//mock fns found in track
jest.mock('../chronos_npm_package/controllers/mongo.js', () => ({
  connect: jest.fn(config => config),
  services: jest.fn(config => config),
  docker: jest.fn(config => config),
  health: jest.fn(config => config),
  communications: jest.fn(config => config),
  serverQuery: jest.fn(config => config),
  storeGrafanaAPIKey: jest.fn(config => config),
}));

jest.mock('../chronos_npm_package/controllers/postgres.js', () => ({
  connect: jest.fn(config => config),
  services: jest.fn(config => config),
  docker: jest.fn(config => config),
  health: jest.fn(config => config),
  communications: jest.fn(config => config),
  serverQuery: jest.fn(config => config),
}));

describe('Chronos Config', () => {
  afterEach(() => {
    // Clear mock function calls after each test
    jest.clearAllMocks();
  });

  test('should throw an error if config is undefined', () => {
    expect(() => new Chronos()).toThrow('Chronos config is undefined');
  });

  test('should call utilities functions with the correct parm', () => {
    const config = {
      microservice: 'test',
      interval: 300,
      mode: 'micro',
      dockerized: false,
      database: {
        connection: 'REST',
        type: process.env.CHRONOS_DB,
        URI: process.env.CHRONOS_URI,
      },
      notifications: [],
    };

    const chronos = new Chronos(config);

    // Ensure the config property is correctly set in the instance
    expect(chronos.config).toEqual(config);
    // Ensure the constructor called the validateInput and addNotifications functions
    expect(helpers.validateInput).toHaveBeenCalledWith(config);
    expect(helpers.addNotifications).toHaveBeenCalledWith(config);
  });

  describe('propagate', () => {
    test('should check if propagate func properply calls hpropagate', () => {
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'micro',
        dockerized: false,
        database: {
          connection: 'REST',
          type: process.env.CHRONOS_DB,
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };

      const chronos = new Chronos(config);
      chronos.propagate();
      expect(hpropagate).toHaveBeenCalledWith({ propagateInResponses: true });
    });
  });

  describe('track', () => {
    test('should check if track function for MongoDB works', () => {
      //check if we can destructure database and dockerized from config
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'micro',
        dockerized: true,
        database: {
          connection: 'REST',
          type: 'MongoDB',
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };
      const { database, dockerized } = config;
      const falseDock = { dockerized: false };
      const chronos = new Chronos(config);
      chronos.track();
      if (database.type === 'MongoDB') {
        expect(mongo.connect).toHaveBeenCalledWith(config);
        expect(mongo.services).toHaveBeenCalledWith(config);
        if (dockerized) expect(mongo.docker).toHaveBeenCalledWith(config);
        if (!falseDock) expect(mongo.health).toHaveBeenCalledWith(config);
        if (database.connection === 'REST') expect(mongo.communications).not.toBeUndefined();
      }
    });
    test('should check if track function for Postgres works', () => {
      //check if we can destructure database and dockerized from config
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'micro',
        dockerized: true,
        database: {
          connection: 'REST',
          type: 'PostgreSQL',
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };
      const { database, dockerized } = config;
      const falseDock = { dockerized: false };
      const chronos = new Chronos(config);
      chronos.track();
      if (database.type === 'PostgreSQL') {
        expect(postgres.connect).toHaveBeenCalledWith(config);
        expect(postgres.services).toHaveBeenCalledWith(config);
        if (dockerized) expect(postgres.docker).toHaveBeenCalledWith(config);
        if (!falseDock) expect(postgres.health).toHaveBeenCalledWith(config);
        if (database.connection === 'REST') expect(postgres.communications).not.toBeUndefined();
      }
    });
  });
  describe('kafka', () => {
    test('should check if kafka with MongoDB functional', async () => {
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'micro',
        dockerized: true,
        database: {
          connection: 'REST',
          type: 'MongoDB',
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };
      const { database, dockerized } = config;
      const falseDock = { dockerized: false };
      const chronos = new Chronos(config);
      chronos.kafka();
      await helpers.testMetricsQuery(config);
      if (database.type === 'MongoDB') {
        expect(mongo.connect).toHaveBeenCalledWith(config);
        expect(mongo.serverQuery).toHaveBeenCalledWith(config);
      }
    });
    test('should check if kafka with PostgreSQL is functional', async () => {
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'micro',
        dockerized: true,
        database: {
          connection: 'REST',
          type: 'PostgreSQL',
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };
      const { database, dockerized } = config;
      const falseDock = { dockerized: false };
      const chronos = new Chronos(config);
      chronos.kafka();
      await helpers.testMetricsQuery(config);
      if (database.type === 'PostgreSQL') {
        expect(postgres.connect).toHaveBeenCalledWith(config);
        expect(postgres.serverQuery).toHaveBeenCalledWith(config);
      }
    });
  });

  describe('kubernetes', () => {
    test('should check if kubernetes with mongodb is functional', async () => {
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'kubernetes',
        dockerized: true,
        database: {
          connection: 'REST',
          type: 'MongoDB',
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };
      const { database, dockerized } = config;
      const falseDock = { dockerized: false };
      const chronos = new Chronos(config);
      chronos.kubernetes();
      await helpers.testMetricsQuery(config);
      if (database.type === 'MongoDB') {
        await expect(mongo.connect).toHaveBeenCalledWith(config);
        await expect(mongo.storeGrafanaAPIKey).toHaveBeenCalledWith(config);
        expect(mongo.serverQuery).toHaveBeenCalledWith(config);
      }
      if (database.type === 'PostgreSQL') {
        expect(postgres.connect).toHaveBeenCalledWith(config2);
        expect(postgres.serverQuery).toHaveBeenCalledWith(config2);
      }
    });
    test('should check if kubernetes with PostGres is functional', async () => {
      const config = {
        microservice: 'test',
        interval: 300,
        mode: 'kubernetes',
        dockerized: true,
        database: {
          connection: 'REST',
          type: 'PostgreSQL',
          URI: process.env.CHRONOS_URI,
        },
        notifications: [],
      };
      const { database, dockerized } = config;
      const falseDock = { dockerized: false };
      const chronos = new Chronos(config);
      chronos.kubernetes();
      await helpers.testMetricsQuery(config);
      if (database.type === 'PostgreSQL') {
        expect(postgres.connect).toHaveBeenCalledWith(config);
        expect(postgres.serverQuery).toHaveBeenCalledWith(config);
      }
    });
  });
});
