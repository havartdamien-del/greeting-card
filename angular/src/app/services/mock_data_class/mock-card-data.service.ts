import { BehaviorSubject, Observable, of } from 'rxjs';
import { Card } from '../../models/card.model';
import { Fixture } from './fixture';

export class MockCardDataService {
  private cardsSubject: BehaviorSubject<Card[]>;
  public cards$: Observable<Card[]>;

  get cards(): Card[] {
    return this.cardsSubject.value;
  }

  constructor(private fixture: Fixture) {
    this.cardsSubject = new BehaviorSubject<Card[]>(this.fixture.getCards());
    this.cards$ = this.cardsSubject.asObservable();
  }

  /**
   * Get all cards from fixture
   */
  getCards(): Observable<Card[]> {
    return of(this.cardsSubject.value);
  }

  /**
   * Get only active cards (where isActif = true)
   * Note: Our fixture cards don't have isActif property, so we return all for mock purposes
   */
  getActiveCards(): Observable<Card[]> {
    const allCards = this.cardsSubject.value;
    // In a real scenario with isActif property, would filter here
    return of(allCards);
  }

  /**
   * Load cards from fixture and update the BehaviorSubject
   */
  loadCards(): Observable<Card[]> {
    const cards = this.fixture.getCards();
    this.cardsSubject.next(cards);
    return of(cards);
  }

  /**
   * Get a card by ID
   */
  getCardById(id: number): Observable<Card | undefined> {
    const card = this.cardsSubject.value.find(c => c.id === id);
    return of(card);
  }

  /**
   * Create a new card
   */
  createCard(card: Card): Observable<Card> {
    const newCard = this.fixture.addCard(card);
    const currentCards = this.cardsSubject.value;
    this.cardsSubject.next([...currentCards, newCard]);
    return of(newCard);
  }

  /**
   * Update an existing card
   */
  updateCard(id: number, card: Card): Observable<Card> {
    this.fixture.updateCard(id, card);
    const currentCards = this.cardsSubject.value;
    const index = currentCards.findIndex(c => c.id === id);
    if (index > -1) {
      currentCards[index] = { ...card, id };
      this.cardsSubject.next([...currentCards]);
    }
    return of({ ...card, id });
  }

  /**
   * Delete a card
   */
  deleteCard(id: number): Observable<void> {
    this.fixture.deleteCard(id);
    const currentCards = this.cardsSubject.value;
    this.cardsSubject.next(currentCards.filter(c => c.id !== id));
    return of(void 0);
  }
}
