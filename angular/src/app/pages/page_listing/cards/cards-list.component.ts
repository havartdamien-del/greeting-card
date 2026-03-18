import { Component, Output, EventEmitter } from '@angular/core';
import { ListingContextService } from '../page-container-listing/listing-context.service';
import { map } from 'rxjs/operators';
import { Card } from '../../../models/card.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {
  @Output() cardClick = new EventEmitter<number>();

  cards$ = this.context.data$ as BehaviorSubject<Card[]>;
  isEmpty$ = this.cards$.pipe(
    map(cards => cards.length === 0)
  );

  constructor(private context: ListingContextService) {}

  viewCardDetail(id: number): void {
    this.cardClick.emit(id);
  }
}

