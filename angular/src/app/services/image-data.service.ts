import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Image } from '../models/card.model';
import { CardDataService } from './card-data.service';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {
  private imagesSubject = new BehaviorSubject<Image[]>([]);
  public images$ = this.imagesSubject.asObservable();

  get images(): Image[] {
    return this.imagesSubject.value;
  }

  constructor(private cardDataService: CardDataService) {}

  /**
   * Récupère toutes les images uniques des cartes depuis l'API
   */
  getImages(): Observable<Image[]> {
    return this.cardDataService.getActiveCards().pipe(
      map(cards => {
        // Extraire les images uniques des cartes
        const imagesMap = new Map<string, Image>();
        
        cards.forEach(card => {
          if (card.picture) {
            const key = card.picture.value; // Utiliser l'URL comme clé unique
            if (!imagesMap.has(key)) {
              imagesMap.set(key, {
                id: card.picture.id,
                type: card.picture.type,
                value: card.picture.value
              });
            }
          }
        });

        return Array.from(imagesMap.values());
      })
    );
  }

  /**
   * Récupère toutes les images et met à jour le BehaviorSubject
   */
  loadImages(): Observable<Image[]> {
    return this.getImages().pipe(
      tap(images => this.imagesSubject.next(images))
    );
  }
}
