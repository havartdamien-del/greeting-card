# Service Connection-API

## Description
Le service `ConnectionApiService` gère toutes les communications entre l'application Angular et l'API Symfony.

## Fonctionnalités

### Variables de stockage
- **`cards$`** - Observable contenant la liste des cards
- **`cards`** - Getter pour accéder directement aux cards stockées
- **`tags$`** - Observable contenant la liste des tags
- **`tags`** - Getter pour accéder directement aux tags stockés

### Méthodes disponibles

#### Cards
```typescript
// Récupère les cards (Observable brut)
getCards(): Observable<any>

// Charge les cards et met à jour le BehaviorSubject
loadCards(): Observable<Card[]>

// Récupère une card spécifique par ID
getCardById(id: number): Observable<Card>

// Crée une nouvelle card
createCard(card: Card): Observable<Card>

// Met à jour une card existante
updateCard(id: number, card: Card): Observable<Card>

// Supprime une card
deleteCard(id: number): Observable<void>
```

#### Tags
```typescript
// Récupère les tags (Observable brut)
getTags(): Observable<any>

// Charge les tags et met à jour le BehaviorSubject
loadTags(): Observable<any[]>
```

## Configuration API
- **Base URL** : `http://localhost:8080/api`
- **Format** : JSON-LD (API Platform)
- **Header Accept** : `application/ld+json`

## Utilisation dans les composants

### Exemple avec CardsComponent
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectionApiService } from '../../services/connection-api.service';
import { Card } from '../../models/card.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private connectionApiService: ConnectionApiService) {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.connectionApiService.loadCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cards: Card[]) => {
          this.cards = cards;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur:', error);
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Interfaces de données

### Card
```typescript
interface Card {
  id?: number;
  title: string;
  description: string;
  picture: Picture;
  tags: Tag[];
}
```

### Picture
```typescript
interface Picture {
  id?: number;
  type: string;       // "url" ou "local_file"
  value: string;      // L'URL ou le chemin du fichier
}
```

### Tag
```typescript
interface Tag {
  id?: number;
  name: string;
}
```

## Gestion des erreurs
Le service inclut une gestion complète des erreurs avec logging console. Les erreurs API sont propagées aux composants qui l'utilisent via les observables.

## Amélioration future
- Ajouter un interceptor HTTP pour gérer les erreurs globalement
- Implémenter le cache avec `shareReplay()`
- Ajouter la pagination pour les listes
- Ajouter les filtres et recherche
