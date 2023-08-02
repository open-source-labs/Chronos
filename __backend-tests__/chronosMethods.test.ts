import { validateInput, addNotifications } from '../chronos_npm_package/controllers/utilities.js';
import Chronos from '../chronos_npm_package/chronos.js';

//mock the utilites module
jest.mock('../chronos_npm_package/controllers/utilities.js', () => ({
  validateInput: jest.fn((config: any) => config),
  addNotifications: jest.fn((config: any) => config),
}));

describe('Chronos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error if config is undefined', () => {
    expect(() => new Chronos(undefined)).toThrow('Chronos config is undefined');
  });

  test('should call validateInput and addNotifications with the provided config', () => {
    const config: any = {
      microservice: 'docker',
      database: {
        connection: 'REST',
        type: 'MongodDB',
        URI: 'mongodb+srv://edwin:edwin@cluster0.2miysdw.mongodb.net/',
      },
      interval: 60000,
      dockerized: true,
      jmxuri: 'testurl.net',
      port: 3000,
      mode: 'microservices',
      promService: 'prometheus-service',
      promPort: 8080,
    };
    new Chronos(config);

    expect(validateInput).toHaveBeenCalledWith(config);
    expect(addNotifications).toHaveBeenCalledWith(config);
  });

  test('should store the validated config in the instance', () => {
    const config: any = {
      //config file
      microservice: 'docker',
      database: {
        connection: 'REST',
        type: 'MongodDB',
        URI: 'mongodb+srv://edwin:edwin@cluster0.2miysdw.mongodb.net/',
      },
      interval: 60000,
      dockerized: true,
      jmxuri: 'testurl.net',
      port: 3000,
      mode: 'microservices',
      promService: 'prometheus-service',
      promPort: 8080,
    };
    const chronos = new Chronos(config);

    expect(chronos.config).toEqual(config);
  });
});
