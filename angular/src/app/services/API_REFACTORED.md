# Refactorisation de l'API - Architecture avec Data Services

## Vue d'ensemble

La refactorisation introduit une architecture en couches avec séparation des responsabilités :

```
┌─────────────────────────────────────────┐
│       Composants Angular                │
│  (Cards, Tags, CreateCard, etc.)        │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────────────┐  ┌─────▼──────────┐
│ CardDataService│  │ TagDataService │
└───┬────────────┘  └─────┬──────────┘
    │                     │
    └──────────┬──────────┘
               │
    ┌──────────▼──────────────┐
    │ ApiConnectionService    │
    │ (Service générique)     │
    └──────────┬──────────────┘
               │
    ┌──────────▼──────────────┐
    │   HttpClient (Angular)  │
    └─────────────────────────┘
```

## Architecture

### 1. **ApiConnectionService** (Service générique)

Classe centrale qui gère toutes les communications HTTP avec l'API.

**Responsabilités :**
- Effectuer les requêtes HTTP (GET, POST, PUT, DELETE)
- Gérer les headers HTTP-LD d'API Platform
- Extraire les données du format de réponse API Platform
- Fournir une interface générique pour tous les appels API

**Méthodes disponibles :**
```typescript
// Récupérer toutes les données d'une table
getData<T>(tableName: string): Observable<T[]>

// Récupérer les données actives seulement
getActiveData<T>(tableName: string): Observable<T[]>

// Récupérer un élément par ID
getDataById<T>(tableName: string, id: number): Observable<T>

// Créer un nouvel élément
createData<T>(tableName: string, data: T): Observable<T>

// Mettre à jour un élément
updateData<T>(tableName: string, id: number, data: T): Observable<T>

// Supprimer un élément
deleteData(tableName: string, id: number): Observable<void>
```

**Injection :**
```typescript
constructor(private apiConnection: ApiConnectionService) {}
```

---

### 2. **CardDataService** (Data class pour Card)

Gère la logique métier et l'état local pour les cartes.

**Responsabilités :**
- Transmettre le nom de la table (`cards`, `cards_active`) à ApiConnectionService
- Gérer les opérations CRUD spécifiques aux cartes
- Maintenir l'état des cartes via BehaviorSubject
- Synchroniser le cache local avec les modifications

**Exemple d'utilisation :**
```typescript
constructor(private cardDataService: CardDataService) {}

ngOnInit(): void {
  this.cardDataService.loadCards()
    .subscribe(cards => {
      this.cards = cards;
    });
}

// Créer une carte
createCard(card: Card): void {
  this.cardDataService.createCard(card).subscribe({
    next: (newCard) => {
      console.log('Carte créée:', newCard);
    },
    error: (err) => {
      console.error('Erreur:', err);
    }
  });
}
```

**Méthodes disponibles :**
```typescript
getCards(): Observable<Card[]>           // Récupère toutes les cartes
getActiveCards(): Observable<Card[]>     // Récupère les cartes actives
loadCards(): Observable<Card[]>          // Charge et cache les cartes 
getCardById(id: number): Observable<Card>
createCard(card: Card): Observable<Card>
updateCard(id: number, card: Card): Observable<Card>
deleteCard(id: number): Observable<void>
```

**Propriétés :**
```typescript
public cards$: Observable<Card[]>        // Observable du cache
get cards(): Card[]                      // Accès direct aux cartes
```

---

### 3. **TagDataService** (Data class pour Tag)

Gère la logique métier et l'état local pour les étiquettes.

**Responsabilités :**
- Transmettre le nom de la table (`tags`) à ApiConnectionService
- Gérer les opérations CRUD spécifiques aux tags
- Maintenir l'état des tags via BehaviorSubject

**Exemple d'utilisation :**
```typescript
constructor(private tagDataService: TagDataService) {}

loadTags(): void {
  this.tagDataService.loadTags()
    .subscribe(tags => {
      this.tags = tags;
    });
}
```

