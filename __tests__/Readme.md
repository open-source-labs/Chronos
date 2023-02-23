# Testing 

### Preparation

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
npm i --save-dev @types/jest
npm i @types/node
```
3. create jest.config.js 
```
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

  styleMock.js
  ```
  module.exports = {};
  ```
  windowMock.js
  ```
  // Mock window environment
  window.require = require;

  // Mock import statements for Plotly
  window.URL.createObjectURL = () => {};

  // Mock get context
  HTMLCanvasElement.prototype.getContext = () => {};
  ```
5. update data base info inside test_settings.json 

6. use `npm run test` to run jest tests

### Contributing

Chronos hopes to inspire an active community of both users and developers. For questions, comments, or contributions, please submit a pull request.

### People
[Snow X. Bai](https://github.com/xueapp)
[Taylor Zhang](https://github.com/taylrzhang)
[Tim Lee](https://github.com/timlee12)
[Roberto Meloni](https://github.com/RobertoRueMeloni)
