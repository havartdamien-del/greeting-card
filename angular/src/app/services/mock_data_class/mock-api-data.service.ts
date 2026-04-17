import { Observable, of } from 'rxjs';
import { Card, Tag, Image } from '../../models/card.model';
import { Fixture } from './fixture';

type DataType = 'card' | 'tag' | 'images';

export class MockApiDataService {
  constructor(private readonly fixture: Fixture) {}

  /**
   * Get data by ID and convert to specific type
   */
  getDataById<T>(id: number, dataType: DataType): Observable<T> {
    let data: any;

    switch (dataType) {
      case 'card':
        data = this.fixture.getCardById(id);
        break;
      case 'tag':
        data = this.fixture.getTagById(id);
        break;
      case 'images':
        data = this.fixture.getImageById(id);
        break;
      default:
        data = null;
    }

    return of(data as T);
  }

  /**
   * Get raw data by ID without conversion
   */
  getDataByIdRaw<T>(id: number): Observable<T> {
    return of(null as T);
  }

  /**
   * Convert data to specific type
   */
  convertirData<T>(data: any, dataType: DataType): T {
    // For mock purposes, we assume data is already properly typed
    return data as T;
  }

  /**
   * Update data and return the updated object
   */
  updateData<T>(id: number, data: T): Observable<T> {
    // Determine type and update accordingly
    if ('name' in (data as any) && !('title' in (data as any))) {
      // It's a Tag
      this.fixture.updateTag(id, data as any as Tag);
    } else if ('title' in (data as any)) {
      // It's a Card
      this.fixture.updateCard(id, data as any as Card);
    } else if ('type' in (data as any) && 'value' in (data as any)) {
      // It's an Image
      this.fixture.updateImage(id, data as any as Image);
    }

    return of(data);
  }

  /**
   * Delete data
   */
  deleteData(id: number): Observable<void> {
    // Try to delete from all collections
    this.fixture.deleteCard(id);
    this.fixture.deleteTag(id);
    this.fixture.deleteImage(id);

    return of(void 0);
  }
}
