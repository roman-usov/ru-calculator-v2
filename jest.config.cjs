module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/*.test.js',
  ],
  testEnvironment: '@happy-dom/jest-environment',
  coveragePathIgnorePatterns: [

  ],
  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
};
