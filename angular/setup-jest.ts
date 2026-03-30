// import 'jest-preset-angular/setup-jest';
//import 'jest-preset-angular';
import 'jest-preset-angular/setup-env/zone';

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Initialisation de l'environnement de test Angular
TestBed.initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


// import 'jest-preset-angular/setup-env/zone';

// Si vous utilisez des matchers custom (optionnel)
// import '@testing-library/jest-dom'; // pour des matchers comme toBeInTheDocument()

// // Pour réinitialiser les mocks entre chaque test (peut aussi se mettre dans jest.config)
// afterEach(() => {
//   jest.clearAllMocks();
// });