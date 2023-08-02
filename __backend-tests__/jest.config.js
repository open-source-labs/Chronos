module.exports = {
    testEnvironment: 'node', // Use the Node.js environment for testing
    roots: ['<rootDir>/controllers'], // Set the root directory for test files (adjust this path to your test folder)
    
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', 
    
    // Code coverage settings
    collectCoverage: true, 
    coverageDirectory: 'coverage', 
  
    // Specify the test path patterns to ignore (frontend tests)
    testPathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  };
  