**Méthodes disponibles :**
```typescript
getTags(): Observable<Tag[]>
loadTags(): Observable<Tag[]>
getTagById(id: number): Observable<Tag>
createTag(tag: Tag): Observable<Tag>
updateTag(id: number, tag: Tag): Observable<Tag>
deleteTag(id: number): Observable<void>
```

---

## Flux de données

### Exemple : Charger les cartes

```
1. Composant appelle : this.cardDataService.loadCards()
                            ↓
2. CardDataService appelle : this.apiConnection.getActiveData<Card>('cards_active')
                            ↓
3. ApiConnectionService effectue : this.http.get('http://localhost:8080/api/cards_active')
                            ↓
4. L'API retourne une réponse JSON-LD
                            ↓
5. ApiConnectionService extrait les données de 'hydra:member'
                            ↓
6. CardDataService met à jour le BehaviorSubject
                            ↓
7. Le composant reçoit les cartes via Observable et met à jour l'interface
```

---

## Avantages de cette architecture

✅ **Séparation des responsabilités** - ApiConnectionService gère HTTP, les Data services gèrent la logique métier
✅ **Réutilisabilité** - ApiConnectionService peut être utilisé par n'importe quel futur data service
✅ **Testabilité** - Chaque service peut être testé indépendamment
✅ **Maintenabilité** - Modifications d'un seul point pour les appels API
✅ **Type-safety** - Génériques TypeScript pour la sécurité des types
✅ **Injection de dépendance** - Respecte les bonnes pratiques Angular
✅ **Cache centralisé** - BehaviorSubjects pour un état prévisible

---

## Migration depuis ConnectionApiService

Les composants migrent comme suit :

**Avant :**
```typescript
import { ConnectionApiService } from '../../services/connection-api.service';

constructor(private connectionApiService: ConnectionApiService) {}

loadCards(): void {
  this.connectionApiService.loadCards().subscribe(cards => {
    this.cards = cards;
  });
}
```

**Après :**
```typescript
import { CardDataService } from '../../services/card-data.service';

constructor(private cardDataService: CardDataService) {}

loadCards(): void {
  this.cardDataService.loadCards().subscribe(cards => {
    this.cards = cards;
  });
}
```

---

## Ajout d'une nouvelle ressource

Pour ajouter un nouvel endpoint (ex: `artists`), créer :

1. **artist-data.service.ts** :
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Artist } from '../models/artist.model';
import { ApiConnectionService } from './api-connection.service';

@Injectable({ providedIn: 'root' })
export class ArtistDataService {
  private readonly TABLE_NAME = 'artists';
  private artistsSubject = new BehaviorSubject<Artist[]>([]);
  public artists$ = this.artistsSubject.asObservable();

  constructor(private apiConnection: ApiConnectionService) {}

  getArtists(): Observable<Artist[]> {
    return this.apiConnection.getData<Artist>(this.TABLE_NAME);
  }

  loadArtists(): Observable<Artist[]> {
    return this.getArtists().pipe(
      tap(artists => this.artistsSubject.next(artists))
    );
  }

  // ... autres méthodes CRUD
}
```

2. Injecter dans le composant et utiliser :
```typescript
constructor(private artistDataService: ArtistDataService) {}
```

---

## Configuration API

L'URL de base est définie dans `ApiConnectionService` :
```typescript
private apiUrl = 'http://localhost:8080/api';
```

Pour changer l'URL de base, modifier cette propriété unique dans le service.

---

## Format de réponse API Platform

ApiConnectionService traite automatiquement le format JSON-LD :

**Réponse entrante :**
```json
{
  "@context": "/api/contexts/Card",
  "@id": "/api/cards_active",
  "@type": "hydra:Collection",
  "hydra:member": [
    { "id": 1, "title": "Card 1" },
    { "id": 2, "title": "Card 2" }
  ],
  "hydra:totalItems": 2
}
```

**Résultat après extraction :**
```typescript
[
  { "id": 1, "title": "Card 1" },
  { "id": 2, "title": "Card 2" }
]
```
