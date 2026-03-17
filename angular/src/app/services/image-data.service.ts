import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Image } from '../models/card.model';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {
  private readonly TABLE_NAME = 'pictures';

  private imagesSubject = new BehaviorSubject<Image[]>([]);
  public images$ = this.imagesSubject.asObservable();

  get images(): Image[] {
    return this.imagesSubject.value;
  }

  constructor(private apiConnection: ApiConnectionService) {}

  /**
   * Récupère toutes les images uniques depuis l'API
   */
  getImages(): Observable<Image[]> {
    return this.apiConnection.getData<Image>(this.TABLE_NAME);
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
