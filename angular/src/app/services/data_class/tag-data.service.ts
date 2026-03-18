import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Tag } from '../../models/card.model';
import { ApiConnectionService } from './api-connection.service';

@Injectable({
  providedIn: 'root'
})
export class TagDataService {
  private readonly TABLE_NAME = 'tags';

  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  public tags$ = this.tagsSubject.asObservable();

  get tags(): Tag[] {
    return this.tagsSubject.value;
  }

  constructor(private apiConnection: ApiConnectionService) {}

  /**
   * Récupère toutes les étiquettes depuis l'API
   */
  getTags(): Observable<Tag[]> {
    return this.apiConnection.getData<Tag>(this.TABLE_NAME);
  }

  /**
   * Récupère toutes les étiquettes et met à jour le BehaviorSubject
   */
  loadTags(): Observable<Tag[]> {
    return this.getTags().pipe(
      tap(tags => this.tagsSubject.next(tags))
    );
  }

  /**
   * Récupère une étiquette spécifique par son ID
   */
  getTagById(id: number): Observable<Tag> {
    return this.apiConnection.getDataById<Tag>(this.TABLE_NAME, id);
  }

  /**
   * Crée une nouvelle étiquette
   */
  createTag(tag: Tag): Observable<Tag> {
    return this.apiConnection.createData<Tag>(this.TABLE_NAME, tag).pipe(
      tap(newTag => {
        const currentTags = this.tagsSubject.value;
        this.tagsSubject.next([...currentTags, newTag]);
      })
    );
  }

  /**
   * Met à jour une étiquette existante
   */
  updateTag(id: number, tag: Tag): Observable<Tag> {
    return this.apiConnection.updateData<Tag>(this.TABLE_NAME, id, tag).pipe(
      tap(updatedTag => {
        const currentTags = this.tagsSubject.value;
        const index = currentTags.findIndex(t => t.id === id);
        if (index > -1) {
          currentTags[index] = updatedTag;
          this.tagsSubject.next([...currentTags]);
        }
      })
    );
  }

  /**
   * Supprime une étiquette
   */
  deleteTag(id: number): Observable<void> {
    return this.apiConnection.deleteData(this.TABLE_NAME, id).pipe(
      tap(() => {
        const currentTags = this.tagsSubject.value;
        this.tagsSubject.next(currentTags.filter(t => t.id !== id));
      })
    );
  }
}
