const { validateInput, addNotifications } = require('../../controllers/helpers');
const { expect } = require('chai');

describe("'helpers.js' tests", () => {

  /**
   * Tests for helpers.validateInput
   */
  describe("checking 'validateInput' functionality", () => {
    let config;
    beforeEach(() => {
      config = {
        microservice: 'books',
        interval: 2000,
        dockerized: true,
        database: {
          type: 'PostgreSQL',
          URI: 'testURI',
        },
      };
    });

    it('should not throw error for a valid config file', () => {
      expect(() => validateInput(config)).to.not.throw();
    });

    it("should throw error for missing or invalid 'microservice' property", () => {
      const errRegex = /Invalid input "microservice": Please provide a name for your microservice/;

      // Missing microservice property
      delete config['microservice'];
      expect(() => validateInput(config)).to.throw(errRegex);

      // Invalid microservice property
      config.microservice = 007;
      expect(() => validateInput(config)).to.throw(errRegex);
    });

    it("should throw error for missing or invalid 'database' property", () => {
      const errRegex = /Invalid or missing input "database": Must be an object with properties type and URI/;

      // Missing database property
      delete config['database'];
      expect(() => validateInput(config)).to.throw(errRegex);

      // Invalid database property
      config['database'] = ['PostgreSQL', 'testURI'];
      expect(() => validateInput(config)).to.throw(errRegex);
    });

    it("should throw error for missing or invalid 'database.type'", () => {
      const errRegex = /Invalid input "database type": Chronos supports PostgreSQL and MongoDB/;

      // Missing database.type
      delete config['database']['type'];
      expect(() => validateInput(config)).to.throw(errRegex);

      // Invalid database.type
      config['database']['type'] = 'Fake Database';
      expect(() => validateInput(config)).to.throw(/Fake Database/g);
    });

    it("should throw error for missing or invalid 'database.URI'", () => {
      const errRegex = /Invalid input "database URI": Please provide the URI to your database/;

      // Missing database.URI
      delete config['database']['URI'];
      expect(() => validateInput(config)).to.throw(errRegex);

      // Invalid database.URI
      config['database']['URI'] = { foo: 'bar' };
      expect(() => validateInput(config)).to.throw(errRegex);
    });

    it("should not overwrite user-provided 'interval' or 'dockerized' property", () => {
      validateInput(config);
      expect(config.interval).to.not.equal(10000);
      expect(config.dockerized).to.not.equal(false);
    });

    it("should provide default 'interval' for missing 'interval' property", () => {
      delete config.interval;
      validateInput(config);
      expect(config.interval).to.equal(10000);
    });

    it("should provide default 'dockerized' for missing 'dockerized' property", () => {
      delete config.dockerized;
      validateInput(config);
      expect(config.dockerized).to.equal(false);
    });
  });

  /**
   * Tests for helpers.addNotifications
   */
  describe("checking 'addNotifications' functionality", () => {
    let config;
    beforeEach(() => {
      config = {
        microservice: 'books',
        interval: 2000,
        dockerized: false,
        database: {
          type: 'PostgreSQL',
          URI: 'testURI',
        },
        notifications: [
          {
            type: 'slack',
            settings: {
              slackurl: 'test-slack-url',
            },
          },
        ],
      };
    });

    it('should not throw an error for a valid notfications property', () => {
      expect(() => addNotifications(config)).to.not.throw();
    });

    it('should throw an error for unsupported notfication methods', () => {
      const method = {
        type: 'call',
        settings: {
          number: '555-555-5555',
        },
      };
      const errRegex = /"call" is not a supported notification method for Chronos/;

      config.notifications.push(method);
      expect(() => addNotifications(config)).to.throw(errRegex);
    });
    it('should add a new property to the config object for every notification method', () => {
      addNotifications(config);
      expect(config).to.haveOwnProperty('slack');
      expect(config.slack).to.deep.equal({ slackurl: 'test-slack-url' });
    });
  });
});
