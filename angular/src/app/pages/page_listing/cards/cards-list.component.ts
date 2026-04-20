import { Component, Output, EventEmitter } from '@angular/core';
import { ListingContextService } from '../page-container-listing/listing-context.service';
import { map } from 'rxjs/operators';
import { Card, Image } from '../../../models/card.model';
import { BehaviorSubject } from 'rxjs';
import { ImageDataService } from '../../../services/data_class/image-data.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class CardsListComponent {
  @Output() cardClick = new EventEmitter<number>();

  cards$ = this.context.data$ as BehaviorSubject<Card[]>;
  isEmpty$ = this.cards$.pipe(
    map(cards => cards.length === 0)
  );

  constructor(
    private readonly context: ListingContextService,
    private readonly imageDataService: ImageDataService
  ) {}

  viewCardDetail(id: number): void {
    this.cardClick.emit(id);
  }

  getSrcImage(image: Image): string {
    return this.imageDataService.getSrcImage(image);
  }
}

