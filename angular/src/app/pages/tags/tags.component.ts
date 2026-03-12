import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectionApiService } from '../../services/connection-api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  tags: any[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private connectionApiService: ConnectionApiService) {}

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
    
    this.connectionApiService.loadTags()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tags: any[]) => {
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
