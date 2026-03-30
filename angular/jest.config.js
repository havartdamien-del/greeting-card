module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['/app/setup-jest.ts'],
  testEnvironment: 'jsdom',
};

