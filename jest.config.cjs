module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testEnvironment: '@happy-dom/jest-environment',
  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
};
