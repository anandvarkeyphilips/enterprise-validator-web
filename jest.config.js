const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/+(*.)+(spec).+(ts|js)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  collectCoverage: true,
//   collectCoverageFrom: [
//     "!src/app/error/*"
// ],
coveragePathIgnorePatterns:['src/app/error'],
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/enterprise-validator-ui',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
