module.exports = {
  rootDir: '../../',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.internals/tests/setup.js'],
  moduleNameMapper: {
    '#(.*)$': '<rootDir>/src/$1',
    '@containers(.*)$': '<rootDir>/src/containers/$1',
    '@components(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.internals/tests/mocks/image.js',
  },
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  coverageDirectory: '<rootDir>/.internals/tests/coverage',
  collectCoverageFrom: ['../src/**/*.{ts,tsx}', '!../src/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/containers/App', '<rootDir>/src/containers/NotFound'],
};
