export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        baseUrl: '.',
        paths: {
          '@api/*': ['src/api/*'],
          '@base/*': ['src/core/base/*'],
          '@calculations/*': ['src/core/calculations/*'],
          '@constants/*': ['src/core/constants/*'],
          '@core/*': ['src/core/*'],
          '@indicators/*': ['src/indicators/*'],
          '@utils/*': ['src/core/utils/*'],
          '@types/*': ['src/core/types/*'],
          '@tests/*': ['tests/*']
        }
      }
    }]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@base/(.*)$': '<rootDir>/src/core/base/$1',
    '^@calculations/(.*)$': '<rootDir>/src/core/calculations/$1',
    '^@constants/(.*)$': '<rootDir>/src/core/constants/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@indicators/(.*)$': '<rootDir>/src/indicators/$1',
    '^@utils/(.*)$': '<rootDir>/src/core/utils/$1',
    '^@types/(.*)$': '<rootDir>/src/core/types/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/api/test-ta-api.ts'
  ],
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 10000
}