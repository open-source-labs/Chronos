//const mongoose = require('mongoose');
const mongo = require('../../chronos_npm_package/controllers/mongo');
const ServicesModel = require( '../../chronos_npm_package/models/ServicesModel');
require('dotenv').config();

jest.mock('mongoose', () => {
    return {
      connect: jest.fn().mockResolvedValue(undefined),
    };
});

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('mongo.connect', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should connect to MongoDB database', async () => {
        const databaseURI = 'mongodb://localhost:27017/testdb';
        await mongo.connect({ databaseURI });
        expect(mongoose.connect).toHaveBeenCalledWith(databaseURI);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('MongoDB database connected at'));
    });

    test('should handle connection error', async () => {
        const errorMessage = 'Connection failed';
        const databaseURI = 'mongodb://localhost:27017/testdb';

        jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error(errorMessage));

        await mongo.connect({ databaseURI });
        expect(mongoose.connect).toHaveBeenCalledWith(databaseURI);
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(errorMessage));

    });
});

describe('mongo.services', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new document', async () => {

    });
});