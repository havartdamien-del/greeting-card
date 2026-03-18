import { Component, OnInit, OnDestroy } from '@angular/core';
import { TagDataService } from '../../../services/data_class/tag-data.service';
import { Tag } from '../../../models/card.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: Tag[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private tagDataService: TagDataService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTags(): void {
    this.loading = true;
    this.error = null;
    
    this.tagDataService.loadTags()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tags: Tag[]) => {
          this.tags = tags;
          this.loading = false;
          console.log('Tags chargés:', tags);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des tags:', err);
          this.error = 'Erreur lors du chargement des tags. Veuillez réessayer.';
          this.loading = false;
        }
      });
  }
}
