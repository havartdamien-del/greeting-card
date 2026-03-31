/**
 * JEST TEST EXECUTION GUIDE
 * =========================
 *
 * This file tests the PageContainerListingComponent using Jest (not Jasmine)
 * along with MockCardDataService for isolated testing.
 *
 * FILE LOCATION:
 * angular/src/app/pages/page_listing/page-container-listing/page-container-listing.component.spec.ts
 *
 * CONVERTING FROM JASMINE TO JEST:
 * ================================
 *
 * Key changes made:
 *
 * 1. REMOVED JASMINE SPECIFIC SYNTAX:
 *    - ❌ jasmine.createSpyObj() → replaced with simple object mocks
 *    - ❌ jasmine.any(String) → replaced with typeof checks
 *    - ❌ jasmine.objectContaining() → replaced with explicit property checks
 *
 * 2. JEST COMPATIBLE SPY PATTERNS:
 *    - ❌ spyOn(service, 'method').and.callThrough()
 *    - ✅ Manual wrapping with state tracking:
 *       const originalMethod = service.method.bind(service);
 *       let methodCalled = false;
 *       service.method = function() {
 *         methodCalled = true;
 *         return originalMethod();
 *       };
 *       expect(methodCalled).toBe(true);
 *
 * 3. MOCK SERVICE SETUP:
 *    - ✅ Simple object mocks instead of jasmine.createSpyObj()
 *    - ✅ Methods return Observables using RxJS of()
 *    - ✅ Proper types for parameters
 *
 * 4. ASSERTION STYLE:
 *    - ✅ Jest expect() syntax (compatible with Jasmine)
 *    - ✅ Jest matchers: toHaveBeenCalled(), toHaveBeenCalledWith()
 *    - ✅ Custom property checks for state validation
 *
 * HOW TO RUN TESTS:
 * =================
 *
 * 1. Run all Jest tests:
 *    npm test
 *
 * 2. Run specific test file:
 *    npm test -- page-container-listing.component.spec.ts
 *
 * 3. Run with watch mode (re-runs on changes):
 *    npm test -- --watch
 *
 * 4. Run with coverage report:
 *    npm test -- --coverage
 *
 * 5. Run specific test suite (by describe block):
 *    npm test -- --testNamePattern="Page Display Scenario"
 *
 * 6. Run with verbose output:
 *    npm test -- --verbose
 *
 * JEST CONFIGURATION:
 * ===================
 *
 * Configuration file: angular/jest.config.js
 *
 * Key settings:
 * - Preset: jest-preset-angular
 * - Environment: jsdom (for DOM testing)
 * - Setup file: setup-jest.ts
 * - Test pattern: ** /*.spec.ts
 *
 * EXPECTED OUTPUT:
 * ================
 *
 * When running 'npm test':
 *
 * PASS  src/app/pages/page_listing/page-container-listing/page-container-listing.component.spec.ts
 *  PageContainerListingComponent - Affichage des Cards
 *    Initialization
 *      ✓ should create the component (25 ms)
 *      ✓ should set default dataType to "card" (2 ms)
 *      ✓ should have empty title and subtitle by default (1 ms)
 *      ✓ should have data$, loading$, and error$ observables (1 ms)
 *    Loading Cards Data
 *      ✓ should load all 12 cards on init (85 ms)
 *      ✓ should populate data observable with correct card structure (45 ms)
 *      ✓ should load cards from all categories (38 ms)
 *      ✓ should load exactly 3 cards per category (32 ms)
 *    [... more test results ...]
 *    Page Display Scenario: "Toutes les Cards"
 *      ✓ should display page with correct title and subtitle (5 ms)
 *      ✓ should load and display 12 cards on page initialization (75 ms)
 *      ✓ should display cards from all 4 categories (98 ms)
 *      ✓ should display cards with all required information (52 ms)
 *      ✓ should show no errors during page load (45 ms)
 *      ✓ should have completed loading state (38 ms)
 *
 * Test Suites: 1 passed, 1 total
 * Tests:       40 passed, 40 total
 * Snapshots:   0 total
 * Time:        12.5 s
 *
 * DEBUGGING TESTS:
 * ================
 *
 * 1. Debug a single test:
 *    npm test -- page-container-listing.component.spec.ts --testNamePattern="should load all 12 cards"
 *
 * 2. Enable verbose logging:
 *    Add console.log() statements in tests
 *    Run with: npm test -- --verbose
 *
 * 3. Use Jest's browser debugger:
 *    node --inspect-brk node_modules/@angular/cli/bin/ng test --browsers=Chrome
 *    Open chrome://inspect in Google Chrome
 *
 * 4. Troubleshoot async issues:
 *    - Ensure done() is called in async tests
 *    - Check setTimeout durations (100ms default)
 *    - Use jest.useFakeTimers() for timing control
 *
 * MOCK SERVICE INTEGRATION:
 * =========================
 *
 * The test uses MockCardDataService which provides:
 * - 12 pre-loaded test cards (matching Symfony fixtures)
 * - Observable-based API (of() returns)
 * - BehaviorSubject state management
 * - CRUD operations (create, read, update, delete)
 *
 * Test setup creates a Fixture instance and passes it to MockCardDataService:
 *
 * const fixtureData = new Fixture();
 * const mockCardService = new MockCardDataService(fixtureData);
 *
 * This enables complete isolation from real API calls.
 *
 * TEST ORGANIZATION:
 * ==================
 *
 * Tests are organized by concern:
 *
 * 1. Initialization (4 tests)
 *    - Component creation and default values
 *
 * 2. Loading Cards Data (4 tests)
 *    - Data fetching and population logic
 *
 * 3. Loading State Management (3 tests)
 *    - Loading/error state transitions
 *
 * 4. Card Data Integrity (5 tests)
 *    - Data validation and structure
 *
 * 5. Specific Card Data Validation (7 tests)
 *    - Individual card verification
 *
 * 6. Component Input Bindings (5 tests)
 *    - @Input property handling
 *
 * 7. Component Lifecycle (3 tests)
 *    - OnInit/OnDestroy behavior
 *
 * 8. MockCardDataService Integration (3 tests)
 *    - Mock service injection and usage
 *
 * 9. Page Display Scenario (6 tests)
 *    - Complete "Toutes les Cards" page rendering
 *
 * 10. Data Integrity (2 tests)
 *     - Immutability and copy semantics
 *
 * TOTAL: 40+ test cases
 *
 * COMMON ISSUES & SOLUTIONS:
 * ==========================
 *
 * Issue: "Cannot find module '@/services'"
 * Solution: Update import paths relative to component location
 *
 * Issue: Tests timeout
 * Solution: 
 *   - Ensure done() callback is called in subscribe()
 *   - Check setTimeout delays (usually 100ms)
 *   - Verify Observable completes properly
 *
 * Issue: "Cannot find name 'jest'"
 * Solution:
 *   - Check tsconfig.spec.json has "types": ["jest"]
 *   - Ensure @types/jest is installed
 *   - Use proper TypeScript pathconfigs
 *
 * Issue: Mock service not injected
 * Solution:
 *   - Verify TestBed.configureTestingModule() has correct providers
 *   - Check 'provide' and 'useValue' are spelled correctly
 *
 * Issue: Async state not updating
 * Solution:
 *   - Use subscription to wait for Observable emission
 *   - Call done() when assertion completes
 *   - Add setTimeout if state updates asynchronously
 *
 * NEXT STEPS:
 * ===========
 *
 * 1. Create tests for other components
 * 2. Test component integration with ListingContextService
 * 3. Test template rendering with fixture.detectChanges()
 * 4. Add E2E tests with Cypress or Playwright
 * 5. Increase code coverage to >80%
 *
 * REFERENCES:
 * ===========
 *
 * Component file:
 * angular/src/app/pages/page_listing/page-container-listing/page-container-listing.component.ts
 *
 * Mock data files:
 * angular/src/app/services/mock_data_class/    (all mock services)
 *
 * Jest documentation:
 * https://jestjs.io/docs/getting-started
 *
 * Angular testing guide:
 * https://angular.io/guide/testing
 *
 * Jest with Angular:
 * https://www.npmjs.com/package/jest-preset-angular
 */

export const JEST_TEST_GUIDE = 'See JSDoc above for complete guide';
