const Chronos = require('../chronos_npm_package/chronos.js');
const helpers = require('../chronos_npm_package/controllers/utilities.js');
const hpropagate = require('hpropagate');

// utilities.addNotifications

// Mock the utilities module functions
jest.mock('../chronos_npm_package/controllers/utilities.js', () => ({
  validateInput: jest.fn(config => config),
  addNotifications: jest.fn(config => config),
}));

// mock propogate from Chronos
jest.mock('hpropagate');

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
    test('should check if track function works', () => {
      //check if we can destructure database and dockerized from config
      
    })
  });
});
