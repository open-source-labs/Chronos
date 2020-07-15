// const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  setupFiles: ['<rootDir>/__tests__/setup/test-setup.js'],
  setupFilesAfterEnv: ['./__tests__/setup/windowMock.js'],
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__tests__/setup/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__tests__/setup/styleMock.js',
  },
  collectCoverage: true,
};
