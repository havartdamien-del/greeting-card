import { Component, Output, EventEmitter } from '@angular/core';
import { ListingContextService } from '../page-container-listing/listing-context.service';
import { map } from 'rxjs/operators';
import { Image } from '../../../models/card.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent {
  @Output() imageClick = new EventEmitter<number>();

  images$ = this.context.data$ as BehaviorSubject<Image[]>;
  isEmpty$ = this.images$.pipe(
    map(images => images.length === 0)
  );

  constructor(private context: ListingContextService) {}

  onImageClick(id: number): void {
    this.imageClick.emit(id);
  }
}
