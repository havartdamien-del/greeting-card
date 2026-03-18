import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CardDataService } from '../../../services/data_class/card-data.service';
import { ImageDataService } from '../../../services/data_class/image-data.service';
import { TagDataService } from '../../../services/data_class/tag-data.service';
import { ListingContextService } from './listing-context.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-container-listing',
  templateUrl: './page-container-listing.component.html',
  styleUrls: ['./page-container-listing.component.scss'],
  providers: [ListingContextService]
})
export class PageContainerListingComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() dataType: 'card' | 'tag' | 'image' = 'card';

  // Observables du contexte
  data$ = this.context.data$;
  loading$ = this.context.loading$;
  error$ = this.context.error$;

  private destroy$ = new Subject<void>();

  constructor(
    private cardService: CardDataService,
    private imageService: ImageDataService,
    private tagService: TagDataService,
    private context: ListingContextService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.context.setLoading(true);
    this.context.setError(null);

    let dataService: Observable<any[]>;
    switch (this.dataType) {
      case 'card':
        dataService = this.cardService.loadCards();
        break;
      case 'image':
        dataService = this.imageService.loadImages();
        break;
      case 'tag':
        dataService = this.tagService.loadTags();
        break;
      default:
        this.context.setError('Type de données invalide');
        this.context.setLoading(false);
        return;
    }

    dataService
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any[]) => {
          this.context.setData(data);
          this.context.setLoading(false);
          console.log(`✅ ${this.dataType}s chargé(e)s:`, data);
        },
        error: (err) => {
          console.error(`❌ Erreur lors du chargement des ${this.dataType}s:`, err);
          this.context.setError(`Erreur lors du chargement des ${this.dataType}s. Veuillez réessayer.`);
          this.context.setLoading(false);
        }
      });
  }
}

