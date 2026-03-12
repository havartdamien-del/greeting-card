import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card, ApiResponse } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {
  private apiUrl = 'http://localhost:8080/api';
  
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  public cards$ = this.cardsSubject.asObservable();

  private tagsSubject = new BehaviorSubject<any[]>([]);
  public tags$ = this.tagsSubject.asObservable();

  // Headers pour accepter le format JSON-LD d'API Platform
  private headers = new HttpHeaders({
    'Accept': 'application/ld+json'
  });

  get cards(): Card[] {
    return this.cardsSubject.value;
  }

  get tags(): any[] {
    return this.tagsSubject.value;
  }

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les cards depuis l'API
   */
  getCards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cards`, { headers: this.headers });
  }

  /**
   * Récupère une card spécifique par son ID
   */
  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/cards/${id}`, { headers: this.headers });
  }

  /**
   * Récupère toutes les cards et met à jour le BehaviorSubject
   */
  loadCards(): Observable<any> {
    return new Observable(observer => {
      this.getCards().subscribe({
        next: (response: any) => {
          // Gérer à la fois la réponse API Platform et les réponses simples
          const cardsList = response['hydra:member'] || (Array.isArray(response) ? response : [response]);
          this.cardsSubject.next(cardsList);
          observer.next(cardsList);
          observer.complete();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des cards:', error);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Récupère toutes les tags depuis l'API
   */
  getTags(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tags`, { headers: this.headers });
  }

  /**
   * Récupère toutes les tags et met à jour le BehaviorSubject
   */
  loadTags(): Observable<any> {
    return new Observable(observer => {
      this.getTags().subscribe({
        next: (response: any) => {
          const tagsList = response['hydra:member'] || (Array.isArray(response) ? response : [response]);
          this.tagsSubject.next(tagsList);
          observer.next(tagsList);
          observer.complete();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des tags:', error);
          observer.error(error);
        }
      });
    });
  }

  /**
   * Crée une nouvelle card
   */
  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(`${this.apiUrl}/cards`, card, { 
      headers: this.headers.set('Content-Type', 'application/ld+json')
    });
  }

  /**
   * Met à jour une card existante
   */
  updateCard(id: number, card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/cards/${id}`, card, { 
      headers: this.headers.set('Content-Type', 'application/ld+json')
    });
  }

  /**
   * Supprime une card
   */
  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cards/${id}`, { headers: this.headers });
  }
}
