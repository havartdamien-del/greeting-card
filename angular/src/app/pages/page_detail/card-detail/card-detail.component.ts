import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDataService } from '../../../services/data_class/card-data.service';
import { Card } from '../../../models/card.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    styleUrls: ['./card-detail.component.scss'],
    standalone: false
})
export class CardDetailComponent implements OnInit, OnDestroy {
  card: Card | null = null;
  loading = true;
  error: string | null = null;
  deleting = false;
  showDeleteConfirm = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cardDataService: CardDataService
  ) {}

  ngOnInit(): void {
    this.loadCardDetail();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCardDetail(): void {
    this.loading = true;
    this.error = null;

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params['id'];
        if (id) {
          this.cardDataService.getCardById(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (card: Card) => {
                this.card = card;
                this.loading = false;
                console.log('✅ Card détail chargée:', card);
              },
              error: (err) => {
                console.error('❌ Erreur lors du chargement de la card:', err);
                this.error = 'Erreur lors du chargement de la card. Veuillez réessayer.';
                this.loading = false;
              }
            });
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/cards']);
  }

  editCard(): void {
    if (this.card?.id) {
      this.router.navigate(['/create-card', this.card.id]);
    }
  }

  confirmDelete(): void {
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  deleteCard(): void {
    if (!this.card?.id) return;

    this.deleting = true;
    this.cardDataService.deleteCard(this.card.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.deleting = false;
          console.log('✅ Card supprimée');
          this.router.navigate(['/cards']);
        },
        error: (err) => {
          this.deleting = false;
          console.error('❌ Erreur lors de la suppression:', err);
          this.error = 'Erreur lors de la suppression de la card.';
        }
      });
  }
}