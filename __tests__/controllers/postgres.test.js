const postgres = require('../../controllers/postgres');
// const { Client } = require('pg');

describe("'postgres.js' tests", () => {
  it('should have the connect, services, communications, health, and docker methods', () => {
    expect(postgres).toHaveProperty('connect');
    expect(postgres).toHaveProperty('services');
    expect(postgres).toHaveProperty('communications');
    expect(postgres).toHaveProperty('health');
    expect(postgres).toHaveProperty('docker');
  });

  // beforeAll(async () => {
  //   const testURI =
  //     'postgres://fobcctdj:rJwA74L7YXjzDOX1lrcCebLtOu3nRPbk@ruby.db.elephantsql.com:5432/fobcctd';
  //   let pool = new Client({ connectionString: testURI });
  //   await pool.connect().then(() => console.log('good job'));
  // }, 10000);
  xdescribe("'postgres.connect' tests", () => {
    let test = {
      database: {
        type: 'PostgreSQL',
        URI:
          'postgres://fobcctdj:rJwA74L7YXjzDOX1lrcCebLtOu3nRPbk@ruby.db.elephantsql.com:5432/fobcctd',
        // 'testing',
      },
      microservice: 'proxy',
      interval: 1000,
    };

    // beforeAll(async () => {
    //   await postgres.connect(test);
    // });

    it('should connect to the database using user-provided URI string', () => {
      expect(async () => await postgres.connect(test)).not.toThrow();
    });

    // test.database['URI'] = 'notvalid';
    it('should throw an error for invalid database URI', () => {
      expect(async () => await postgres.connect(test)).toThrow();
    });
  });

  describe("'postgres.services' tests", () => {
    it("should create a 'services' table if one does not yet exist", () => {
      expect(() => postgres.services(test).not.toThrow());
    });
    it("should not create a 'services' table if one already exists", () => {
      expect(() => postgres.services(test).not.toThrow());
    });
    it("should insert a new row into the 'services' table with the expected values");
    it("should throw an error for invalid 'interval' or 'microservice' values");
  });

  xdescribe("'postgres.communications' tests", () => {
    it("should create a 'communications' table if one does not yet exist");
    it("should not create a 'communications' table if already exists");
    it("should insert a new row into the 'communications' table with the expected values");
    it("should throw an error for invalid 'interval' or 'microservice' values");
    it('should return middleware and invoke next at the end of it');
    it('should invoke the slack alert if the slack information was provided');
    it('should invoke the email alert if the email information was provided');
  });

  xdescribe("'postgres.health' tests", () => {
    it('should create a table with the microservice name as the table name for health');
    it('should insert a new row into the newly created table consisting of health information');
  });

  xdescribe("'postgres.docker' tests", () => {
    /* Docker middleware method needs refactoring - these tests should pass (TDD) */
    it(
      "should create a table with the name '{microservice}container' as the table name for container information"
    );
    it('should insert a new row into the newly created table consisting of container information');
    it('should be ignored if a container id is not found');
  });
});
