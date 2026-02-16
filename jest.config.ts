/** jest.config.ts */
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Look for test files in a __tests__ folder OR files ending in .test.ts
  testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts'],
  // Map .js extensions in imports to their .ts source files (ESM-style imports)
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // Collect coverage from all source files, excluding test files themselves
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/index.ts',
  ],
};

export default config;
