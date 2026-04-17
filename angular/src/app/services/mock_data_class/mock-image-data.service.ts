import { BehaviorSubject, Observable, of } from 'rxjs';
import { Image } from '../../models/card.model';
import { Fixture } from './fixture';

export class MockImageDataService {
  private imagesSubject: BehaviorSubject<Image[]>;
  public images$: Observable<Image[]>;

  get images(): Image[] {
    return this.imagesSubject.value;
  }

  constructor(private fixture: Fixture) {
    this.imagesSubject = new BehaviorSubject<Image[]>(this.fixture.getImages());
    this.images$ = this.imagesSubject.asObservable();
  }

  /**
   * Get all images from fixture
   */
  getImages(): Observable<Image[]> {
    return of(this.imagesSubject.value);
  }

  /**
   * Load images from fixture and update the BehaviorSubject
   */
  loadImages(): Observable<Image[]> {
    const images = this.fixture.getImages();
    this.imagesSubject.next(images);
    return of(images);
  }

  /**
   * Get the source URL for an image
   * If type is 'url': return the value directly
   * If type is 'fichier': return the uploads path
   */
  getSrcImage(image?: Image): string {
    if (!image) {
      return '';
    }

    if (image.type === 'url') {
      return image.value;
    }

    if (image.type === 'fichier') {
      return `http://localhost:8080/uploads/${image.value}`;
    }

    return '';
  }

  /**
   * Get the alt text for an image
   * If the image has an id: return the id as string
   * Otherwise: return 'Image'
   */
  getAltImage(image?: Image): string {
    if (!image) {
      return 'Image';
    }

    return image.id ? String(image.id) : 'Image';
  }

  /**
   * Mock upload image - simulates file upload without actual file handling
   */
  uploadImage(file: File): Observable<any> {
    // For mock purposes, we simulate a successful upload
    const mockImage: Image = {
      id: Math.max(...this.imagesSubject.value.map(i => i.id || 0)) + 1,
      type: 'fichier',
      value: file.name,
    };

    const currentImages = this.imagesSubject.value;
    this.imagesSubject.next([...currentImages, mockImage]);

    return of({ success: true, image: mockImage });
  }
}
