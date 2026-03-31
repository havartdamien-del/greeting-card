/**
 * PAGE CONTAINER LISTING COMPONENT - TEST GUIDE
 * ============================================
 *
 * This specification file tests the PageContainerListingComponent with MockCardDataService
 * for displaying "Toutes les Cards" (All Cards page).
 *
 * FILE LOCATION:
 * angular/src/app/pages/page_listing/page-container-listing/page-container-listing.component.spec.ts
 *
 * WHAT IS TESTED:
 * ===============
 *
 * 1. INITIALIZATION
 *    - Component is created successfully
 *    - Default values are set (dataType = 'card', empty title/subtitle)
 *    - Observables are defined (data$, loading$, error$)
 *
 * 2. DATA LOADING
 *    - 12 cards are loaded from MockCardDataService
 *    - Cards have correct structure (id, title, description, picture, tags)
 *    - All categories are present (plage, lac, montagne, ville)
 *    - Exactly 3 cards per category
 *
 * 3. LOADING STATES
 *    - Loading state is managed (true during load, false after)
 *    - Error state is null for successful loads
 *    - State transitions happen correctly
 *
 * 4. DATA INTEGRITY
 *    - Card IDs are unique (1-12)
 *    - Card IDs are sequential
 *    - Each card has title, description, image, and tags
 *    - Images have correct format (jpg, jpeg, png, gif)
 *    - Each card has at least one tag
 *
 * 5. SPECIFIC CARD DATA
 *    - First card: "Petite plage tranquille" (plage5.jpg) - Category: Plage
 *    - Card 5: "Les eaux cristallines du lac" (lac3.jpeg) - Category: Lac
 *    - Last card: "Architecture ancienne remarquable" (ville8.jpeg) - Category: Ville
 *    - All beach, lake, mountain, and city cards are correct
 *
 * 6. COMPONENT INPUT BINDINGS
 *    - Title can be set
 *    - Subtitle can be set
 *    - DataType can be set to 'card', 'tag', or 'image'
 *
 * 7. COMPONENT LIFECYCLE
 *    - ngOnInit loads data
 *    - ngOnDestroy cleans up subscriptions
 *
 * 8. MOCK SERVICE INTEGRATION
 *    - MockCardDataService is properly injected via TestBed
 *    - loadCards() is called during initialization
 *    - Works correctly with multiple component instances
 *
 * 9. PAGE DISPLAY SCENARIO
 *    - Complete "Toutes les Cards" page rendering scenario
 *    - Title and subtitle display correctly
 *    - 12 cards from all categories display correctly
 *    - No errors during page load
 *    - Loading state is complete
 *
 * HOW TO RUN THE TEST:
 * ====================
 *
 * 1. Run a single test file:
 *    npm test -- --include='** /page-container-listing.component.spec.ts'
 *
 * 2. Run all tests in watch mode:
 *    npm test
 *
 * 3. Run specific test suite:
 *    npm test -- --grep="Page Display Scenario"
 *
 * 4. Run with code coverage:
 *    npm test -- --code-coverage
 *
 * EXPECTED TEST OUTPUT:
 * ====================
 *
 * PageContainerListingComponent - Affichage des Cards
 *   ✓ Initialization (4 tests)
 *   ✓ Loading Cards Data (5 tests)
 *   ✓ Loading State Management (3 tests)
 *   ✓ Card Data Integrity (5 tests)
 *   ✓ Specific Card Data Validation (7 tests)
 *   ✓ Component Property Binding Tests (5 tests)
 *   ✓ Component Lifecycle (3 tests)
 *   ✓ MockCardDataService Integration (3 tests)
 *   ✓ Page Display Scenario: "Toutes les Cards" (5 tests)
 *
 * TOTAL: 40 tests passing
 *
 * KEY TESTING PATTERNS USED:
 * ===========================
 *
 * 1. MOCK SERVICE INJECTION
 *    const mockCardService = new MockCardDataService(fixtureData);
 *    providers: [
 *      { provide: CardDataService, useValue: mockCardService }
 *    ]
 *
 * 2. OBSERVABLE SUBSCRIPTION TESTING
 *    component.data$.subscribe((data) => {
 *      expect(data.length).toBe(12);
 *      done(); // Signal async test completion
 *    });
 *
 * 3. FIXTURE DATA VALIDATION
 *    Can access fixture data for validation:
 *    expect(card.picture.value).toBe('plage5.jpg');
 *
 * 4. STATE TRANSITION TESTING
 *    Track loading and error states during data load lifecycle
 *
 * 5. INTEGRATION TESTING
 *    Test component interaction with mock service
 *    Verify state is properly synced between component and service
 *
 * FIXTURE DATA STRUCTURE:
 * =======================
 *
 * Card: {
 *   id: number (1-12)
 *   title: string
 *   description: string
 *   picture: {
 *     id: number
 *     type: 'fichier' (for all test data)
 *     value: string (filename)
 *   }
 *   tags: [
 *     {
 *       id: number (1-4)
 *       name: 'plage' | 'lac' | 'montagne' | 'ville'
 *     }
 *   ]
 * }
 *
 * MODIFYING THE TEST:
 * ====================
 *
 * To add new test cases:
 *
 * 1. Add test to appropriate describe block
 * 2. Use correct async pattern:
 *    - For Observables: subscribe and call done()
 *    - For sync code: no done() needed
 *    - For state changes: setTimeout if needed
 *
 * Example:
 * it('should verify custom behavior', (done) => {
 *   component.ngOnInit();
 *   component.data$.subscribe((data) => {
 *     if (data.length > 0) {
 *       // Your assertions
 *       expect(data[0].title).toContain('...');
 *       done();
 *     }
 *   });
 * });
 *
 * TROUBLESHOOTING:
 * ================
 *
 * Issue: Tests timeout
 * Solution: Make sure done() is called in observable subscriptions
 *
 * Issue: "Cannot match any route"
 * Solution: Add missing providers to TestBed.configureTestingModule()
 *
 * Issue: MockCardDataService not found
 * Solution: Ensure file path is correct in import statement
 *          Check that mock_data_class directory exists
 *
 * Issue: Spy errors
 * Solution: Use (component as any) to access private methods
 *
 * RELATED FILES:
 * ==============
 *
 * Component:
 * - angular/src/app/pages/page_listing/page-container-listing/page-container-listing.component.ts
 * - angular/src/app/pages/page_listing/page-container-listing/page-container-listing.component.html
 *
 * Services:
 * - angular/src/app/services/data_class/card-data.service.ts
 * - angular/src/app/services/mock_data_class/mock-card-data.service.ts
 *
 * Context Service:
 * - angular/src/app/pages/page_listing/page-container-listing/listing-context.service.ts
 *
 * Fixture (Test Data):
 * - angular/src/app/services/mock_data_class/fixture.ts
 *
 * Test Example Suite:
 * - angular/src/app/services/mock_data_class/mock-data.service.spec.ts
 */

export const TEST_GUIDE = 'See documentation above';
