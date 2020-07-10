const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__tests__/__mocks__/styleMock.js',
  },
};
