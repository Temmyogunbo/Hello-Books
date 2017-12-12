module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: [
    './node_modules/',
    'app/__tests__/__mocks__',
    'app/public',
    'app/__tests__/setup.js',

  ],
  setupTestFrameworkScriptFile: './app/__tests__/setup.js',
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/index.html',
    '!app/src/socket',
    '!app/src/sass',
  ],
  coverageDirectory: './coverage', 
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
        '<rootDir>/app/__tests__/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/app/__tests__/__mocks__/styleMock.js'
  },
};
