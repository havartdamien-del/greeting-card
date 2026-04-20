import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiDataService, DataType } from '../../../services/data_class/api-data.service';
import { ApiConnectionService } from '../../../services/data_class/api-connection.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Card, Tag, Image } from '../../../models/card.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardDetailContentComponent } from '../card-detail/card-detail-content.component';
import { ImageDetailContentComponent } from '../card-detail/image-detail-content.component';
import { TagDetailContentComponent } from '../card-detail/tag-detail-content.component';

@Component({
    selector: 'app-data-api-detail',
    templateUrl: './data-api-detail.component.html',
    styleUrls: ['./data-api-detail.component.scss'],
    standalone: true,
    imports: [CommonModule, TagDetailContentComponent, ImageDetailContentComponent, CardDetailContentComponent]
})
export class DataApiDetailComponent implements OnInit, OnDestroy {
  @Input() dataType: DataType = 'card';

  data: any = null;
  card: Card | null = null;
  tag: Tag | null = null;
  image: Image | null = null;
  loading = true;
  error: string | null = null;
  deleting = false;
  showDeleteConfirm = false;
  isLoggedIn$ = this.authService.isLoggedIn$;
  private readonly destroy$ = new Subject<void>();
  private apiDataService: ApiDataService;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly apiConnectionService: ApiConnectionService,
    private readonly authService: AuthService
  ) {
    // Initialiser avec un dataType par défaut
    this.apiDataService = new ApiDataService(this.apiConnectionService, this.dataType);
  }

  ngOnInit(): void {
    // Réinitialiser le service si le dataType change
    this.apiDataService = new ApiDataService(this.apiConnectionService, this.dataType);
    this.loadDataDetail();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDataDetail(): void {
    this.loading = true;
    this.error = null;

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.apiDataService.getDataById(id, this.dataType)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (data: any) => {
                this.data = data;
                // Assigner au type spécifique
                switch (this.dataType) {
                  case 'card':
                    this.card = data as Card;
                    break;
                  case 'tag':
                    this.tag = data as Tag;
                    break;
                  case 'images':
                    this.image = data as Image;
                    break;
                }
                this.loading = false;
                console.log(`✅ ${this.dataType} détail chargé:`, data);
              },
              error: (err) => {
                console.error(`❌ Erreur lors du chargement du ${this.dataType}:`, err);
                this.error = `Erreur lors du chargement du ${this.dataType}. Veuillez réessayer.`;
                this.loading = false;
              }
            });
        }
      });
  }

  goBack(): void {
    // Naviguer vers la liste correspondante
    const routeMap: Record<DataType, string> = {
      'card': '/cards',
      'tag': '/tags',
      'images': '/images'
    };
    this.router.navigate([routeMap[this.dataType]]);
  }

  editData(): void {
    if (this.data?.id) {
      const editRouteMap: Record<DataType, string> = {
        'card': '/create-card',
        'tag': '/create-tag',
        'images': '/create-images'
      };
      this.router.navigate([editRouteMap[this.dataType], this.data.id]);
    }
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  deleteData(): void {
    if (!this.data?.id) return;

    this.deleting = true;
    this.apiDataService.deleteData(this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.deleting = false;
          console.log(`✅ ${this.dataType} supprimé`);
          this.goBack();
        },
        error: (err) => {
          this.deleting = false;
          console.error(`❌ Erreur lors de la suppression:`, err);
          this.error = `Erreur lors de la suppression du ${this.dataType}.`;
        }
      });
  }
}
