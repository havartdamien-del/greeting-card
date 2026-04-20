import { Component, Output, EventEmitter } from '@angular/core';
import { ListingContextService } from '../page-container-listing/listing-context.service';
import { map } from 'rxjs/operators';
import { Tag } from '../../../models/card.model';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tags-list',
    templateUrl: './tags-list.component.html',
    styleUrls: ['./tags-list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class TagsListComponent {
  @Output() tagClick = new EventEmitter<number>();

  tags$ = this.context.data$ as BehaviorSubject<Tag[]>;
  isEmpty$ = this.tags$.pipe(
    map(tags => tags.length === 0)
  );

  constructor(private readonly context: ListingContextService) {}

  onTagClick(id: number): void {
    this.tagClick.emit(id);
  }
}
