module.exports = {
  rootDir: '.',
  preset: 'ts-jest',
  testMatch: [ '<rootDir>/tests/**/*.spec.ts' ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.spec.ts',
    '!<rootDir>/src/**/__*__/*',
  ],
  moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json' ],
  testEnvironment: 'node',
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  coverageReporters: [ "lcov", "text" ]
}