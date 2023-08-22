//Issues with mongo memory server causing timeout for each test. Change file type from .txt to .js to run


const mongoose = require('mongoose');
const mongo = require('../chronos_npm_package/controllers/mongo');
const ServicesModel = require('../chronos_npm_package/models/ServicesModel');
const CommunicationModel = require('../chronos_npm_package/models/CommunicationModel');
const { connectDB, dropDB, dropCollections, uri } = require('./mockdbsetup');
const alert = require('../chronos_npm_package/controllers/alert');
const dockerHelper = require('../chronos_npm_package/controllers/dockerHelper');

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.mock('../chronos_npm_package/controllers/alert');
jest.useFakeTimers();
jest.spyOn(global, 'setInterval');

jest.mock('../chronos_npm_package/controllers/healthHelpers', () => {
  return [
    {
      time: Date.now(),
      metric: 'testMetric',
      value: 10,
      category: 'testCategory',
    },
    {
      time: Date.now(),
      metric: 'testMetric2',
      value: 12,
      category: 'testCategory2',
    },
  ];
});

jest.mock('../chronos_npm_package/controllers/mongo', () => ({
  ...jest.requireActual('../chronos_npm_package/controllers/mongo'),
  addMetrics: jest.fn(),
  getSavedMetricsLength: jest.fn(),
}));

const HealthModel = {
  insertMany: jest.fn(() => Promise.resolve()),
};
const HealthModelFunc = jest.fn(() => HealthModel);

jest.mock('../chronos_npm_package/controllers/dockerHelper', () => ({
  ...jest.requireActual('../chronos_npm_package/controllers/dockerHelper'),
  getDockerContainer: jest.fn(),
  readDockerContainer: jest.fn(),
}));

describe('mongo.connect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should connect to MongoDB database', async () => {
    await mongo.connect({ database: { URI: uri } });

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('MongoDB database connected at')
    );
  });

  test('should handle connection errors', async () => {
    const testDb = 'test';
    await mongo.connect({ database: { URI: testDb } });

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Error connecting to MongoDB:'),
      expect.any(String)
    );
  });
});

describe('mongo.services', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await connectDB();
  });

  afterEach(async () => {
    await dropCollections();
    await dropDB();
  });

  test('should create a new document', async () => {
    await mongo.services({ microservice: 'test2', interval: 'test2' });
    const savedService = await ServicesModel.findOne({ microservice: 'test2', interval: 'test2' });
    expect(savedService).toBeDefined(); // The document should be defined if it exists
  });
});

describe('mongo.communications', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await connectDB();
  });

  afterEach(async () => {
    await dropCollections();
    await dropDB();
  });

  test('should record request cycle and save communication to the database', async () => {
    const req = {};
    const res = {
      statusCode: 200,
      statusMessage: 'OK',
      getHeaders: () => ({ 'x-correlation-id': 'correlation-id-123' }),
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    };
    const middleware = mongo.communications({ microservice: 'test3', slack: null, email: null });
    await middleware(req, res, () => {});
    const savedCommunication = await CommunicationModel.findOne({ microservice: 'test3' });
    expect(savedCommunication).toBeDefined();
  });

  test('should send an alert', async () => {
    const req = {};
    const res = {
      statusCode: 400,
      statusMessage: 'Not Found',
      getHeaders: () => ({ 'x-correlation-id': 'correlation-id-123' }),
      on: jest.fn((event, callback) => {
        if (event === 'finish') {
          callback();
        }
      }),
    };
    const middleware = mongo.communications({
      microservice: 'test4',
      slack: 'slackTest',
      email: 'emailTest',
    });
    await middleware(req, res, () => {});
    expect(alert.sendSlack).toHaveBeenCalledTimes(1);
    expect(alert.sendEmail).toHaveBeenCalledTimes(1);
    expect(alert.sendSlack).toHaveBeenCalledWith(res.statusCode, res.statusMessage, 'slackTest');
    expect(alert.sendEmail).toHaveBeenCalledWith(res.statusCode, res.statusMessage, 'emailTest');
  });
});

describe('mongo.health', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    await connectDB();
  });

  afterEach(async () => {
    jest.clearAllTimers();
    await dropCollections();
    await dropDB();
  });

  test('should collect data after the set interval', async () => {
    await mongo.health({ microservice: 'mongo.health test', interval: 1000, mode: 'testMode' });
    jest.advanceTimersByTime(1000);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    expect(collectHealthData).toHaveBeenCalled();
  });

  test('should save metrics to database', async () => {
    const mockData = [
      {
        time: Date.now(),
        metric: 'testMetric',
        value: 10,
        category: 'testCategory',
      },
      {
        time: Date.now(),
        metric: 'testMetric2',
        value: 12,
        category: 'testCategory2',
      },
    ];
    await mongo.health({ microservice: 'mongo.health test', interval: 1000, mode: 'testMode' });
    jest.advanceTimersByTime(1000);
    expect(collectHealthData).toHaveReturnedWith(mockData);
    expect(HealthModelFunc).toHaveBeenCalled();
    expect(HealthModel).toHaveBeenCalled();
  });
});

describe('mongo.docker', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    await connectDB();
  });

  afterEach(async () => {
    await dropCollections();
    await dropDB();
  });

  test('should collect docker container information', async () => {
    const microservice = 'mongo.docker test';
    const mockContainerData = {
      containername: microservice,
      containerId: '234',
      platform: 'testPlatform',
      startime: Date.now(),
    };
    const mockReadDockerContainerData = {
      ...mockContainerData,
      memoryusage: 234,
      memorylimit: 234,
      memorypercent: 32,
      cpupercent: 45,
      networkreceived: 345,
      networksent: 345,
      processcount: 343,
      restartcount: 12,
      time: Date.now(),
    };

    dockerHelper.getDockerContainer.mockResolvedValue(mockContainerData);
    dockerHelper.readDockerContainer.mockResolvedValue(mockReadDockerContainerData);

    await mongo.docker({ microservice: microservice, interval: 1000, mode: 'testMode' });
    expect(dockerHelper.getDockerContainer).toHaveBeenCalledWith(microservice);
    jest.advanceTimersByTime(1000);
    expect(dockerHelper.readDockerContainer).toHaveBeenCalledWith(mockContainerData);
  });
});
