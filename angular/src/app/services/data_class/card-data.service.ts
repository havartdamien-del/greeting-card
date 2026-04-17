import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Card } from '../../models/card.model';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {
  private readonly TABLE_NAME = 'cards';
  private readonly TABLE_NAME_ACTIVE = 'cards_active';

  private readonly cardsSubject = new BehaviorSubject<Card[]>([]);
  public cards$ = this.cardsSubject.asObservable();

  get cards(): Card[] {
    return this.cardsSubject.value;
  }

  constructor(private readonly apiConnection: ApiConnectionService) {}

  /**
   * Récupère toutes les cartes depuis l'API
   */
  getCards(): Observable<Card[]> {
    return this.apiConnection.getData<Card>(this.TABLE_NAME);
  }

  /**
   * Récupère UNIQUEMENT les cartes actives (isActif = true)
   */
  getActiveCards(): Observable<Card[]> {
    return this.apiConnection.getData<Card>(this.TABLE_NAME_ACTIVE);
  }

  /**
   * Récupère toutes les cartes actives et met à jour le BehaviorSubject
   */
  loadCards(): Observable<Card[]> {
    return this.getActiveCards().pipe(
      tap(cards => this.cardsSubject.next(cards))
    );
  }

  /**
   * Récupère une carte spécifique par son ID
   */
  getCardById(id: number): Observable<Card> {
    return this.apiConnection.getDataById<Card>(this.TABLE_NAME, id);
  }

  /**
   * Crée une nouvelle carte
   */
  createCard(card: Card): Observable<Card> {
    const transformedCard = this.transformTagsToIris(card);
    return this.apiConnection.createData<Card>(this.TABLE_NAME, transformedCard).pipe(
      tap(newCard => {
        const currentCards = this.cardsSubject.value;
        this.cardsSubject.next([...currentCards, newCard]);
      })
    );
  }

  /**
   * Met à jour une carte existante
   */
  updateCard(id: number, card: Card): Observable<Card> {
    const transformedCard = this.transformTagsToIris(card);
    return this.apiConnection.updateData<Card>(this.TABLE_NAME, id, transformedCard).pipe(
      tap(updatedCard => {
        const currentCards = this.cardsSubject.value;
        const index = currentCards.findIndex(c => c.id === id);
        if (index > -1) {
          currentCards[index] = updatedCard;
          this.cardsSubject.next([...currentCards]);
        }
      })
    );
  }

  /**
   * Supprime une carte
   */
  deleteCard(id: number): Observable<void> {
    return this.apiConnection.deleteData(this.TABLE_NAME, id).pipe(
      tap(() => {
        const currentCards = this.cardsSubject.value;
        this.cardsSubject.next(currentCards.filter(c => c.id !== id));
      })
    );
  }

  /**
   * Transforme les objets Tag en chaînes IRI pour l'API
   * @param card La carte avec les objets Tag
   * @returns Une copie de la carte avec les tags convertis en IRI
   */
  private transformTagsToIris(card: Card): any {
    return {
      ...card,
      tags: card.tags.map(tag => `/api/tags/${tag.id}`)
    };
  }
}
