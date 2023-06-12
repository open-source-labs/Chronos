import type { Config } from '@jest/types';

// module.exports = {
//   verbose: true,
//   setupFilesAfterEnv: ['./jest_setup/windowMock.js'],
//   testEnvironment: "jsdom",
//   preset: 'ts-jest/presets/js-with-ts',
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//       '<rootDir>/jest_setup/fileMock.js',
//     '\\.(css|less|scss)$': '<rootDir>/jest_setup/styleMock.js',
//   },
//   collectCoverage: true,
//   // types: ["jest","node"],
// };

// Convert to TypeScript
// Note: Configuring Jest to TypeScript following the docs seemed incorrect? 
// @jest/types is an npm package to use to create a typed Jest config 

const config: Config.InitialOptions = {
  verbose: true,
  setupFilesAfterEnv: ['./jest_setup/windowMock.js'],
  testEnvironment: "jsdom",
  preset: 'ts-jest/presets/js-with-ts',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest_setup/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/jest_setup/styleMock.js',
  },
  collectCoverage: true,
};

export default config;