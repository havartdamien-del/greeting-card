// jest.config.ts
// const { createCjsPreset } = require('jest-preset-angular/presets');

// /** @type {import('jest').Config} */
// module.exports = {
//   ...createCjsPreset(),
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
//   testPathIgnorePatterns: [
//     '<rootDir>/node_modules/',
//     '<rootDir>/dist/',
//     '<rootDir>/src/test.ts', // fichier Karma par défaut
//   ],
// };

const { createCjsPreset } = require('jest-preset-angular/presets');

module.exports = {
  ...createCjsPreset(),

  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts',
  ],

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true
    }
  }
};

// const { createCjsPreset } = require('jest-preset-angular/presets');

// module.exports = {
//   ...createCjsPreset(),

//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],

//   testPathIgnorePatterns: [
//     '<rootDir>/node_modules/',
//     '<rootDir>/dist/',
//     '<rootDir>/src/test.ts',
//   ],

//   transform: {
//     '^.+\\.(ts|mjs|js|html)$': [
//       'ts-jest',
//       {
//         tsconfig: '<rootDir>/tsconfig.spec.json'
//       }
//     ]
//   }
// };