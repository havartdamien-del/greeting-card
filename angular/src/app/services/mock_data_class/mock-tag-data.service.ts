import { BehaviorSubject, Observable, of } from 'rxjs';
import { Tag } from '../../models/card.model';
import { Fixture } from './fixture';

export class MockTagDataService {
  private readonly tagsSubject: BehaviorSubject<Tag[]>;
  public tags$: Observable<Tag[]>;

  get tags(): Tag[] {
    return this.tagsSubject.value;
  }

  constructor(private readonly fixture: Fixture) {
    this.tagsSubject = new BehaviorSubject<Tag[]>(this.fixture.getTags());
    this.tags$ = this.tagsSubject.asObservable();
  }

  /**
   * Get all tags from fixture
   */
  getTags(): Observable<Tag[]> {
    return of(this.tagsSubject.value);
  }

  /**
   * Load tags from fixture and update the BehaviorSubject
   */
  loadTags(): Observable<Tag[]> {
    const tags = this.fixture.getTags();
    this.tagsSubject.next(tags);
    return of(tags);
  }

  /**
   * Get a tag by ID
   */
  getTagById(id: number): Observable<Tag | undefined> {
    const tag = this.tagsSubject.value.find(t => t.id === id);
    return of(tag);
  }

  /**
   * Create a new tag
   */
  createTag(tag: Tag): Observable<Tag> {
    const newTag = this.fixture.addTag(tag);
    const currentTags = this.tagsSubject.value;
    this.tagsSubject.next([...currentTags, newTag]);
    return of(newTag);
  }

  /**
   * Update an existing tag
   */
  updateTag(id: number, tag: Tag): Observable<Tag> {
    this.fixture.updateTag(id, tag);
    const currentTags = this.tagsSubject.value;
    const index = currentTags.findIndex(t => t.id === id);
    if (index > -1) {
      currentTags[index] = { ...tag, id };
      this.tagsSubject.next([...currentTags]);
    }
    return of({ ...tag, id });
  }

  /**
   * Delete a tag
   */
  deleteTag(id: number): Observable<void> {
    this.fixture.deleteTag(id);
    const currentTags = this.tagsSubject.value;
    this.tagsSubject.next(currentTags.filter(t => t.id !== id));
    return of(void 0);
  }
}
