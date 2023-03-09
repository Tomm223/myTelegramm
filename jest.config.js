const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.jest')

const config = {
  coverageDirectory: 'coverage/jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  //   testPathIgnorePatterns: ['\\\\node_modules\\\\', '<rootDir>/cypress/'],
  //   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ['<rootDir>'],
  rootDir: '.',
  detectOpenHandles: true,
  errorOnDeprecated: false,
  showSeed: true,
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    // '^.+\\.test.jsx?$': 'babel-jest',
    '^.+\\.test.(ts|js)x?$': [
      'ts-jest',

      {
        rootDir: '.',
        isolatedModules: false,
        moduleNameMapper: {
          '~/(.*)': '<rootDir>/src/$1',
        },
      },
    ],
  },
}

module.exports = config
