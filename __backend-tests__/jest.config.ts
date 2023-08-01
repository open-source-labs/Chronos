import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testMatch: ['**/__backend-tests__/**/*.test.ts'],
    testEnvironment: 'node',
};

export default config;
  