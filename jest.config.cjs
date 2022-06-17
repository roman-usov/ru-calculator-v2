module.exports = {
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  testEnvironment: '@happy-dom/jest-environment',
  coveragePathIgnorePatterns: [
    'node_modules',
    '<roodDir>/src/__tests__',
    ".parcel-cache"
  ],
  // setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
};
