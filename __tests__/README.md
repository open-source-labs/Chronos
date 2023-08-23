# Testing 

### Preparation
###
### Frontend Testing

For frontend testing, ensure you've prepared your environment as follows:

1. React Testing Library versions 13+ require React v18. If your project uses an older version of React, be sure to install version 12
```
npm install --save-dev @testing-library/react@12
``` 
2. install additional packages
```
npm install -g jest
npm i @jest/types
npm i ts-jest
npm i jest-environment-jsdom
npm i --save-dev @types/jest @testing-library/jest-dom
<!-- npm i --save-dev @types/jest -->
npm i @types/node
npm install -D ts-node
```
3. create jest.config.js 
```js
module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['./jest_setup/windowMock.js'],
  testEnvironment: "jsdom",
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest_setup/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/jest_setup/styleMock.js',
  },
  collectCoverage: true,
  types: ["jest","node"],
};
```
4. make sure jest_setup folder is at root directory of Chronos with styleMock.js and windowMock.js
  ```js
  styleMock.js
  ```
  ```js
  module.exports = {};
  ```
  ```js
  windowMock.js
  ```
  ```js
  // Mock window environment
  window.require = require;

  // Mock import statements for Plotly
  window.URL.createObjectURL = () => {};

  // Mock get context
  HTMLCanvasElement.prototype.getContext = () => {};
  ```
5. update database info inside `test_settings.json` 

6. use `npm run test` to run jest tests
###
### Backend Testing

For backend testing, ensure you've prepared your environment as follows:

1. create `jest.config.js`
```js
module.exports = {
  roots: ['<rootDir>'], // Set the root directory for test files (adjust this path to your test folder)
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/'],
};
```
2. install additional packages
```
npm i mongodb-memory-server
```
6. use `npm run backend-test` to run jest tests

### End-to-End Testing

Perform end-to-end testing with the following steps:

1. install the following packages 
```
npm i selenium-webdriver
npm i chromedriver
```

2. use `npm run dev:app` to start the app

3. use `./node_modules/.bin/chromedriver` to run the Chromedriver executable

4. use `npm run start:e2e` to run the end-to-end tests

## Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

Read our [contributing README](../../CONTRIBUTING.md) to further learn how you can take part in improving Chronos.

