module.exports = {

  roots: ['<rootDir>'], // Set the root directory for test files (adjust this path to your test folder)

  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // Code coverage settings
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // Specify the test path patterns to ignore (frontend tests)
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  testTimeout: 40000
};
