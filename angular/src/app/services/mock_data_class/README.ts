/**
 * MOCK DATA CLASS ARCHITECTURE
 * ============================
 *
 * This directory contains a comprehensive mock data system for Jest unit testing in Angular.
 * It provides isolated test fixtures that mirror the Symfony AppFixtures.php structure.
 *
 * DIRECTORY STRUCTURE:
 * --------------------
 * - fixture.ts                    : Central fixture class (in-memory data store)
 * - mock-api-data.service.ts      : Mock of ApiDataService (generic data converter)
 * - mock-card-data.service.ts     : Mock of CardDataService (card CRUD + state)
 * - mock-image-data.service.ts    : Mock of ImageDataService (image CRUD + URL logic)
 * - mock-tag-data.service.ts      : Mock of TagDataService (tag CRUD + state)
 * - mock-data.service.spec.ts     : Complete test suite with examples
 *
 * KEY CONCEPTS:
 * =============
 *
 * 1. FIXTURE CLASS (fixture.ts)
 *    - Single source of truth for all test data
 *    - Constructor initializes hardcoded data matching Symfony AppFixtures.php:
 *      * 4 Tags: ville, plage, lac, montagne (IDs 1-4)
 *      * 12 Cards: 3 per tag category (IDs 1-12)
 *      * 12 Images: 1 per card (type: 'fichier')
 *    - Public methods: getTags(), getCards(), getImages()
 *    - CRUD helpers: addCard(), updateCard(), deleteCard(), etc.
 *    - State reset: reset() method reinitializes all data to original state
 *    - Copy semantics: Returns deep copies to prevent external mutations
 *
 * 2. MOCK SERVICES (mock-*-data.service.ts)
 *    - Simple instantiable classes (not @Injectable())
 *    - Constructor receives Fixture instance as dependency
 *    - All methods return RxJS Observables via of() for test compatibility
 *    - State synchronization: Internal BehaviorSubject synced with Fixture
 *    - Implements complete CRUD operations matching original service interface
 *
 * USAGE IN TESTS:
 * ===============
 *
 * Example 1: Basic Card Service Test
 * -----------------------------------
 * describe('My Component', () => {
 *   let fixture: Fixture;
 *   let cardService: MockCardDataService;
 *
 *   beforeEach(() => {
 *     fixture = new Fixture();
 *     cardService = new MockCardDataService(fixture);
 *   });
 *
 *   it('should load all cards', (done) => {
 *     cardService.getCards().subscribe(cards => {
 *       expect(cards.length).toBe(12);
 *       done();
 *     });
 *   });
 *
 *   // Test component interaction with cards
 * });
 *
 * Example 2: Testing Card Mutations
 * ----------------------------------
 * it('should create and delete cards', (done) => {
 *   const newCard = {
 *     title: 'Test Card',
 *     picture: { type: 'fichier', value: 'test.jpg' },
 *     tags: [],
 *   };
 *
 *   // Create
 *   cardService.createCard(newCard).subscribe(created => {
 *     expect(cardService.cards.length).toBe(13); // 12 + 1
 *
 *     // Delete
 *     cardService.deleteCard(created.id!).subscribe(() => {
 *       expect(cardService.cards.length).toBe(12);
 *       done();
 *     });
 *   });
 * });
 *
 * Example 3: Testing State Consistency
 * ------------------------------------
 * it('should keep card service and fixture in sync', (done) => {
 *   fixture.addCard({
 *     title: 'Direct Fixture Card',
 *     picture: { type: 'fichier', value: 'direct.jpg' },
 *     tags: [],
 *   });
 *
 *   // Reload cards from fixture
 *   cardService.loadCards().subscribe(() => {
 *     expect(cardService.cards.length).toBe(13);
 *     done();
 *   });
 * });
 *
 * Example 4: Testing with Reset
 * -----------------------------
 * beforeEach(() => {
 *   fixture = new Fixture();
 *   cardService = new MockCardDataService(fixture);
 *   // Fixture is fresh with original 12 cards
 * });
 *
 * it('should reset to initial state', () => {
 *   cardService.createCard({ ... }).subscribe(() => {
 *     fixture.reset(); // Clears all modifications
 *     expect(fixture.getCards().length).toBe(12);
 *   });
 * });
 *
 * Example 5: Testing Tag Service
 * ------------------------------
 * const tagService = new MockTagDataService(fixture);
 *
 * tagService.getTags().subscribe(tags => {
 *   expect(tags.length).toBe(4);
 *   expect(tags[0].name).toBe('ville');
 * });
 *
 * Example 6: Testing Image URL Generation
 * ----------------------------------------
 * const imageService = new MockImageDataService(fixture);
 *
 * const fichierImage = { type: 'fichier', value: 'plage5.jpg' };
 * expect(imageService.getSrcImage(fichierImage))
 *   .toBe('http://localhost:8080/uploads/plage5.jpg');
 *
 * const urlImage = { type: 'url', value: 'https://example.com/pic.jpg' };
 * expect(imageService.getSrcImage(urlImage))
 *   .toBe('https://example.com/pic.jpg');
 *
 * DESIGN PATTERNS:
 * ================
 *
 * 1. FIXTURE AS SINGLE SOURCE OF TRUTH
 *    - All mock services reference the same Fixture instance
 *    - State changes propagate through Fixture to all services
 *    - Enables testing of multi-service interactions
 *
 * 2. RXJS OBSERVABLE COMPATIBILITY
 *    - All methods return Observables via of()
 *    - BehaviorSubjects enable subscription patterns
 *    - Getters provide synchronous access to cached state
 *    - $ suffixed observables (cards$, tags$, images$) for reactive patterns
 *
 * 3. COPY SEMANTICS FOR IMMUTABILITY
 *    - Fixture returns deep copies via JSON serialize-deserialize
 *    - Prevents external code from mutating internal state
 *    - Safe for parallel test execution
 *
 * 4. OPTIONAL TEST STATE MANAGEMENT
 *    - fixture.reset() for tests that modify data
 *    - Optional: call reset() in beforeEach if test modifies state
 *    - Clean separation between test isolation and shared default data
 *
 * 5. SIMPLE INSTANTIABLE CLASSES
 *    - No @Injectable() decorators (lightweight)
 *    - Direct instantiation in test setup: new MockCardDataService(fixture)
 *    - No Angular dependency injection needed in tests
 *    - Easy to pass to components under test via TestBed.overrideProvider()
 *
 * FIXTURE DATA DETAILS:
 * ====================
 *
 * CARDS BY CATEGORY:
 *   Plage (Beach):
 *     - 1: "Petite plage tranquille" → plage5.jpg
 *     - 2: "Une superbe baie côtière" → plage6.jpg
 *     - 3: "Sable blanc et palmiers" → plage7.jpg
 *
 *   Lac (Lake):
 *     - 4: "Lac calme et serein" → lac2.jpeg
 *     - 5: "Les eaux cristallines du lac" → lac3.jpeg
 *     - 6: "Reflet du soleil sur le lac" → lac4.jpeg
 *
 *   Montagne (Mountain):
 *     - 7: "Une grande chaîne de montagne" → montagne1.jpg
 *     - 8: "Sommets enneigés majestueux" → montagne2.jpg
 *     - 9: "Randonnée entre les pics" → montagne3.jpg
 *
 *   Ville (City):
 *     - 10: "Une ville typique avec son charme" → ville6.jpeg
 *     - 11: "Rues pavées d'une vieille ville" → ville7.jpeg
 *     - 12: "Architecture ancienne remarquable" → ville8.jpeg
 *
 * TAGS:
 *   - ID 1: ville
 *   - ID 2: plage
 *   - ID 3: lac
 *   - ID 4: montagne
 *
 * IMAGES:
 *   - Type: 'fichier' for all
 *   - Upload URL prefix: http://localhost:8080/uploads/
 *
 * TESTING GUIDELINES:
 * ===================
 *
 * ✓ DO:
 *   - Create fresh Fixture in beforeEach()
 *   - Instantiate mock services with Fixture
 *   - Call fixture.reset() between modify/check cycles if needed
 *   - Test Observable patterns with done() callbacks
 *   - Test BehaviorSubject emissions
 *   - Test CRUD operations and state sync
 *   - Test data immutability
 *
 * ✗ DON'T:
 *   - Modify fixture data without reset() plan
 *   - Use @Injectable() or Angular DI for mocks
 *   - Call HTTP endpoints (all methods return of() Observables)
 *   - Assume auto-reset between tests (manual reset() if needed)
 *   - Share Fixture between test suites without careful isolation
 *
 * PERFORMANCE & ISOLATION:
 * ========================
 * - Fixture is lightweight: in-memory data only
 * - Each test can have isolated Fixture instance
 * - No network calls or file I/O
 * - JSON deep-copy overhead minimal for test data size (12 cards)
 * - Suitable for parallel Jasmine test execution
 */

export const MOCK_DATA_ARCHITECTURE = 'See JSDoc comments above for complete documentation';
