import { Component, Output, EventEmitter } from '@angular/core';
import { ListingContextService } from '../page-container-listing/listing-context.service';
import { map } from 'rxjs/operators';
import { Image } from '../../../models/card.model';
import { BehaviorSubject } from 'rxjs';
import { ImageDataService } from '../../../services/data_class/image-data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-images-list',
    templateUrl: './images-list.component.html',
    styleUrls: ['./images-list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ImagesListComponent {
  @Output() imageClick = new EventEmitter<number>();

  images$ = this.context.data$ as BehaviorSubject<Image[]>;
  isEmpty$ = this.images$.pipe(
    map(images => images.length === 0)
  );

  constructor(
    private readonly context: ListingContextService,
    private readonly imageDataService: ImageDataService
  ) {}

  onImageClick(id: number): void {
    this.imageClick.emit(id);
  }

  getSrcImage(image: Image): string {
    return this.imageDataService.getSrcImage(image);
  }

  getAltImage(image: Image): string {
    return this.imageDataService.getAltImage(image);
  }
}
