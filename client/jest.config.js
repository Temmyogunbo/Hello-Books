module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: [
    './server/',
    './node_modules/',
    'client/app/test/',
    'client/app/public'
  ],
  setupTestFrameworkScriptFile: './client/app/test/setup.js',
  collectCoverageFrom: [
    'client/app/**/*.{js,jsx}',
    '!client/app/index.js',
    '!client/app/socket',
    '!client/app/sass',
  ],
  moduleFileExtensions: ['js', 'jsx'],
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
//         '<rootDir>/client/__tests__/__mocks__/fileMock.js',
//     '\\.(css|scss)$': '<rootDir>/client/app/test/__mocks__/styleMock.js'
//   },
};
